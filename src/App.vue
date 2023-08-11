<template>
  <div class="app">
    <router-view class="main-container" />
    <footer-layout class="footer-container" />
  </div>
</template>
<script>
import FooterLayout from "./components/FooterLayout.vue";
import { mapActions } from "vuex";

export default {
  components: {
    FooterLayout,
  },
  methods: {
    ...mapActions(["setLabels", "setGitHubUser"]),
  },
  mounted() {
    this.$nextTick(function () {
      this.$gitHubApi.getUserInfo(this).then(
        this.$http.spread((userResp, labelResp) => {
          this.setGitHubUser(userResp.data);
          this.setLabels(labelResp.data);
        })
      );
    });
  },
};
</script>
<style lang="scss" scoped>
</style>
