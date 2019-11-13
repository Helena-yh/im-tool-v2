<template>
  <div class="rong-input-main">
    <div class="rong-input-buts">
      <span class="iconfont icon-smile" @click="emgioClick()" ></span>
      <span class="iconfont icon-tupian"></span>
      <span class="iconfont icon-file"></span>
    </div>
    <el-input type="textarea" :rows="2" placeholder v-model="textarea"></el-input>
    <i class="rong-input-send" @click="sendTextMessage()"></i>
    <div :class="['rong-emojis',{'rong-emojis-show':emjioShow}]" >
        <span class="rong-emoji" v-for="emoji in emojiList" :key='emoji.unicode' v-html='emoji.emoji' @click="chooseEmoji(emoji)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "sendBox",
  props: ["RongIMLib"],
  data() {
    return {
      textarea: "",
      emjioShow:false,
      emojiList: this.RongIMLib.RongIMEmoji.list
    };
  },
  methods: {
    sendTextMessage:function(){
        if (!this.textarea.length) {
        return;
      }
      var msg = new this.RongIMLib.TextMessage({
        content: this.textarea,
        extra: "附加信息",
        user : { // 当前用户(发送者) 信息
            "id" : "user1",
            "name" : "张三",
            "portrait" : "https://cdn.ronghub.com/thinking-face.png"
        },
      });
      this.sendMessage(msg);
    },
    sendMessage: function(msg) {
      let content = this;
      var conversationType = this.RongIMLib.ConversationType.PRIVATE; // 群聊, 其他会话选择相应的消息类型即可
      // var targetId = "7KSPDT0YK"; // 目标 Id
       var targetId = "user11"; // 目标 Id
      this.RongIMLib.RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
            content.textarea = '';
            console.log('发送文本消息成功', message);
            //列表中添加消息--通知父级元素
        },
        onError: function (errorCode,message) {
            console.log('发送文本消息失败', message);
        }
    });
    },
    emgioClick:function(){
        this.emjioShow = !this.emjioShow;
    },
    chooseEmoji:function(emoji){
        this.textarea += emoji.emoji
    }
  }
};
</script>

<style>
.iconfont {
  color: #808080;
  font-size: 24px;
  /* margin-right: 10px; */
  cursor: pointer;
}
.iconfont:hover {
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
.rong-input-buts span{
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
.rong-emojis{
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
.rong-emojis-show{
    display: block;
}
</style>