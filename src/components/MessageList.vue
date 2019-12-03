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
              <img src="../assets/portrait/01.jpg" alt="">
          </div>
          <div class="rong-message-body" :class="[message.messageDirection != 1 ? 'rong-message-body-left':'rong-message-body-right']">
            <div class="rong-message-username">{{message.content.user.name}}</div>
            <div class="rong-Message-img">
                
                <!-- <img :src="'data:image/jpeg;base64,' + message.content.content" alt=""> -->
                <!-- <img :src="message.content.imageUri" alt=""> -->
                <div class="demo-image__preview">
                <el-image 
                    style="width: 100px; height: 100px"
                    :src= "message.content.imageUri"
                    :preview-src-list="[message.content.imageUri]">
                </el-image>
            </div>
            </div>
          </div>
          <div class="rong-clear"></div> 
      </div>
      <div v-if='message.messageType == "FileMessage"' class="rong-message" >
          <div class="rong-message-header" :class="[message.messageDirection != 1 ? 'rong-message-header-left':'rong-message-header-right']">
              <!-- <img :src="message.content.user.portrait" alt=""> -->
              <img src="../assets/portrait/01.jpg" alt="">
          </div>
          <div class="rong-message-body" :class="[message.messageDirection != 1 ? 'rong-message-body-left':'rong-message-body-right']">
            <div class="rong-message-username">{{message.content.user.name}}</div>
            <div class="rong-Message-text">
                <!-- <div class="rong-sprite rong-file-icon"></div> -->
                <i class="iconfont icon-wenjian"></i>
                <div class="rong-message-file-info">
                    <div class="rong-file-name" :title="message.content.name">{{message.content.name}}</div>            
                    <div class="rong-file-size">{{message.content.size}}</div>        
                </div>            
                <a class="iconfont icon-download rong-down-file" :href="message.content.fileUrl"></a>
               <!-- {{message.content.user.name}} -->
            </div>
          </div>
          <div class="rong-clear"></div> 
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
    props: ['RongIMLib','user',"historyMore","userchange"],
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
            if(this.messageList.length > 0){
                let times = this.messageList[0].sentTime;
                this.getHistoryMessages(times,true)
            }  
        },
        userchange() {
            this.messageList = [];
            this.loaded = true;
            this.hasMsg = true;
            this.getHistoryMessages();
        } 
    },
    methods:{
        getHistoryMessages:function(times,status){
            console.info('获取历史',this.loaded ,this.hasMsg)
            if(this.loaded && this.hasMsg){
                var content = this;
                var conversationType = this.RongIMLib.ConversationType.GROUP;
                var targetId = this.user.targetId;
                var timestrap = times ?  times : 0; 
                var count = 20;
                this.loaded = false;
                console.log('targetId', targetId); 
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
.rong-Message-img{
    max-width: 120px;
}
.rong-Message-img img{
    max-width: 120px;
    max-height: 180px;
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
.rong-sprite{
    width: 40px;
    height: 40px;
}
.rong-file-icon{
    background-image: url(../assets/logo.png);
}
.rong-Message-text i{
    width: 40px;
    height: 35px;
    display: inline-block;
    border: 1px solid;
    border-radius: 4px;
    text-align: center;
    font-size: 30px;
    padding-top: 5px;
    vertical-align: text-bottom;
    margin-right: 10px;
    background: #fff;
    color: #5cadff;
}
.rong-message-file-info{
    display: inline-block;
    max-width: 120px;
}
.rong-file-name{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.rong-down-file{
    text-decoration: none;
    cursor: pointer;
}
.rong-message .icon-download{
    color: #717070;
}
.rong-message .icon-download:hover{
    color: #5cadff;
}
.rong-message-body-right .icon-download{
    color: #fff;
}
.rong-message-body-right .icon-download:hover{
    color: #717070;
}
</style>