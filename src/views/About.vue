<template>
  <div class="about-me">
    <div class="back">
      <span @click="back">&lt;&lt;返回</span>
    </div>
    <div class="about-main">
      <article class="markdown-body" v-html="renderedMarkdown" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      renderedMarkdown: "",
    };
  },
  methods: {
    getReadme() {
      this.$gitHubApi.getReadme(this).then((response) => {
        if (response.data) {
          this.renderedMarkdown = this.$marked(response.data);
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getReadme();
    });
  },
};
</script>
<style lang="scss" scoped>
.back {
  text-align: right;
  font-size: 14px;
  color: #999;
  line-height: 1;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
  span {
    cursor: pointer;
  }
}
.about-me {
  padding: 60px 1rem 20px;
}
</style>
