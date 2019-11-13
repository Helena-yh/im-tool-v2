<template>
  <div class="rong-login">
    <div class="rong-login-main" v-if="!mainShow">
      <img class="rong-login-logo" src="../assets/logo_blue.png" alt />
      <el-input class="rong-login-input" placeholder="请输入群组 ID" v-model="groupId" clearable></el-input>
      <el-input class="rong-login-input" placeholder="请输入手机号" v-model="userId" clearable></el-input>
      <el-input class="rong-login-input" placeholder="请输名称" v-model="name" clearable></el-input>
      <el-button type="primary" @click="login()">加入</el-button>
    </div>

    <div v-if="mainShow">
      <Main :role="role" :token="token" :groupId="groupId"></Main>
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
    //   input: "",
      name: "",
      mainShow: false,
      userId: "",
      token: "",
      groupId: ""
    };
  },
  components: {
    Main
  },
  methods: {
    login: function() {
        this.getToken();
    //   this.joinGroup();
    },
    joinGroup: function() {
      let group = {
        id: this.groupId,
        name: this.name,
        memberId: this.userId
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
      if (!this.userId) {
        this.$message({
          showClose: true,
          message: "手机号不可为空！",
          type: "error"
        });
        return;
      }
      var data = { id: this.userId };
      this.$axios.post(this.config.host + "/user/get_token", data).then(res => {
        if (res.data.code == 200) {
          this.token = res.data.result.token;
          console.info(this.token);
          this.mainShow = true;
          return;
        }
        this.$message({
          showClose: true,
          message: "获取 token 错误",
          type: "error"
        });
      });
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
</style>