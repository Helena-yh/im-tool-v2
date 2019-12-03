<template>
  <div class="rong-app">
    <router-view></router-view>
    <div class="rong-bg"></div>
  </div>
</template>

<script>
import './assets/css/icon.css';
// import Main from "./components/Main.vue";

export default {
  name: "app",
  components: {
    // Main
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
  font-family: "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
@media print {
    html, body {
      height: inherit;
    }
    #app {
      height: inherit;
    }
    .rong-app-main-down{
      height: inherit !important;
    }
    .rong-down-pdf {
        height: inherit !important;
    }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.rong-bg{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background: url(./assets/bg.jpg) no-repeat 0 0;
  background-size: cover;
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

.rong-login{
      display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}
.rong-login-main{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 280px;
    padding: 50px 80px 50px;
    background: #fff;
    color: #000;
    border-radius: 5px;
    -webkit-box-shadow: 0 11px 20px 0 rgba(0,0,0,.3);
    box-shadow: 0 11px 20px 0 rgba(0,0,0,.3);
    /* margin-top: 100px; */
}

.el-container .el-main{
  width: 100%;
  height: 100%;
  padding: 0;
  min-width: 300px;
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
.el-container .el-menu{
  border: 0px;
}
.el-container .el-menu-item:hover{
  background:#344252;
  color: #fff;
}
.el-container .el-menu-item.is-active{
  background: #363e46;
  color: #fff;
}
.el-container .el-collapse{
  border-bottom: 1px solid #303840;
  border-top: 1px solid #303840;
}
.el-container .el-collapse-item__header{
  background: #363e45;
  border-bottom: 1px solid #303840;
  position: relative;
}
.el-container .el-icon-arrow-right:before{
  color: #f5f5f5;
}
.el-container .el-collapse-item__content{
  background: #363e45;
}
.el-container .el-collapse-item__wrap{
  border-bottom: 1px solid #30383f;
}
.el-container .el-collapse-item__content{
  padding-bottom:0
}
.el-container .el-dropdown-menu{
  background-color: #363e45;
  border: 1px solid #30383f;
}
.el-container .el-popper .popper__arrow::after{
      border-bottom-color: #363e45;
}
.el-container .el-popper .popper__arrow{
    border-bottom-color: #30383f;
}
.el-container .el-popper{
  margin-top: -4px;
}
.el-container .el-dropdown-menu__item{
  /* background-color: #30383f; */
  color: #dededf;
}
.el-container .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  background-color: #30383f;
  color: #dededf;
}
.el-container .el-container .el-collapse-item__header{
  position: relative;
}

</style>
