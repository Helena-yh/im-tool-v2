<template>
  <div class="rong-message">
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
</template>

<script>
export default {
    name:'message',
    props: ['message'],
    data() {
        return {
        // textarea: ""
        };
    },
    created:function(){
        console.info(this.message);
    }
}
</script>

<style>

</style>