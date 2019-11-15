<template>
  <div class="rong-message-history-list" ref="historyMore">
      <div></div>
      <div v-for="message in messageList" :key="message.uid">
        <div v-if='message.messageType == "TextMessage"' class="rong-message" >
          <div class="rong-message-header" :class="[message.messageDirection != 1 ? 'rong-message-header-left':'rong-message-header-right']">
              <!-- <img :src="message.content.user.portrait" alt=""> -->
              <img src="../assets/portrait/01.jpg" alt="">
          </div>
          <div class="rong-message-body" :class="[message.messageDirection != 1 ? 'rong-message-body-left':'rong-message-body-right']">
            <div class="rong-message-username">{{message.content.user.name}}</div>
            <div class="rong-Message-text" >      
                <pre class="rong-Message-entry">{{message.content.content}}</pre>
            </div>
          </div>
          <div class="rong-clear"></div> 
      </div>
      <div v-if='message.messageType == "ImageMessage"' class="rong-message" >
          <div class="rong-message-header" :class="[message.messageDirection != 1 ? 'rong-message-header-left':'rong-message-header-right']">
              <!-- <img :src="message.content.user.portrait" alt=""> -->
          </div>
          <div class="rong-message-body" :class="[message.messageDirection != 1 ? 'rong-message-body-left':'rong-message-body-right']">
            <div class="rong-Message-text">
                <img :src="message.content.imageUri" alt="">
            </div>
          </div>
          <div class="clear"></div> 
      </div>
      <div v-if='message.messageType == "FileMessage"' class="rong-message" >
          <div class="rong-message-header" :class="[message.messageDirection != 1 ? 'rong-message-header-left':'rong-message-header-right']">
              <!-- <img :src="message.content.user.portrait" alt=""> -->
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
    props: ['RongIMLib','user',"historyMore"],
    data() {
        return {
            messageList: [],
            loaded:true,
            hasMsg:true
        };
    },
    mounted:function(){
        this.getHistoryMessages();
    },
    watch:{
        historyMore(){

            let times = this.messageList[0].sentTime;
            this.getHistoryMessages(times,true)
        }
    },
    methods:{
        getHistoryMessages:function(times,status){
            if(this.loaded && this.hasMsg){
                var content = this;
                var conversationType = this.RongIMLib.ConversationType.GROUP;
                var targetId = this.user.targetId;
                var timestrap = times ?  times : 0; 
                var count = 20;
                this.loaded = false;
                this.RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
                onSuccess: function(list,hasMsg) {
                    content.messageList = [...list,...content.messageList];  
                    console.log('获取历史消息成功', list); 
                    content.loaded = true;
                    content.hasMsg = hasMsg;
                    if(!status){
                        content.$emit('setScrollTop');
                        return;
                    }
                    // content.$emit('setScrollTop',tr);
                },
                onError: function(error) {
                    console.log('获取历史消息失败', error);
                }
                });
            } 
        }
    }
}
</script>

<style>
.rong-clear{ clear:both} 
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
}
.rong-Message-text{
    padding: 0 10px;
    position: relative;
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
    box-shadow: 0 5px 10px 0 rgba(0,0,0,.1)
}
.rong-Message-entry{
    font-size: 14px;
    line-height: 18px;
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
    float: right;
    right: 10px;
}
.rong-message-body-right{
    margin-right: 10px;
    float: right;
}
.rong-message-body-right .rong-Message-text{
    background-color: #5cadff;
    color: #fff;
}
.rong-message-username{
    font-size: 12px;
    color: #8e8e8e;
    padding: 4px 0px;
}
.rong-message-body-right .rong-message-username{
    text-align: right;
}
</style>