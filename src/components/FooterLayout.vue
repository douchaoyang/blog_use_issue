<template>
  <div>
    <div class="footer-layout-container">
      <p v-if="gitHubUser">
        &copy;2023 {{ gitHubUser.name }}. All rights reserved.
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["gitHubUser"]),
  },
};
</script>
<style lang="scss" scoped>
.footer-layout-container {
  background: #fff;
  padding: 40px 0 0;
  p {
    border-top: 1px solid #eee;
    text-align: center;
    font-size: 12px;
    padding: 20px 0 20px;
    color: #ccc;
  }
}
</style>
