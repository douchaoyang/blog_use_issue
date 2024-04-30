<template>
  <div
    class="labels"
    :style="{
      background: `linear-gradient(to right, ${gradientColor.join(',')})`,
    }"
  >
    <ul
      class="label-list"
      v-if="labels.length"
    >
      <li @click="setActiveLabel(null)">
        <span
          class="checked"
          v-if="!activeLabel"
        >
          ALL
        </span>
        <span
          v-else
          style="background-color: #3593f2"
        >
          ALL
        </span>
      </li>
      <li
        v-for="label in labels"
        :key="label.id"
        @click="setActiveLabel(label)"
      >
        <span
          class="checked"
          v-if="activeLabel && activeLabel.name === label.name"
        >
          {{ label.name }}
        </span>
        <span
          v-else
          :style="{ backgroundColor: '#' + label.color }"
        >
          {{ label.name }}
        </span>
      </li>
      <router-link
        tag="li"
        :to="{
          name: 'About',
        }"
      >
        <span style="background-color: #987ff1">关于我</span>
      </router-link>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["labels", "gradientColor", "activeLabel"]),
  },
  methods: {
    ...mapActions(["setLabels", "updateActiveLabel"]),
    setActiveLabel(label) {
      if (this.$route.name === "Article") {
        this.updateActiveLabel(label);
        this.$router.push("/");
      } else {
        if (this.activeLabel && label && this.activeLabel.name === label.name) {
          this.updateActiveLabel(null);
        } else {
          this.updateActiveLabel(label);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.labels {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li {
      span {
        display: block;
        font-size: 12px;
        color: #fff;
        padding: 4px 8px;
        text-align: center;
        cursor: pointer;
        white-space: nowrap;
        &.checked {
          background: #000;
          cursor: default;
        }
        font-family: "Droid Serif", Georgia, "Times New Roman", STHeiti, serif;
      }
    }
  }
}
</style>