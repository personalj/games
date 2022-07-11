<template>
  <div class="loader-wrap">
    <span class="loader" />
  </div>
</template>

<script>
export default {
  name: 'LoaderDefault'
}
</script>

<style lang="scss" scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid $mainBlue;
  border-bottom-color: transparent;
  box-sizing: border-box;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
  &-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.95);
    opacity: 0;
    z-index: -2;
    transition: all .6s ease;
    &.active {
      opacity: 1;
      z-index: 10;
    }
  }
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
