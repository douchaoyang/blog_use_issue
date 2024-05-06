<template>
  <div>
    <div class="footer-layout-container">
      <p v-if="gitHubUser">
        &copy;2024 {{ gitHubUser.login }}. All rights reserved.
      </p>
    </div>
    <div
      v-if="gitHubUser"
      class="page-player"
    >
      <iframe
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        width="330"
        height="86"
        :src="`//music.163.com/outchain/player?type=${
          gitHubUser.location.split('|')[1]
        }&id=${gitHubUser.location.split('|')[2]}&auto=1&height=66`"
      ></iframe>
      <span class="name">
        <marquee scrollamount="4">
          {{ gitHubUser.location.split("|")[0] }}
        </marquee>
      </span>
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
  position: relative;
  p {
    border-top: 1px solid #eee;
    text-align: center;
    font-size: 12px;
    padding: 20px 0 20px;
    color: #ccc;
    line-height: 25px;
  }
}
.page-player {
  width: 66px;
  height: 66px;
  position: fixed;
  right: 1px;
  top: 50%;
  margin-top: -33px;
  overflow: hidden;
  z-index: 99;
  border-radius: 6px;
  span {
    position: absolute;
    left: 0;
    font-size: 12px;
    line-height: 12px;
    height: 12px;
    color: #fff;
    white-space: nowrap;
    width: 100%;
    &.name {
      top: 0;
      pointer-events: none;
    }
  }
  iframe {
    display: block;
    position: absolute;
    left: -10px;
    top: -10px;
  }
}
</style>
