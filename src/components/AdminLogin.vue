<template>
  <div class="rong-login">
    <div class="rong-login-main" v-if="!mainShow">
      <span class="rong-login-logo"></span>
      <el-input class="rong-login-input" placeholder="请输入群组 ID" v-model="user.targetId" clearable></el-input>
      <el-input class="rong-login-input" placeholder="请输入手机号" v-model="user.id" clearable></el-input>
      <el-input class="rong-login-input" placeholder="请输名称" v-model="user.name" clearable></el-input>
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
  name: "adminLogin",
  data() {
    return {
      role: "admin",
      mainShow: false,
      token: "",
      user: {
        id: "",
        name: "",
        targetId: ""
      }
    };
  },
  components: {
    Main
  },
  created() {
    let content = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        content.login();// 登录方法名
         return false;
      }
    };
  },
  methods: {
    login: function() {
      for (const key in this.user) {
        if (this.user.hasOwnProperty(key)) {
          let val = this.user[key];
          if(!val){
            this.$message({
              showClose: true,
              message: "请检查输入框，不可为空！",
              type: "error"
            });
            return
          }
        }
      }
      this.joinGroup();
    },
    joinGroup: function() {
      let group = {
        groupId: this.user.targetId,
        // name: this.user.name,
        memberIds: [this.user.id],
      };
      this.$axios.post(this.config.host + "/group/join", group).then(res => {
        if (res.data.code == 200) {
          this.getToken();
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
      if (!this.user.id) {
        this.$message({
          showClose: true,
          message: "手机号不可为空！",
          type: "error"
        });
        return;
      }
      var data = { id: this.user.id };
      this.$axios.post(this.config.host + "/user/get_token", data).then(res => {
        if (res.data.code == 200) {
          this.token = res.data.result.token;
          this.getUserInfo();
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
        portrait = Math.ceil(Math.random()*6);
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
  margin-top: calc(50vh - 206px);
}
</style>