<template>
  <div class="rong-login">
    <div class="rong-login-main" v-if="!mainShow">
      <img class="rong-login-logo" src="../assets/logo_blue.png" alt="">
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
  name: "customLogin",
  data() {
    return {
      role: "cutrom",
      input: '',
      name:'',
      mainShow:false,
      userId:'',
      token:'',
      groupId:''
    };
  },
  components: {
    Main
  },
  
  created: function() {
    this.userId = this.$route.params.id;
    this.groupId = this.$route.params.groupId;
  },
  methods:{
    login:function(){
      this.getToken();
    },
    getToken:function(){
      var data = {id:this.userId}
      this.$axios.post(this.config.host + '/user/get_token',data
      ).then(res =>{
        if (res.data.code == 200) {
            this.token = res.data.result.token;
            console.info(this.token);
            this.mainShow = true;
            return;
        }
        this.$message({
          showClose: true,
          message: '获取 token 错误',
          type: 'error'
        });
      });
    }
  }
};
</script>

<style>
.rong-login-logo{
  width: 200px;
  margin-bottom: 40px;
}
.rong-login-input{
  padding-bottom: 20px;
}
</style>