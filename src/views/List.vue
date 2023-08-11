<template>
  <div class="blog-list-container">
    <div class="blog-header" v-if="gitHubUser">
      <div class="bio">
        <span>*</span>
        {{ gitHubUser.bio }}
      </div>
      <div class="search">
        <input
          type="text"
          v-model="keyword"
          placeholder="按文章标题或内容搜索..."
          @keyup.enter="searchIssues()"
        />
      </div>
    </div>
    <ul v-if="!isNoData" class="issue-list" ref="issueList">
      <li class="issue-item" v-for="issue in issues" :key="issue.id">
        <router-link
          tag="a"
          :to="{
            name: 'Article',
            params: { number: issue.number, issue: issue },
          }"
        >
          {{ issue.title }}
        </router-link>
        <ul v-if="issue.labels.length">
          <li
            class="tag tag-small"
            v-for="label in issue.labels"
            :key="label.id"
            @click="setActiveLabel(label)"
            :style="{ color: '#' + label.color }"
          >
            {{ label.name }}
          </li>
        </ul>
        <span class="time">
          {{ $moment(issue.created_at).format("YYYY-MM-DD HH:mm") }}
        </span>
      </li>
    </ul>
    <div v-if="isNoData" class="no-data">
      <div></div>
      <span>该分类下还没有文章哦</span>
    </div>
    <div class="bottom-bar">
      <pagination
        v-if="issues.length"
        :totalNum="totalNum"
        :currentPage="currentPage"
        :pageSize="pageSize"
        @currentPageChanged="handleCurrentPageChanged"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Pagination from "../components/Pagination.vue";

export default {
  data() {
    return {
      keyword: "",
      totalNum: 0,
      currentPage: 1,
      issues: [],
      isNoData: false,
    };
  },
  components: { Pagination },
  watch: {
    activeLabel(label) {
      this.keyword = "";
      this.totalNum = 0;
      this.currentPage = 1;
      this.getIssues();
    },
  },
  computed: {
    ...mapGetters(["activeLabel", "pageSize", "gitHubUser"]),
  },
  methods: {
    ...mapActions(["updateActiveLabel"]),
    setActiveLabel(label) {
      this.updateActiveLabel(label);
    },
    searchIssues() {
      this.currentPage = 1;
      this.getIssues();
    },
    handleCurrentPageChanged(val) {
      this.currentPage = val;
      this.getIssues();
    },
    getIssues() {
      this.isNoData = false;
      this.$gitHubApi
        .getIssues(this, {
          label: this.activeLabel ? this.activeLabel.name : "",
          keyword: this.keyword,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((response) => {
          this.totalNum = response.data.total_count;
          this.issues = response.data.items;
          if (!this.issues || this.issues.length === 0) {
            this.isNoData = true;
          }
          this.$nextTick(() => {
            document.documentElement.scrollTop = 0;
          });
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getIssues();
    });
  },
};
</script>
<style lang="scss" scoped>
.blog-list-container {
  padding: 60px 1rem 20px;
  .blog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bio {
      font-size: 14px;
      color: #999;
      line-height: 1;
      font-family: "Droid Serif", Georgia, "Times New Roman", STHeiti, serif;
      span {
        color: #f00;
        font-weight: bold;
        font-size: 16px;
        float: left;
        height: 16px;
        overflow: hidden;
        line-height: 22px;
        margin-right: 2px;
      }
    }
    .search {
      input {
        width: 140px;
        font-size: 12px;
        color: #444;
        &::-webkit-input-placeholder {
          color: #ccc;
          font-style: italic;
        }
      }
    }
  }
  .issue-list {
    margin-top: 12px;
    border-top: 1px solid #eee;
    padding-top: 2rem;
    overflow: hidden;
    > li {
      padding: 4rem 15%;
      background: #f8f8f8;
      border-radius: 0.5rem;
      font-size: 0;
      box-shadow: #f4f4f4 0 0 1rem inset;
      margin-bottom: 2rem;
      > a {
        font-size: 2.25rem;
        color: #444;
        font-weight: 700;
        word-break: break-word;
      }
      > ul {
        margin: 1.25rem 0 0;
        overflow: hidden;
        li {
          font-size: 14px;
          color: #1a1a1a;
          float: left;
          margin: 0 12px 0 0;
          cursor: pointer;
          font-family: "Droid Serif", Georgia, "Times New Roman", STHeiti, serif;
        }
      }
      > span {
        display: block;
        text-align: right;
        font-size: 14px;
        margin: 1.25rem 0 0;
        color: #ccc;
        font-family: "Droid Serif", Georgia, "Times New Roman", STHeiti, serif;
      }
    }
  }
  .no-data {
    padding: 2rem 0 4rem;
    div {
      height: 150px;
      background: url("../assets/no-data.png") no-repeat center center;
    }
    span {
      display: block;
      text-align: center;
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
