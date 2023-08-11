<template>
  <div class="comment">
    <div class="comment-title">
      <div @click="openGitHub()">
        <img :src="comment.user.avatar_url" />
        <span>{{ comment.user.login }}</span>
      </div>
      <span class="time">{{
        $moment(comment.created_at).format("YYYY-MM-DD HH:mm")
      }}</span>
    </div>
    <article class="comment-body markdown-body" v-html="renderedMarkdown" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      renderedMarkdown: "",
    };
  },
  props: ["comment"],
  methods: {
    renderMarkdown() {
      this.renderedMarkdown = "";
      if (this.comment.body_html) {
        this.renderedMarkdown = this.comment.body_html;
      } else if (this.comment.body) {
        this.renderedMarkdown = this.$marked(this.comment.body);
      }
    },
    openGitHub() {
      window.open(this.comment.user.html_url);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.renderMarkdown();
    });
  },
};
</script>
<style lang="scss" scoped>
.comment {
  border-radius: 4px;
  border: solid 1px #eeeeee;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  .comment-title {
    height: 48px;
    background-color: #f5f5f5;
    border-bottom: solid 1px #eee;
    padding: 0px 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      cursor: pointer;
      display: flex;
      align-items: center;
      img {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        margin-right: 12px;
      }
      span {
        font-size: 14px;
        color: #444;
      }
    }
    .time {
      font-size: 12px;
      color: #ccc;
      font-family: "Droid Serif", Georgia, "Times New Roman", STHeiti, serif;
    }
  }

  .comment-body {
    padding: 1rem;
    font-size: 14px;
  }
}
</style>
