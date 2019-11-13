<template>
  <div class="rong-message-history-list" >
      <div v-for="message in messageList" :key="message.uid">
        <div v-if='message.messageType == "TextMessage"' class="rong-message" >
          <div class="rong-message-header" :class="[message.messageDirection != 1 ? 'rong-message-header-left':'rong-message-header-right']">
              <!-- <img src="message.content.user.portrait" alt=""> -->
              <img src="https://avatars1.githubusercontent.com/u/10265829?s=96&v=4" alt="">
          </div>
          <div class="rong-message-body" :class="[message.messageDirection != 1 ? 'rong-message-body-left':'rong-message-body-right']">
            <div class="rong-Message-text" >
                <pre class="rong-Message-entry">{{message.content.content}}</pre>
            </div>
            <div style="clear:buth"></div>
          </div>
      </div>
      <div v-if='message.messageType == "ImageMessage"' class="rong-message" >
          <div class="rong-message-header" :class="[message.messageDirection != 1 ? 'rong-message-header-left':'rong-message-header-right']">
              <img src="message.content.user.portrait" alt="">
          </div>
          <div class="rong-message-body" :class="[message.messageDirection != 1 ? 'rong-message-body-left':'rong-message-body-right']">
            <div class="rong-Message-text">
                <img :src="message.content.imageUri" alt="">
            </div>
          </div>
      </div>
      <div v-if='message.messageType == "FileMessage"' class="rong-message" >
          <div class="rong-message-header" :class="[message.messageDirection != 1 ? 'rong-message-header-left':'rong-message-header-right']">
              <img :src="message.content.user.portrait" alt="">
          </div>
          <div class="rong-message-body" :class="[message.messageDirection != 1 ? 'rong-message-body-left':'rong-message-body-right']">
            <div class="rong-Message-text">
               
            </div>
          </div>
      </div>
      <div v-if='message.messageType == "TimeMessage"' class="rong-message" >
           <b>{{message.sentTime}}</b>
      </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'message',
    props: ['RongIMLib'],
    data() {
        return {
            // RongIMLib:window.RongIMLib,
            messageList: []
        };
    },
    mounted:function(){
        this.getHistoryMessages();
        
    },
    methods:{
        getHistoryMessages:function(){
            var content = this;
            var conversationType = this.RongIMLib.ConversationType.PRIVATE;
            // var targetId = '7KSPDT0YK';
            var targetId = 'user11'
            var timestrap = 0; // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
            var count = 20;
            this.RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
            onSuccess: function(list) {
                content.messageList = [...content.messageList,...list];
                console.log('获取历史消息成功', list); 
            },
            onError: function(error) {
                console.log('获取历史消息失败', error);
            }
            });
        }
    }
}
</script>

<style>
.rong-message{
    margin: 20px 0;
    position: relative;
    clear: both;
}
.rong-message-header{
    display: inline-block;
    width: 56px;
    height: 56px;
}
.rong-message-header img{
    width: 56px;
    height: 56px;
    border-radius: 50%;
}
.rong-message-body{
    position: relative;
    margin-right: 10px;
    margin-top: 4px;
    margin-left: 10px;
    line-height: 30px;
    color: #444;
    background: #f7f5f5;
    border-radius: 6px;
    display: inline-block;
    font-size: 14px;
    max-width: 350px;
    word-wrap: break-word;
    word-break: break-all;
    -webkit-box-shadow: 0 5px 10px 0 rgba(0,0,0,.1);
    box-shadow: 0 5px 10px 0 rgba(0,0,0,.1);
}
.rong-Message-text{
    position: relative;
    display: inline-block;
    max-width: 100%;
    padding: 0 10px;
}
.rong-Message-entry{
    font-size: 14px;
    line-height: 18px;
    /* color: rgb(68, 68, 68); */
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    background-color: transparent;
    border: none;
    border-radius: 0;
    margin: 10px 0px;
}
.rong-message-header-left{
    position: absolute;
    left: 10px;
}
.rong-message-body-left{
    margin-left: 80px;
}
.rong-message-header-right{
    position: absolute;
    right: 10px;
    
}
.rong-message-body-right{
    margin-right: 80px;
    background-color: #5cadff;
    color: #fff;
    float: right;
}
</style>