<template>
  <div class="rong-login">
    <div class="rong-login-main" v-if="!mainShow">
      <img class="rong-login-logo" src="../assets/logo_blue.png" alt />
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
    this.user.id = this.$route.params.id;
    this.user.targetId = this.$route.params.groupId;
    this.user.name = localStorage.getItem("rong_user_name");
  },
  methods: {
    login: function() {
      this.getToken();
      this.getUserInfo();
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
      let portrait = localStorage.getItem("rong_user_portrait");
      if(!portrait){
        portrait = Math.ceil(Math.random()*6);
        this.saveUserInfo('portrait',portrait);
      }
      this.saveUserInfo('name',this.user.name);
      this.user.portrait = '../assets/portrait/0' + portrait + '.jpg';
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
  margin-top: calc(50vh - 146px);
}
</style>