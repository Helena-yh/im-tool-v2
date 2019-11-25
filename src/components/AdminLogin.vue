<template>
  <div class="rong-login">
    <div class="rong-login-main" v-if="!mainShow">
      <img class="rong-login-logo" src="../assets/logo_blue.png" alt />
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
  methods: {
    login: function() {
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
      let portrait = localStorage.getItem("rong_user_portrait");
      if(!portrait){
        portrait = Math.ceil(Math.random()*6);
        this.saveUserInfo('portrait',portrait);
      }
    //   console.info('-----user.name',this.user.name);
      this.saveUserInfo('name',this.user.name);
      user.portrait = '../assets/portrait/0' + portrait + '.jpg';
      return user;
    }
  }
};
</script>

<style>
.rong-login-logo {
  width: 200px;
  margin-bottom: 40px;
}
.rong-login-input {
  padding-bottom: 20px;
}
.rong-login-main {
  margin-top: calc(50vh - 206px);
}
</style>