<template>
  <div class="notFoundPage">
    <div class="img">
      <img src="@/components/service/404/images/404.png">
    </div>
    <div class="textArea">
      <el-button size="small" class="backToHome" icon="el-icon-back" @click="backToHome">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "notFoundPage",
  data() {
    return {};
  },

  mounted() {},
  props: [""],
  mixins: [],
  components: {},
  methods: {
    backToHome() {
      this.$router.push("/home");
    }
  },
  watch: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.img {
  text-align: center;
  margin-top: 130px;
}

.textArea {
  margin-top: 30px;
  text-align: center;
}
</style>