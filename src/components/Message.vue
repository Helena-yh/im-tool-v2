<template>
  <div class="rong-message-history">
      <!-- <div v-if='message.messageType == "TextMessage"' class="rong-message">
          <div class="rong-message-header">
              <img src="message.user.portrait" alt="">
          </div>
          <div class="rong-message-body">
            <div class="rong-Message-text">
                <pre class="rong-Message-entry">{{this.message.content.content}}</pre>
            </div>
          </div>
      </div>
      <div v-if='message.messageType == "ImageMessage"' class="rong-message">
          <div class="rong-message-header">
              <img src="message.user.portrait" alt="">
          </div>
          <div class="rong-message-body">
            <div class="rong-Message-text">
                
            </div>
          </div>
      </div>
      <div v-if='message.messageType == "FileMessage"' class="rong-message">
          <div class="rong-message-header">
              <img src="message.user.portrait" alt="">
          </div>
          <div class="rong-message-body">
            <div class="rong-Message-text">
               
            </div>
          </div>
      </div>
      <div v-if='message.messageType == "TimeMessage"' class="rong-message">
           <b>{{message.sentTime}}</b>
      </div>  -->
  </div>
</template>

<script>
export default {
    name:'message',
    // props: {message},
    data() {
        return {
        // textarea: ""
        };
    }
}
</script>

<style>

</style>