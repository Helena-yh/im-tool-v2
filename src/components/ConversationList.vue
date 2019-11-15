<template>
  <div class="rong-conversation-list">
    <div class="rong-conversation" 
        v-for="conversation in conversationList" 
        :key="conversation.targetId"
        :@click="openConversation(conversation)">
        <div class="rong-conversation-portrait">
            <img src="" alt="">
        </div>
        <div class="rong-conversation-main">
            <div class="rong-conversation-name">
                <span>{{conversation.targetId}}</span>
                <span>{{conversation.latestMessage.sentTime}}</span>
            </div>
            <div class="rong-conversation-message">
                {{conversation.latestMessage.content.content}}
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "conversation",
  props: ["RongIMLib", "user"],
  data() {
    return {
      conversationList: []
    };
  },
  mounted:function(){
      this.getConversationList();
  },
  methods: {
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
        //通知父组件更换新群组 id重新渲染。
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
}
</style>