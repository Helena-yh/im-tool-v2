<template>
  <div class="rong-issue-main">
    <el-header>
      <div class="rong-issue-header">
        <span>问题列表</span>
        <i class="rong-issue-add iconfont icon-ziyuan" @click="addIssue()"></i>
        <i v-if="role == 'admin'" class="rong-issue-pdf iconfont icon-shengchengpdf" @click="downLoadPDF()"></i>
      </div>
    </el-header>
    <div class="rong-issue-list">
      <el-collapse accordion>
        <el-collapse-item v-for="issue in issueList" :key="issue.questionId" class="rong-issue-item">
          <template slot="title" class="rong-issue-body">
            <el-dropdown trigger="click" v-if="role == 'admin'">
                <i :class="['rong-issue-status','iconfont', issue.status == 0 ? 'icon-daichuli-copy' : 'icon-chenggongyijiejue']" :status="issue.status"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >
                      <div @click="changeStatus(1,issue)"><i class="rong-issue-status iconfont icon-chenggongyijiejue"></i>解决</div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="changeStatus(0,issue)"><i class="rong-issue-status iconfont icon-daichuli-copy"></i>处理中</div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <i v-else :class="['rong-issue-status','rong-issue-custrom','iconfont',issue.status == 0 ? 'icon-daichuli-copy' : 'icon-chenggongyijiejue']"></i>
            <input :title="issue.description" class="rong-issue-description" type="text" 
                    v-model="issue.description" 
                    @change="updateIssue(issue)"/>
            <i  v-if="role == 'admin'" class="rong-issue-delete iconfont icon-delete" @click="deleteIssue(issue)"></i>
          </template>
          <textarea class="rong-issue-solution" v-model="issue.solution" :readonly="role =='cutrom'"  @change="updateIssue(issue)"></textarea>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "issueList",
  props: ["role","targetId"],
  data() {
    return {
      issueList: [],
    };
  },
  mounted:function(){
      this.getIssueList();
  },
  methods: {
    addIssue: function() {
      var data = { groupId: this.targetId,solution: "123", description: "123" }; //定义一个data储存需要带的参数
      this.$axios.post(this.config.host + "/question/add", data).then(res => {
          console.info(res);
          if (res.data.code == 200) {
            console.info(res);
            this.getIssueList();
            return;
          }
          this.$message({
            showClose: true,
            message: "添加问题列表错误",
            type: "error"
          });
        });
    },
    getIssueList: function() {
        var data = { groupId: this.targetId };
      this.$axios.post(this.config.host + "/question/search_all",data).then(res => {
          if (res.data.code == 200) {
            this.issueList = res.data.result;
            return;
          }
          this.$message({
            showClose: true,
            message: "获取问题列表错误",
            type: "error"
          });
        });
    },
    updateIssue: function(issue) {
      this.$axios.post(this.config.host + "/question/modify", issue).then(res => {
          if (res.data.code == 200) {
            console.info(res);

            this.getIssueList();
            return;
          }
          this.$message({
            showClose: true,
            message: "更新问题列表错误",
            type: "error"
          });
        });
    },
    deleteIssue: function(issue) {
      var data = { id: issue.id} 
      this.$axios.post(this.config.host + "/question/delete", data).then(res => {
          if (res.data.code == 200) {
            this.getIssueList();
            return;
          }
          this.$message({
            showClose: true,
            message: "删除问题列表错误",
            type: "error"
          });
        });
    },
    changeStatus: function(command,issue){
      console.info('ads',command,issue)
      issue.status = command;
      this.updateIssue(issue);
    },
    downLoadPDF:function() {
      this.$emit("downLoadPDF",this.issueList);
    }
  }
};
</script>

<style>
.rong-issue-main{
    background: #363e45;
}
.rong-issue-body{
    position: relative;
}
.rong-issue-header{
    color: #fff;
    line-height: 60px;
    position: relative;
    padding-left: 10px;
}
.rong-issue-list{
    height: calc(80vh - 60px);
    overflow: scroll;
}
.rong-issue-add{
    position: absolute;
    right: 10px;
    display: inline-block;
} 
.rong-issue-pdf{
    position: absolute;
    right: 40px;
    display: inline-block;
}
.rong-issue-pdf:hover{
  color: #5cadff;
}
.rong-issue-delete{
    position: absolute;
    right: 26px;
    display: inline-block;
    font-size: 14px;
    color: #878788;
}
.rong-issue-delete:hover{
    color: #e7e7e7
}
.rong-issue-add:hover{
    color: #5cadff;
}
.rong-issue-custrom{
   color: #5cadff;
}
.rong-issue-status{
    width: 40px;
    text-align: center;
}
.rong-issue-description{
    width: 80%;
    height: 46px;
    padding-left: 4px;
}
.rong-issue-solution{
    width: 94%;
    height: 66px;
    padding: 6px 4px 0 10px;
    margin: 0 auto;
}
.rong-issue-description,.rong-issue-solution{
    background: #363e45;
    border: 0px;
    resize: none;
    border-color: #e7e7e7;
    color: #e7e7e7;
}
.rong-issue-description:focus,.rong-issue-solution:focus{
    outline: 0px;

}
.icon-daichuli-copy:hover{
    color: #5cadff;
}
.rong-issue-item{
    padding-left: 10px;
}
.icon-chenggongyijiejue{
  color: #19ad77;
}
.icon-chenggongyijiejue:hover{
  color: #19ad77;
}
</style>