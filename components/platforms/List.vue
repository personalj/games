<template>
  <div class="list">
    <div class="list__title">
      Platforms:
    </div>
    <div
      v-if="platforms.length"
    >
      <div
        v-for="platform in platforms"
        :key="platform.id"
        class="list__item"
      >
        <span
          :class="{'active': activePlatform === platform.id}"
          class="list__item-el"
          @click="choosePlatform(platform.id)"
        >
          {{ platform.name }}
        </span>
      </div>
    </div>
    <div
      v-else
    >
      No platforms data
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlatformsList',

  props: {
    platforms: {
      type: Array,
      default: () => []
    },
    activePlatform: {
      type: Number,
      default: 1
    }
  },

  methods: {
    choosePlatform (id) {
      this.$emit('choosePlatform', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  &__title {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  &__item {
    margin-bottom: 10px;
    &-el {
      cursor: pointer;
      font-size: 14px;
      transition: all .3s ease;
      &:hover, &.active {
        color: $mainBlue;
      }
    }
  }
}
</style>
