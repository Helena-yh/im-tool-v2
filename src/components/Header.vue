<template>
  <el-header>
    <div class="rong-main-header">
      <img src="../../public/favicon.png" alt />
      <span>技术支持工具</span>

      <el-tooltip class="item" effect="dark" :content="muteTitle[mute]" placement="bottom" v-if="role == 'admin'">
        <i :class="['iconfont',  mute ? 'icon-xiaoxi':'icon-jinyan']" @click="muteClick()"></i>
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
        0: "禁言",
        1: "解禁"
      },
      mute: 0,
      minute: 29 * 24 * 60,
      memberIds: localStorage.getItem("rong_user_" + this.groupId)
    };
  },
  mounted: function() {
      this.getMuteStatus();
  },
  methods: {
    getMuteStatus: function() {
      var data = { ids: [this.groupId]}; 
      this.$axios.post(this.config.host + "/group/get_infos", data).then(res => {
        console.info(res);
        if (res.data.code == 200) {
          console.info(res);
          this.mute = res.data.result[0].muteStatus;
          return;
        }
        this.$message({
          showClose: true,
          message: "获取禁言状态错误",
          type: "error"
        });
      });
    },
    addMute: function() {
      let memberIds = this.memberIds;
      let data = {
        id: this.groupId,
        memberIds: [memberIds],
        minute: this.minute
      }; //定义一个data储存需要带的参数
      this.$axios.post(this.config.host + "/group/mute", data).then(res => {
        console.info(res);
        if (res.data.code == 200) {
          console.info(res);
        //   this.getIssueList();
          return;
        }
        this.$message({
          showClose: true,
          message: "群组禁言失败",
          type: "error"
        });
      });
    },
    removeMute: function() {
      var data = { id: this.groupId,memberIds:[this.memberIds],muteStatus: 0}; //定义一个data储存需要带的参数
      this.$axios
        .post(this.config.host + "/group/set_mute_status", data)
        .then(res => {
          console.info(res);
          if (res.data.code == 200) {
            console.info(res);
            // this.getIssueList();
            return;
          }
          this.$message({
            showClose: true,
            message: "群组解禁失败",
            type: "error"
          });
        });
    },
    muteClick: function() {
    //   this.mute = this.mute ? 0 : 1;
      if (!this.mute) {
        this.addMute();
        this.mute = 1;
      }
      this.removeMute();
      this.mute = 0;
    }
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
.rong-main-header span {
  margin-left: 40px;
  display: inline-block;
  min-width: 174px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
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