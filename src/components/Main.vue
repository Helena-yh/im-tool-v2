<template>
  <div class="rong-app-main">
    <div class="rong-main">
      <el-container >
        <el-aside width="80px" class="rong-menu" v-if="role == 'admin'">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1" class="rong-menu-item">
              <i class="iconfont icon-dangqianhuihua"></i>
            </el-menu-item>
            <el-menu-item index="2" class="rong-menu-item">
              <i class="iconfont icon-liebiao"></i>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-aside width="300px">
          <IssueList :role="role"></IssueList>
        </el-aside>
        <el-main>
          <div class="rong-main-conversation">
            <div class="rong-conversation-content">
              <div class="rong-content-header">
                <el-header>
                  <div class="rong-main-header">
                    <img src="../../public/favicon.png" alt />
                    <span>技术支持工具</span>
                  </div>
                </el-header>
              </div>

              <div class="rong-message-list">
                <div class="rong-message-history" v-if="MessageHistory">
                  <MessageHistory :RongIMLib="RongIMLib"></MessageHistory>
                </div>
                <!-- <MessageHistory></MessageHistory> -->
                <!-- <Message></Message> -->
              </div>
              <div class="rong-conversation-foot">
                <SendBox :RongIMLib="RongIMLib"></SendBox>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
require("../assets/js/RongIMLib-2.5.1");
require("../assets/js/protobuf-2.3.6.min.js");
require("../assets/js/RongEmoji-2.2.7");

var RongIMLib = window.RongIMLib;
var RongIMClient = RongIMLib.RongIMClient;

// import Message from "./Message.vue";
import MessageHistory from "./MessageList";
import SendBox from "./Input";
import IssueList from "./IssueList";

export default {
  name: "mainBody",
  props: ["role", "token"],
  data() {
    return {
      textarea: "",
      MessageHistory: false,
      RongIMLib: RongIMLib
    };
  },
  components: {
    // Message,
    MessageHistory,
    SendBox,
    IssueList
  },
  mounted: function() {
    console.info(this.role);
    this.init();
  },
  methods: {
    init: function() {
      var appkey = this.config.appKey;
      var content = this;
      if (!appkey || !this.token) {
        console.info(
          this.config.appKey,
          "appkey 和 token 不能为空",
          this.token
        );
      } else {
        RongIMClient.init(appkey, null);
        RongIMClient.setConnectionStatusListener({
          onChanged: function(status) {
            switch (status) {
              case RongIMLib.ConnectionStatus["CONNECTED"]:
              case 0:
                // addPromptInfo('连接成功')
                break;

              case RongIMLib.ConnectionStatus["CONNECTING"]:
              case 1:
                // addPromptInfo('连接中')
                break;

              case RongIMLib.ConnectionStatus["DISCONNECTED"]:
              case 2:
                // addPromptInfo('当前用户主动断开链接')
                break;

              case RongIMLib.ConnectionStatus["NETWORK_UNAVAILABLE"]:
              case 3:
                // addPromptInfo('网络不可用')
                break;

              case RongIMLib.ConnectionStatus["CONNECTION_CLOSED"]:
              case 4:
                // addPromptInfo('未知原因，连接关闭')
                break;

              case RongIMLib.ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"]:
              case 6:
                // addPromptInfo('用户账户在其他设备登录，本机会被踢掉线')
                break;

              case RongIMLib.ConnectionStatus["DOMAIN_INCORRECT"]:
              case 12:
                // addPromptInfo('当前运行域名错误，请检查安全域名配置')
                break;
            }
          }
        });

        RongIMClient.setOnReceiveMessageListener({
          // 接收到的消息
          onReceived: function(message) {
            // addPromptInfo('新消息 ' + message.targetId + ':' + JSON.stringify(message))
            // alert(msg);
            console.info(message);
          }
        });

        RongIMClient.connect(
          this.token,
          {
            onSuccess: function() {
              // addPromptInfo('链接成功，用户id：' + userId)
              //  alert(userId)
              content.MessageHistory = true;
              RongIMLib.RongIMEmoji.init();
            },
            onTokenIncorrect: function() {
              // addPromptInfo('token无效')
            },
            onError: function(errorCode) {
              // addPromptInfo(errorCode)
              alert(errorCode);
            }
          },
          null
        );
      }
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rong-menu{
  background: #303840;
  text-align: center;
}
.rong-menu-item{
  background: #303840;
}
.rong-main {
  height: 100%;
  width: 100%;
}
.rong-main-conversation {
  width: 100%;
  height: 100%;
}
.rong-conversation-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.rong-content-header {
  position: absolute;
  /* border-bottom: 1px solid #ccc; */
  width: 100%;
}
.rong-conversation-foot {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  /* padding: 3px 20px 20px 20px; */
  position: absolute;
  bottom: 0;
  height: 146px;
  border-top: 1px solid #e7e7e7;
  width: 100%;
}
.rong-message-list {
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow-y: scroll;
  padding: 60px 0px 146px 0px;
  padding-top: 60px;
  height: 80vh;
  color: rgb(82, 82, 82);
  border-right: 1px solid #e7e7e7;
  background: #f5f5f5;
}
.rong-main-header {
  height: 60px;
  line-height: 60px;
  font-size: 1.5rem;
  color: #666;
  background: #e7e7e7;
  border-bottom: 1px solid #e7e7e7;
}
.rong-message-history {
  overflow-y: scroll;
  height: 100%;
}
</style>
