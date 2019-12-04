<template>
  <div class="rong-message">
        <div v-if='message.messageType == "TextMessage"' class="rong-message" >
          <div class="rong-message-header" :class="[message.messageDirection != 1 ? 'rong-message-header-left':'rong-message-header-right']">
              <!-- <img :src="message.content.user.portrait" alt=""> -->
              <!-- <img src="../assets/portrait/01.jpg" alt=""> -->
                <img :src="message.content.user.portrait || config.portraitList[1]" alt="">
          </div>
          <div class="rong-message-body" :class="[message.messageDirection != 1 ? 'rong-message-body-left':'rong-message-body-right']">
            <div class="rong-message-username">{{message.content.user.name}}</div>
            <div class="rong-Message-text" >      
                <pre class="rong-Message-entry" v-html="emojiToHtml(message.content.content)"></pre>
            </div>
          </div>
          <div class="rong-clear"></div> 
      </div>
    <div v-if='message.messageType == "ImageMessage"' class="rong-message" >
          <div class="rong-message-header" :class="[message.messageDirection != 1 ? 'rong-message-header-left':'rong-message-header-right']">
              <!-- <img :src="message.content.user.portrait" alt=""> -->
              <!-- <img src="../assets/portrait/01.jpg" alt=""> -->
                <img :src="message.content.user.portrait || config.portraitList[1]" alt="">
          </div>
          <div class="rong-message-body" :class="[message.messageDirection != 1 ? 'rong-message-body-left':'rong-message-body-right']">
            <div class="rong-message-username">{{message.content.user.name}}</div>
            <div class="rong-Message-img">
                <img :src="message.content.imageUri" alt="">
            </div>
          </div>
          <div class="clear"></div> 
      </div>
       <div v-if='message.messageType == "FileMessage"' class="rong-message" >
          <div class="rong-message-header" :class="[message.messageDirection != 1 ? 'rong-message-header-left':'rong-message-header-right']">
              <!-- <img :src="message.content.user.portrait" alt=""> -->
              <!-- <img src="../assets/portrait/01.jpg" alt=""> -->
                <img :src="message.content.user.portrait || config.portraitList[1]" alt="">
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
</template>

<script>
export default {
    name:'message',
    props: ['RongIMLib','message'],
    data() {
        return {
        // textarea: ""
        };
    },
    created:function(){
        console.info(this.message);
    },
    methods:{
        emojiToHtml:function(message){
            return this.RongIMLib.RongIMEmoji.emojiToHTML(message);
        }
    }
}
</script>

<style>

</style>