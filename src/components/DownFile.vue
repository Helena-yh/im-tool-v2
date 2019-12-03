<template>
  <div class="rong-down-pdf" style="page-break-after:always;">
    <div class="rong-down-btns" ref="btns">
      <i class="iconfont icon-fanhui" title="返回" @click="goBack()"></i>
      <i class="iconfont icon-shengchengpdf rong-right" title="生成 PDF" @click="PdfPrintDiv()"></i>
    </div>
    <div class="rong-pdf-title">本次支持问题报告</div>
    <div v-for="(issue,index) in issueList" :key="issue.questionId">
      <div class="rong-pdf-issue">
        <div class="rong-pdf-issue-title">{{index+1}}. {{issue.description}}</div>
        <textarea  v-model="issue.solution" :ref="'issue'+index" readonly="readonly"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DownLoadPDF",
  props: ["issueList"],
  mounted: function() {
    this.downFileInit();
  },
  methods: {
    downFileInit:function(){
      for(let i= 0;i<this.issueList.length;i++){
        this.autoTextarea(this.$refs['issue'+i][0])
      }
    },
    PdfPrintDiv: function() {
      this.$refs.btns.style.display = 'none';
      window.print();
      this.$refs.btns.style.display = 'block';
    },
    autoTextarea: function (elem) {
        elem.style.height = elem.scrollTop + elem.scrollHeight + "px";
    },
    goBack: function() {
      this.$emit("goBack");
    }
  }
};
</script>

<style>
.rong-down-pdf {
  height: 100%;
  overflow: auto;
}
.rong-pdf-title {
  font-size: 24px;
  text-align: center;
  padding: 10px;
}
.rong-down-btns{
  padding: 10px 20px;
  position: relative;
}
.rong-down-btns i{
  position: absolute;
  color: #616163;
}
.rong-right{
  right: 20px;
}
.rong-down-btns i:hover{
  color: #5c9cff
}
.rong-pdf-issue {
  /* width: 100%; */
  padding: 10px 20px;
}
.rong-pdf-issue-title{
    font-weight: bold;
    color: #5c9cff;
}
.rong-down-pdf textarea {
  resize: none;
  border: 0px solid;
  width: 90%;
  color: #595959;
  padding-left: 16px;
}
</style>