<template>
  <div class="rong-input-main">
    <div class="rong-input-buts">
      <span class="iconfont icon-smile"></span>
      <span class="iconfont icon-tupian"></span>
      <span class="iconfont icon-file"></span>
    </div>
    <el-input type="textarea" :rows="2" placeholder v-model="textarea"></el-input>
    <i class="rong-input-send" @click="sendTextMessage()"></i>
  </div>
</template>

<script>
export default {
  name: "sendBox",
  props: ["RongIMLib"],
  data() {
    return {
      textarea: ""
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
      var conversationType = this.RongIMLib.ConversationType.PRIVATE; // 群聊, 其他会话选择相应的消息类型即可
      var targetId = "user11"; // 目标 Id
      var pushData = "pushData" + Date.now();

      var isMentioned = false;
      
      this.RongIMLib.RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
            console.log('发送文本消息成功', message);
        },
        onError: function (errorCode,message) {
            console.log('发送文本消息失败', message);
        }
    }, isMentioned, pushData);
    }
  }
};
</script>

<style>
.iconfont {
  color: #808080;
  font-size: 24px;
  margin-right: 10px;
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
.rong-input-send {
  background-image: url(/img/send.05471123.png);
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
</style>