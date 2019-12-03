<template>
  <div :class="[downPDFStatus ? 'rong-app-main-down':'rong-app-main']">
    <div v-if="!downPDFStatus" class="rong-main">
      <el-container>
        <el-aside width="80px" class="rong-menu" v-if="role == 'admin'">
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1" class="rong-menu-item" @click="changeMenu('issue')">
              <i class="iconfont icon-liebiao"></i>
            </el-menu-item>
            <el-menu-item index="2" class="rong-menu-item" @click="changeMenu('conversation')">
              <i class="iconfont icon-xiaoxi"></i>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-aside width="300px">
          <IssueList v-if="showMenu == 'issue'" :role="role" :targetId="user.targetId" @downLoadPDF="downLoadPDF"></IssueList>
          <ConversationList v-if="showMenu == 'conversation'" :RongIMLib="RongIMLib" :user="user" @changeConversation="changeConversation"></ConversationList>
        </el-aside>
        <el-main>
          <div class="rong-main-conversation">
            <div class="rong-conversation-content">
              <div class="rong-content-header">
                <Header :role="role" :groupId="user.targetId"></Header>
              </div>

              <div class="rong-message-list">
                <div class="rong-message-history" v-if="MessageHistory" ref="box1" @scroll="onScroll">
                  <MessageHistory
                    :RongIMLib="RongIMLib"
                    :user="user"
                    @setScrollTop="setScrollTop"
                    :userchange="userchange"
                    :historyMore="historyMore"></MessageHistory>
                  <Message
                    v-for="newMessage in newMessageList"
                    :key="newMessage.messageUid"
                    :message="newMessage"
                  ></Message>
                </div>
              </div>
              <div class="rong-conversation-foot">
                <SendBox :RongIMLib="RongIMLib" :user="user" @pushMessage="sendMessageHandle" ref="SendBox"></SendBox>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
    <DownLoadPDF v-else :issueList="issueList" @goBack="goBack"></DownLoadPDF>
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
import DownLoadPDF from "./DownFile";

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
      showMenu: "issue",
      userchange:0,
      downPDFStatus:false,
      issueList:[]
    };
  },
  components: {
    Message,
    MessageHistory,
    SendBox,
    IssueList,
    Header,
    ConversationList,
    DownLoadPDF
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
              // content.registerMessageType();
              // if ("cutrom" == content.role) {
              //   content.cutromSendMessage();
              // }
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
    sendMessageHandle: function(message) {
      this.newMessageList.push(message);
      this.setScrollTop();
    },
    setScrollTop: function() {
      if(this.$refs.box1){
        this.$nextTick(() => {
          this.$refs.box1.scrollTop = this.$refs.box1.scrollHeight;
        });
      }
    },
    onScroll: function() {
      if (this.$refs.box1.scrollTop < 50) {
        this.historyMore++;
      }
    },
    changeMenu: function(menu) {
      this.showMenu = menu;
    },
    changeConversation:function(conversation){
      this.$nextTick(() => {
        this.user.targetId = conversation.targetId;
        this.userchange++;
      });
      this.newMessageList = [];
    },
    downLoadPDF:function(issueList) {
      // console.info(issueList);
      this.issueList = issueList;
      this.downPDFStatus = true;
    },
    goBack:function() {
      this.downPDFStatus = false;
    }
  }
};
</script>

<style scoped>
.rong-app-main-down{
  height: 100vh;
  width: 80vw;
  background: #fff;
  margin: 0 auto;
}
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
