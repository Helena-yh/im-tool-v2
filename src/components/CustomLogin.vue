<template>
  <div class="rong-login">
    <div class="rong-login-main" v-if="!mainShow">
      <span class="rong-login-logo"></span>
      <el-input class="rong-login-input" placeholder="请输名称" v-model="user.name" clearable ></el-input>
      <el-button type="primary" @click="login()">加入</el-button>
    </div>

    <div v-if="mainShow">
      <Main :role="role" :token="token" :user="user"></Main>
    </div>
  </div>
</template>

<script>
import Main from "./Main.vue";

export default {
  name: "customLogin",
  data() {
    return {
      mainShow: false,
      role: "cutrom",
      token: "",
      user:{
        id:'',
        name:'',
        targetId:''
      }
    };
  },
  components: {
    Main
  },

  created: function() {
    let content = this;
    this.user.id = this.$route.params.id;
    this.user.targetId = this.$route.params.groupId;
    this.user.name = localStorage.getItem("rong_user_name");
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        content.login();// 登录方法名
      }
    };
  },
  methods: {
    login: function() {
      if(!this.user.name){
          this.$message({
            showClose: true,
            message: "请输入群昵称！",
            type: "error"
          });
         return;
        }
      this.joinGroup();

    },
    joinGroup: function() {
      let group = {
        groupId: this.user.targetId,
        // name: this.user.name,
        memberIds: [this.user.id],
        clientIds: [this.user.id]
      };
      this.$axios.post(this.config.host + "/group/join", group).then(res => {
        if (res.data.code == 200) {
          this.getToken();
          this.getUserInfo();
          return;
        }
        this.$message({
          showClose: true,
          message: "加入群组失败",
          type: "error"
        });
      });
    },
    getToken: function() {
      var data = { id: this.user.id };
      this.$axios.post(this.config.host + "/user/get_token", data).then(res => {
        if (res.data.code == 200) {
          this.token = res.data.result.token;
          this.mainShow = true;
          return;
        }
        this.$message({
          showClose: true,
          message: "获取 token 错误",
          type: "error"
        });
      });
    },
    saveUserInfo:function(key,value){
      localStorage.setItem("rong_user_" + key,value);
    },
    getUserInfo:function(){
      let user = {};
      let portrait = localStorage.getItem("rong_user_"+this.user.name);
      if(!portrait){
        portrait = Math.ceil(Math.random()*7);
        this.saveUserInfo(this.user.name,portrait);
      }
  
      this.saveUserInfo('name',this.user.name);
      this.user.portrait =  this.config.portraitList[portrait];
      console.info('-----user.name',this.user);
      return user;
    }
  }
};
</script>

<style>
.rong-login-logo {
  width: 200px;
  margin-bottom: 40px;
  height: 52px;
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(../../public/static/logo_blue.png);
}
.rong-login-input {
  padding-bottom: 20px;
}
.rong-login-main {
  margin-top: calc(50vh - 146px);
}
</style>

{
        appKey: "c9kqb3rdc4j5j",
        token: "hLAgS8e0Pmkv/FXx//nuRA4utwPvM1RDHNv/sHN/X2ELAl4P+w9qQr0L7Lm3lNi41uxERnLnQ0B2zKjtW1+ZDQ=="
    }