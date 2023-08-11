<template>
  <div class="paginataion-container">
    <span class="total-num">共 {{ totalNum }} 条</span>
    <span
      :class="lastCurrentPage === 1 ? 'pre-page-disabled' : 'pre-page'"
      @click="selectPage(parseInt(page) - 1)"
    >
      前一页
    </span>
    <input
      ref="currentPageInput"
      type="text"
      class="current-page"
      v-model="page"
      @keyup.enter="handleCurrentPageChanged()"
    />
    <span class="page-count">/ {{ pageCount }}</span>
    <span
      :class="
        lastCurrentPage === pageCount ? 'next-page-disabled' : 'next-page'
      "
      @click="selectPage(parseInt(page) + 1)"
    >
      后一页
    </span>
  </div>
</template>
<script>
export default {
  props: {
    totalNum: {
      type: Number,
      required: false,
      default: 0,
      validator(val) {
        return val >= 0;
      },
    },
    currentPage: {
      type: Number,
      required: false,
      default: 1,
    },
    pageSize: {
      type: [Number],
      required: false,
      default: 10,
      validator(val) {
        return val >= 5;
      },
    },
  },
  data() {
    return {
      lastCurrentPage: 1,
      page: 1,
    };
  },
  computed: {
    pageCount() {
      if (this.totalNum === 0) {
        return 1;
      }
      return parseInt((this.totalNum - 1) / this.pageSize) + 1;
    },
  },
  methods: {
    selectPage(newCurrentPage) {
      this.page = newCurrentPage;
      this.handleCurrentPageChanged();
    },
    handleCurrentPageChanged() {
      let newCurrentPage = parseInt(this.page);
      if (newCurrentPage <= 0) {
        this.page = newCurrentPage = 1;
      }
      if (newCurrentPage > this.pageCount) {
        this.page = newCurrentPage = this.pageCount;
      }
      if (newCurrentPage !== this.lastCurrentPage) {
        this.lastCurrentPage = newCurrentPage;
        this.$emit("currentPageChanged", parseInt(newCurrentPage));
      }
    },
  },
  watch: {
    currentPage(val) {
      this.lastCurrentPage = this.currentPage;
      this.page = this.currentPage;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.lastCurrentPage = this.currentPage;
      this.page = this.currentPage;
    });
  },
};
</script>
<style lang="scss" scoped>
.paginataion-container {
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin: 0 12px;
    font-size: 12px;
    color: #444;
  }
  input {
    font-size: 12px;
    width: 32px;
    border: 1px solid #eee;
    text-align: center;
    color: #f00;
  }
  .pre-page,
  .next-page {
    cursor: pointer;
  }
  .pre-page-disabled,
  .next-page-disabled {
    pointer-events: none;
    color: #aaa;
  }
}
</style>
