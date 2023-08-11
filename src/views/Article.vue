<template>
  <div v-if="issue" class="blog-detail-container">
    <div class="title-container">
      <span class="title">{{ issue.title }}</span>
      <ul>
        <li
          v-for="label in issue.labels"
          :key="label.id"
          @click="setActiveLabel(label)"
          :style="{ backgroundColor: '#' + label.color }"
        >
          {{ label.name }}
        </li>
      </ul>
      <div class="back">
        <span @click="back">&lt;&lt;返回</span>
      </div>
    </div>
    <div class="comment-container" ref="commentContainer">
      <comment :comment="issue" />
      <comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Comment from "../components/Comment.vue";

export default {
  data() {
    return {
      issue: null,
      number: null,
      comments: [],
      newComment: null,
    };
  },
  components: { Comment },
  methods: {
    ...mapActions(["updateActiveLabel"]),
    setActiveLabel(label) {
      this.updateActiveLabel(label);
      this.$router.push("/");
    },
    getComments() {
      if (this.issue && this.issue.comments > 0) {
        this.$gitHubApi
          .getComments(this, this.issue.comments_url)
          .then((response) => {
            this.comments = response.data;
          });
      }
    },
    getIssue() {
      this.$gitHubApi.getIssue(this, this.number).then((response) => {
        this.issue = response.data;
        this.getComments();
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
  created() {
    if (this.$route.params.issue) {
      this.issue = this.$route.params.issue;
    } else {
      if (this.$route.params.number) {
        this.number = this.$route.params.number;
      } else {
        this.$router.replace("/");
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.issue) {
        this.getComments();
      } else {
        this.getIssue();
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.blog-detail-container {
  padding: 60px 1rem 20px;

  .title-container {
    position: relative;
    padding-right: 40px;
    .title {
      font-size: 2.25rem;
      color: #444;
      font-weight: 700;
      word-break: break-word;
    }
    > ul {
      margin: 0.25rem 0 0;
      overflow: hidden;
      li {
        font-size: 12px;
        color: #fff;
        float: left;
        margin: 0 6px 0 0;
        border-radius: 3px;
        padding: 1px 6px;
        cursor: pointer;
        font-family: "Droid Serif", Georgia, "Times New Roman", STHeiti, serif;
      }
    }
    .back {
      position: absolute;
      right: 0;
      bottom: 0;
      text-align: right;
      font-size: 14px;
      color: #999;
      line-height: 1;
      span {
        cursor: pointer;
      }
    }
  }
  .comment-container {
    margin-top: 12px;
    border-top: 1px solid #eee;
    padding-top: 2rem;
    overflow: hidden;
  }
}
</style>
