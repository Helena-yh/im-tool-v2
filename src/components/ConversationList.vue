<template>
  <div class="rong-conversation-list">
    <div :class="['rong-conversation',conversation.targetId == selectConversation ?'rong-conversation-select':'']" 
        v-for="conversation in conversationList" 
        :key="conversation.targetId"
        @click="openConversation(conversation)">
        <!-- <div class="rong-conversation-portrait">
            <img src="" alt="">
        </div> -->
        <div class="rong-conversation-main">
          <span class="rong-conversation-img"></span>
          <div class="rong-conversation-body">
            <div class="rong-conversation-info">
                <span class="rong-converation-name">{{conversation.targetId}}</span>
                <span class="rong-converation-time">{{conversation.latestMessage.sentTime | formatDate}}</span>
            </div>
            <div class="rong-conversation-message" v-if="conversation.latestMessage.messageType == 'TextMessage'" v-html="emojiToHtml(conversation.latestMessage.content.content)">
            </div>
             <div class="rong-conversation-message" v-if="conversation.latestMessage.messageType == 'ImageMessage'">
                [ 图片 ]
            </div>
             <div class="rong-conversation-message" v-if="conversation.latestMessage.messageType == 'FileMessage'">
                [ 文件 ]
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '../assets/js/util';
export default {
  name: "conversation",
  props: ["RongIMLib", "user"],
  data() {
    return {
      conversationList: [],
      selectConversation: ''
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date);
    }
  },
  mounted:function(){
      this.getConversationList();
      this.selectConversation = this.user.targetId;
  },
  methods: {
    emojiToHtml:function(message){
      return this.RongIMLib.RongIMEmoji.emojiToHTML(message);
    },
    getConversationList: function() {
      var conversationTypes = [this.RongIMLib.ConversationType.GROUP];
      var count = 150;
      var content = this;
      this.RongIMLib.RongIMClient.getInstance().getConversationList({
          onSuccess: function(list) {
            console.log("获取会话列表成功", list);
            content.conversationList = list;
          },
          onError: function(error) {
            console.log("获取会话列表失败", error);
          }
        },conversationTypes,count);
    },
    openConversation:function(conversation){
        if(this.selectConversation == conversation.targetId){
          return;
        }
        this.selectConversation = conversation.targetId;
        this.$emit("changeConversation",conversation)
        console.info(conversation);
    }
  }
};
</script>

<style>
.rong-conversation-list{
  width: 100%;
  height: 100%;
  background: #363e45;
}
.rong-conversation{
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #30383f;
  color: #a5b5c1;
  /* padding-left: 10px; */
}
.rong-converation-time{
  font-size: 12px;
  position: absolute;
  right: 0px;
}
.rong-conversation-select{
  background: #4f5863;
}
.rong-conversation-main{
  padding: 20px 10px;
  /* padding-left: 10px; */
}
.rong-conversation:hover{
  background-color: #404953;
}
.rong-conversation-img{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-block;
  background-image: url(../../public/static/01.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
}
.rong-converation-name{
  color: #f7f7f8
}
.rong-conversation-info{
  display: inline-block;
  position: relative;
  width: 230px;
}
.rong-conversation-body{
  display: inline-block;
  margin-left: 10px;
}
</style>