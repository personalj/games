<template>
  <div>
    <div
      v-if="games.length"
      class="list"
    >
      <div
        v-for="game in games"
        :key="game.id"
        class="list__item"
      >
        <div class="list__item-inner">
          <client-only>
            <div
              v-if="game.background_image"
              class="list__item-img-wrap"
              @click="openGame(game.id)"
            >
              <img
                :src="game.background_image"
                alt="game img"
                class="list__item-img"
              >
            </div>
          </client-only>
          <div class="list__item-info-details">
            <div
              class="list__item-info list__item-title"
              @click="openGame(game.id)"
            >
              {{ game.name }}
            </div>
            <div
              class="list__item-info  list__item-rating"
            >
              Rating: <strong>{{ game.rating }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!games && !games.length"
    >
      No games data
    </div>
  </div>
</template>

<script>
export default {
  name: 'GamesList',
  props: {
    games: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    openGame (id) {
      this.$router.push(`/game/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  @media screen and (min-width: 576px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }
  &__item {
    margin-bottom: 20px;
    padding: 0 10px;
    &-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
      cursor: pointer;
      transition: all .3s ease;
      &:hover {
        color: $mainBlue;
      }
    }
    &-rating {
      font-size: 14px;
    }
    @media screen and (min-width: 576px) {
      width: 50%;
    }
    @media screen and (min-width: 992px) {
      width: 25%;
    }
    &-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      &-wrap {
        height: 120px;
        position: relative;
        cursor: pointer;
      }
    }
    &-info {
      margin-bottom: 10px;
      &-details {
        padding: 25px 15px 15px;
        height: 100%;
        background: $mainBlack;
        color: $mainWhite;
      }
    }
    &-inner {
      border-radius: $border-10;
      overflow: hidden;
    }
  }
}
</style>
