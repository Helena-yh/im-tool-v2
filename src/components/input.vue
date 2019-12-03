<template>
  <div class="rong-input-main">
    <div class="rong-input-buts">
      <span class="rong-input-btn iconfont icon-smile" @click="emgioClick()"></span>
      <span class="rong-input-btn iconfont icon-tupian" @click="imgClick('image')"></span>
      <span class="rong-input-btn iconfont icon-file" @click="imgClick('file')"></span>
      <input
        class="rong-input-file"
        type="file"
        multiple="multiple"
        accept="image/png, image/gif, image/jpeg"
        @change="upload(1,'image')"
        ref="image"
      />
      <input
        class="rong-input-file"
        type="file"
        multiple="multiple"
        @change="upload(4,'file')"
        ref="file"
      />
    </div>
    <el-input type="textarea" :rows="2" placeholder v-model="textarea" @keyup.enter.native="sendTextMessage"></el-input>
    <i class="rong-input-send" @click="sendTextMessage()"></i>
    <div :class="['rong-emojis',{'rong-emojis-show':emjioShow}]">
      <span
        class="rong-emoji"
        v-for="emoji in emojiList"
        :key="emoji.unicode"
        v-html="emoji.emoji"
        @click="chooseEmoji(emoji)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "sendBox",
  props: ["RongIMLib", "user"],
  data() {
    return {
      textarea: "",
      emjioShow: false,
      emojiList: this.RongIMLib.RongIMEmoji.list,
      uploadFun: {
        1:'initImage',
        4:'initFile'
      }
    };
  },
  watch:{
    user(newV,oldV) {
        // do something
        console.log(newV,oldV)
    } 
  },
  methods: {
    sendTextMessage: function(e) {
      if (!this.textarea.length || e.shiftKey) {
        return;
      }
      var msg = new this.RongIMLib.TextMessage({
        content: this.textarea,
        extra: "",
        user: this.user
      });
      this.sendMessage(msg);
    },
    sendImgMessage: function(base64Str, imageUri) {
      var msg = new this.RongIMLib.ImageMessage({
        content: base64Str,
        imageUri: imageUri,
        user: this.user
      });
      this.sendMessage(msg);
    },
    sendFileMessage: function(data, imageUri) {
      var msg = new this.RongIMLib.FileMessage({
        name: data.name,
        size: data.size,
        type: data.type,
        fileUrl: imageUri,
        user: this.user
      });
      this.sendMessage(msg);
    },
    sendMessage: function(msg) {
      let content = this;
      var conversationType = this.RongIMLib.ConversationType.GROUP; // 群聊, 其他会话选择相应的消息类型即可
      // var targetId = "7KSPDT0YK"; // 目标 Id
      var targetId = this.user.targetId; // 目标 Id
      this.RongIMLib.RongIMClient.getInstance().sendMessage(
        conversationType,
        targetId,
        msg,
        {
          onSuccess: function(message) {
            content.textarea = "";
            content.$emit("pushMessage", message);
            console.log("发送文本消息成功", message);
            //列表中添加消息--通知父级元素
          },
          onError: function(errorCode, message) {
            console.log("发送文本消息失败", message);
            if (errorCode == 22408) {
              content.$message({
                showClose: true,
                message: "会话失效，请联系管理员或续费",
                type: "error"
              });
            }
          }
        }
      );
    },
    emgioClick: function() {
      this.emjioShow = !this.emjioShow;
    },
    chooseEmoji: function(emoji) {
      this.textarea += emoji.emoji;
    },
    upload: function(fileType,ref) {
      // var fileType = RongIMLib.FileType.FILE; // 图片类型
      let content = this;
      var config = {
        domain: 'http://upload.qiniu.com',
        fileType: fileType,
        getToken: function(callback) {
          content.RongIMLib.RongIMClient.getInstance().getFileToken(fileType, {
            onSuccess: function(data){
              callback(data.token);
            },
            onError: function(error){
              console.error('get file token error', error);
            }
          });
        }
      };
      var uploadCallbacks = {
        onProgress: function(loaded, total) {
          var percent = Math.floor(loaded / total * 100);
          console.log('已上传: ', percent);
        },
        onCompleted: function(data) {
          // 上传完成, 调用 getFileUrl 获取文件下载 url
          content.RongIMLib.RongIMClient.getInstance().getFileUrl(fileType, data.filename, data.name, {
            onSuccess: function(getFileUrlData) {
              console.log('文件 url 为(可用做发送消息的 url): ', getFileUrlData.downloadUrl);
              if(fileType == 1){
                content.sendImgMessage(data.thumbnail,getFileUrlData.downloadUrl);
              }else{
                content.sendFileMessage(data,getFileUrlData.downloadUrl);
              }
              
            },
            onError: function(error) {
              console.log('get file url error', error);
            }
          })
        },
        onError: function(error) {
          console.error('上传失败', error);
        }
      };
      let inputDOM = this.$refs[ref];
      var _file = inputDOM.files[0];
      console.log(inputDOM.files[0])

      window.UploadClient[content.uploadFun[fileType]](config, function(uploadFile) { // 上传文件为: UploadClient.initFile
        uploadFile.upload(_file, uploadCallbacks);
      });
    },
    imgClick: function(ref) {
      this.$refs[ref].click();
    }
  }
};
</script>

<style>
.iconfont {
  font-size: 24px;
}
.rong-input-btn{
   color: #808080;
   cursor: pointer;
}
.rong-input-btn:hover{
   color: #252525;
}
.rong-input-main {
  height: 100%;
  position: relative;
}
.rong-input-buts {
  position: absolute;
  z-index: 100;
  padding: 4px 10px;
}
.rong-input-buts span {
  margin-right: 10px;
}
.rong-input-send {
  background-image: url(../assets/send.png);
  background-size: 30px 30px;
  width: 30px;
  height: 30px;
  display: inline-block;
  position: absolute;
  right: 16px;
  bottom: 14px;
  z-index: 100;
  cursor: pointer;
}
.rong-emojis {
  position: fixed;
  width: 300px;
  height: 150px;
  bottom: calc(10vh + 164px);
  overflow: scroll;
  z-index: 100;
  padding: 5px;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  background: #f5f5f5;
  display: none;
}
.rong-emoji {
  width: 30px;
  height: 30px;
  display: inline-block;
  text-align: center;
}
.rong-emojis-show {
  display: block;
}
.rong-input-file {
  display: none;
}
</style>