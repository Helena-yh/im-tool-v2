<template>
  <el-header>
    <div class="rong-main-header">
      <img src="../../public/favicon.png" alt />
      <input type="text" v-model="groupName" @change="setInfos('groupName')"/>
      <!-- <span>{{groupName}}</span> -->
      <el-tooltip class="item" effect="dark" :content="muteTitle.mute[mute]" placement="bottom" v-if="role == 'admin'">
        <i :class="['iconfont',  mute ? 'icon-xiaoxi':'icon-jinyan']" @click="setInfos('mute')"></i>
      </el-tooltip>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "header",
  props: ["role","groupId"],
  data() {
    return {
      muteTitle: {
        groupName:'修改群组名称',
        mute:{
          0: "禁言",
          1: "解禁"
        }
      },
      mute: 0,
      clientIds: [],
      groupName:''
    };
  },
  mounted: function() {
      this.getMuteStatus();
  },
  watch:{
    userchange() {
      this.getMuteStatus();
    } 
  },
  methods: {
    getMuteStatus: function() {
      let content = this;
      var data = { groupIds: [this.groupId]}; 
      this.$axios.post(this.config.host + "/group/get_infos", data).then(res => {
        if (res.data.code == 200) {
          content.mute = res.data.result[0].muteStatus;
          content.clientIds = res.data.result[0].clientIds;
          content.groupName = res.data.result[0].groupName;
          console.info(res.data.result[0])
          return;
        }
        this.$message({
          showClose: true,
          message: "获取禁言状态错误",
          type: "error"
        });
      });
    },
    setInfos:function(flag){
      let content = this;
      let data = {
        groupId: this.groupId,
        groupName:this.groupName
      }; 
      let status = this.mute ? 0 : 1;
      if("mute" == flag){    
        data.muteStatus = status;
        data.clientIds = this.clientIds;
      }
      
      this.$axios.post(this.config.host + "/group/set_infos", data).then(res => {
        let message = content.muteTitle[flag];
        if (res.data.code == 200) {
          if("mute" == flag){
           message = content.muteTitle[flag][content.mute] ;
           content.mute = status;
          }
          this.$message({
            showClose: true,
            message: message + "成功",
            type: "success"
          });
          
          return;
        }
        this.$message({
          showClose: true,
          message: message + "失败",
          type: "error"
        });
      });
    },
    // muteClick: function() {
    // //   this.mute = this.mute ? 0 : 1;
    //   // if (!this.mute) {
    //   //   this.setInfos();

    //   // }
    //   this.setInfos(this.mute);
    //   // this.mute = 0;
    // }
  }
};
</script>

<style>
.rong-main-header {
  height: 60px;
  line-height: 60px;
  color: #4a4949;
  border-bottom: 1px solid #e7e7e7;
  padding: 0 20px;
  font-size: 18px;
  font-weight: 500;
}
.rong-main-header img {
  width: 32px;
  height: 32px;
  margin-top: 14px;
  position: absolute;
}
.rong-main-header input {
  margin-left: 40px;
  display: inline-block;
  min-width: 174px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
  height: 46px;
  background: #f5f5f5;
  border: 0px;
  font-size: 16px;
  color: #4a4949;
}
.rong-main-header input:focus{
  outline: 0px;
}
.rong-main-header i {
  position: absolute;
  right: 20px;
}
.rong-message-history {
  overflow-y: scroll;
  height: 100%;
}
.icon-jinyan:hover {
  color: #c52020;
}
.icon-xiaoxi:hover {
  color: #19ad77;
}
.rong-titlp {
  margin-top: -10px;
}
.icon-liebiao:hover {
  color: #19ad77;
}
</style>