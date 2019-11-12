<template>
  <div class="rong-app-main">
    <Main></Main>
  </div>
</template>

<script>
import './assets/css/icon.css';
import Main from "./components/Main.vue";

export default {
  name: "app",
  components: {
    Main
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.rong-app-main {
  margin: 0 auto;
  margin-top: 8vh;
  width: 80vw;
  height: 80vh;
  max-width: 1280px;
  -webkit-box-shadow: 0 11px 20px 0 rgba(0,0,0,.3);
  box-shadow: 0 11px 20px 0 rgba(0,0,0,.3);
}
.el-container .el-main{
  width: 100%;
  height: 100%;
  padding: 0;
  /* border-radius: 4px 0; */
}
.el-container .el-header{
  padding: 0;
}
.el-container .el-textarea__inner{
  height: 100%;
  border: 0px solid;
  border-right: 1px solid #e7e7e7;
  border-radius: 0px;
  background-color: #f5f5f5;
  resize: none;
  padding: 36px 10px 16px 16px;
}
.el-container .el-textarea{
  height: 100%;
  
}
.el-container .el-textarea__inner:focus{
  background-color: #fff;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none;
  user-select: none;
  border-color: #e7e7e7;
}
</style>
