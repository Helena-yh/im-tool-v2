<template>
  <div class="rong-app-main">
    <div class="rong-main">
      <el-container>
        <el-aside width="80px" class="rong-menu" v-if="role == 'admin'">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1" class="rong-menu-item" @click="changeMenu('issue')">
              <i class="iconfont icon-liebiao"></i>
            </el-menu-item>
            <el-menu-item index="2" class="rong-menu-item" @click="changeMenu('conversation')">
              <i class="iconfont icon-xiaoxi"></i>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-aside width="300px">
          <IssueList v-if="showMenu == 'issue'" :role="role" :targetId="user.targetId"></IssueList>
          <ConversationList v-if="showMenu == 'conversation'" :RongIMLib="RongIMLib" :user="user"></ConversationList>
        </el-aside>
        <el-main>
          <div class="rong-main-conversation">
            <div class="rong-conversation-content">
              <div class="rong-content-header">
                <Header :role="role" :groupId="user.targetId"></Header>
              </div>

              <div class="rong-message-list">
                <div
                  class="rong-message-history"
                  v-if="MessageHistory"
                  ref="box1"
                  @scroll="onScroll"
                >
                  <MessageHistory
                    :RongIMLib="RongIMLib"
                    :user="user"
                    @setScrollTop="setScrollTop"
                    :historyMore="historyMore"
                  ></MessageHistory>
                  <Message
                    v-for="newMessage in newMessageList"
                    :key="newMessage.messageUid"
                    :message="newMessage"
                  ></Message>
                </div>
              </div>
              <div class="rong-conversation-foot">
                <SendBox :RongIMLib="RongIMLib" :user="user" @pushMessage="sendMessageHandle"></SendBox>
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

import Message from "./Message.vue";
import MessageHistory from "./MessageList";
import SendBox from "./Input";
import IssueList from "./IssueList";
import ConversationList from "./ConversationList";

import Header from "./Header";

export default {
  name: "mainBody",
  props: ["role", "token", "user"],
  data() {
    return {
      textarea: "",
      MessageHistory: false,
      RongIMLib: RongIMLib,
      newMessageList: [],
      historyMore: 0,
      mute: "禁言",
      showMenu: "issue"
    };
  },
  components: {
    Message,
    MessageHistory,
    SendBox,
    IssueList,
    Header,
    ConversationList
  },
  mounted: function() {
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
              case RongIMLib.ConnectionStatus["NETWORK_UNAVAILABLE"]:
              case 3:
                //重连
                break;
            }
          }
        });

        RongIMClient.setOnReceiveMessageListener({
          onReceived: function(message) {
            if(message.messageType == "CutromInfo"){
              localStorage.setItem("rong_user_" + message.content.groupId,message.content.userId);
            }
            content.newMessageList.push(message);
            content.setScrollTop();
          }
        });

        RongIMClient.connect(
          this.token,
          {
            onSuccess: function() {
              content.MessageHistory = true;
              RongIMLib.RongIMEmoji.init();
              content.registerMessageType();
              if ("cutrom" == content.role) {
                content.cutromSendMessage();
              }
            },
            onTokenIncorrect: function() {},
            onError: function(errorCode) {
              console.info("error:", errorCode);
            }
          },
          null
        );
      }
    },
    handleOpen: function(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose: function(key, keyPath) {
      console.log(key, keyPath);
    },
    sendMessageHandle: function(message) {
      this.newMessageList.push(message);
      this.setScrollTop();
    },
    setScrollTop: function() {
      this.$nextTick(() => {
        this.$refs.box1.scrollTop = this.$refs.box1.scrollHeight;
      });
    },
    onScroll: function() {
      if (this.$refs.box1.scrollTop < 50) {
        this.historyMore++;
      }
    },
    changeMenu: function(menu) {
      this.showMenu = menu;
    },
    cutromSendMessage: function() {
      // let content = this;
      var conversationType = RongIMLib.ConversationType.GROUP; // 群聊, 其他会话选择相应的消息类型即可
      var targetId = this.user.targetId; // 目标 Id
      var msg = new RongIMClient.RegisterMessage.CutromInfo({ groupId: this.user.targetId,userId:this.user.id});
      RongIMLib.RongIMClient.getInstance().sendMessage(conversationType,targetId,msg,{
        onSuccess: function(message) {
          // content.textarea = "";
          // content.$emit("pushMessage", message);
          console.log("发送文本消息成功", message);
          //列表中添加消息--通知父级元素
        },
        onError: function(errorCode, message) {
          console.log("发送文本消息失败", message);
        }
      });
    },
    registerMessageType:function(){
      var messageName = 'CutromInfo';  // 消息名称
      var objectName = 's:cutrom';  // 消息内置名称，请按照此格式命名
      var isCounted = false;  // 消息计数
      var isPersited = true;  // 消息保存
      var mesasgeTag = new RongIMLib.MessageTag(isCounted, isPersited);
      var prototypes = ['userId','groupId'];  // 消息类中的属性名
      RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);
    }
  }
};
</script>

<style scoped>
.rong-menu {
  background: #303840;
  text-align: center;
}
.rong-menu-item {
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
</style>
