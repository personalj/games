<template>
  <div class="info">
    <div class="container">
      <nuxt-link
        to="/"
        class="info__btn"
      >
        Back to games list
      </nuxt-link>
      <div
        v-if="game.background_image"
        class="info__img-wrap"
      >
        <img :src="game.background_image" alt="game" class="info__img">
      </div>
      <div
        v-if="gameScreenshots.length"
        class="info__gallery"
      >
        <client-only>
          <swiper
            :options="sliderOption"
            class="info__gallery-item"
          >
            <swiper-slide
              v-for="slide in gameScreenshots"
              :key="slide.id"
            >
              <img
                :src="slide.image"
                alt="game image"
                class="info__gallery-item-img"
              />
            </swiper-slide>
          </swiper>
          <div class="info__gallery-btns">
            <div class="swiper-button-prev info__gallery-btn_prev info__gallery-btn" />
            <div class="swiper-button-next info__gallery-btn_next info__gallery-btn" />
          </div>
        </client-only>
      </div>
      <h1 class="info__title info__item">
        {{ game.name }}
      </h1>
      <div class="info__item">
        Rating: <strong>{{ game.rating }}</strong>
      </div>
      <div class="info__descr info__item">
        <p>{{ game.description_raw }}</p>
      </div>
      <div class="info__web">
        <a :href="game.website">
          {{ game.website }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameInfo',
  layout: 'default',

  async asyncData ({ store, params }) {
    if (params.id) {
      await store.dispatch('modules/games/fetchGame', params.id)
      await store.dispatch('modules/games/fetchScreenshots', params.id)
    }
    const game = store.getters['modules/games/game']
    const gameScreenshots = store.getters['modules/games/gameScreenshots']
    return { game, gameScreenshots }
  },

  head: {
    title: 'Game page'
  },

  data () {
    return {
      sliderOption: {
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  margin-top: 50px;
  margin-bottom: 50px;
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    &-wrap {
      height: 300px;
      position: relative;
      max-width: 80%;
      margin: 0 auto 40px;
      @media screen and (min-width: 768px) {
        height: 400px;
      }
    }
  }
  &__btn {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 40px;
    text-decoration: underline;
    transition: all .3s ease;
    &:hover {
      color: $mainBlue;
    }
  }
  &__title {
    font-weight: bold;
    font-size: 18px;
    @media screen and (min-width: 768px) {
      font-size: 28px;
    }
  }
  &__gallery {
    margin: 0 auto 50px;
    position: relative;
    @media screen and (min-width: 768px) {
      max-width: 85%;
    }
    &-item {
      position: relative;
      height: 150px;
      @media screen and (min-width: 768px) {
        height: 300px;
      }
      &-img {
        height: 150px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        object-fit: cover;
        @media screen and (min-width: 768px) {
          height: 300px;
        }
      }
    }
    &-btn {
      width: 45px;
      height: 45px;
      font-size: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $mainWhite;
      cursor: pointer;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 1px 1px 26px 6px rgba(0,0,0,0.1);
      color: rgba(0,0,0,0.8);
      z-index: 10;
      @media screen and (min-width: 768px) {
        width: 65px;
        height: 65px;
      }
      &_prev {
        left: 20px;
        &:before {
          content: '<';
        }
      }
      &_next {
        right: -26px;
        &:before {
          content: '>';
        }
        @media screen and (min-width: 768px) {
          right: -42px;
        }
      }
    }
  }
  &__item {
    margin-bottom: 25px;
  }
  &__descr {
    font-size: 15px;
    line-height: 22px;
    margin-bottom: 40px;
  }
  &__web a {
    color: $mainBlue;
    transition: all .3s ease;
    &:hover {
      transform: translateY(3px);
    }
  }
}
</style>
