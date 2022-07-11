<template>
  <div class="app">
    <div class="container">
      <div class="app__header">
        <form
          class="app__header-form"
          @submit.prevent="handleSubmit"
        >
          <input
            v-model="query"
            type="text"
            placeholder="Search game (min 3 letters)"
            class="input-text"
          >
          <button
            type="submit"
            class="btn-default"
            :disabled="query.length < 3"
            :class="{'disabled': query.length < 3}"
          >
            Search
          </button>
        </form>
      </div>
      <div class="app__main">
        <div class="app__sidebar">
          <platforms
            :platforms="platforms"
            :active-platform="platform"
            @choosePlatform="choosePlatform"
          />
        </div>
        <div class="app__info">
          <div class="app__info-filters-output">
            <div
              v-if="platform && released && !query"
              class="app__info-filters-output-item"
            >
              Games of: {{ released }}
            </div>
          </div>
          <div
            v-if="isQuery && query.length"
            class="app__info-hint"
          >
            Search for: <strong>{{ query }}</strong>
          </div>
          <div class="app__info-filters">
            <filters
              v-if="platform"
              :released="released"
              :rating="rating"
              @selectDates="selectDates"
              @selectSort="selectSort"
            />
          </div>
          <games
            :games="games"
          />
          <loader
            :class="{'active': isLoading}"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Platforms from '@/components/platforms/List'
import Games from '@/components/games/List'
import Filters from '@/components/games/Filters'
import Loader from '@/components/common/Loader'

export default {
  name: 'IndexPage',
  components: {
    Platforms,
    Games,
    Filters,
    Loader
  },
  layout: 'default',

  async asyncData ({ store }) {
    const data = {
      page: 1
    }
    await store.dispatch('modules/games/fetchGamesList', data)
    await store.dispatch('modules/games/fetchPlatforms')
    const platforms = store.getters['modules/games/platformsList']
    return { platforms }
  },

  data () {
    return {
      page: 1,
      platform: null,
      query: '',
      rating: '',
      released: '',
      isQuery: false,
      isLoading: false
    }
  },

  head: {
    title: 'Games page'
  },

  computed: {
    games () {
      return this.$store.getters['modules/games/gamesList']
    },
    count () {
      return this.$store.getters['modules/games/count']
    }
  },

  mounted () {
    if (this.games) {
      this.getNextGames()
    }
  },

  methods: {
    async fetchGames () {
      try {
        if ((this.count <= this.games.length && this.page !== 0) || this.isLoading) {
          return
        }
        this.isLoading = true
        const data = {
          page: this.page += 1
        }
        if (this.platform) {
          Object.assign(data, { platform: this.platform })
          if (this.released) {
            Object.assign(data, { released: this.released })
          }
          if (this.rating) {
            Object.assign(data, { rating: this.rating })
          }
        }
        if (this.query) {
          Object.assign(data, { query: this.query })
        }
        await this.$store.dispatch('modules/games/fetchGamesList', data)
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    },
    getNextGames () {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.fetchGames()
        }
      }
    },
    clearData () {
      this.page = 0
      this.query = ''
      this.isQuery = false
    },
    choosePlatform (id) {
      this.clearData()
      this.platform = id
      this.fetchGames()
    },
    handleSubmit () {
      if (this.query.length >= 3) {
        this.platform = null
        this.page = 0
        this.fetchGames()
        this.isQuery = true
        this.released = ''
        this.$router.push({
          query: {
            query: this.query
          }
        })
      }
    },
    selectDates (value) {
      this.clearData()
      value === 'default' ? this.released = '' : this.released = value
      this.fetchGames()
    },
    selectSort (value) {
      this.clearData()
      value === 'default' ? this.rating = '' : this.rating = value
      this.fetchGames()
    }
  }
}
</script>

<style lang="scss" scoped>
  .app {
    margin-top: 50px;
    margin-bottom: 40px;
    &__header {
      margin-bottom: 60px;
      &-form {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
      }
      .input-text {
        width: calc(100% - 100px);
      }
    };
    &__main {
      @media screen and (min-width: 992px) {
        display: flex;
        justify-content: space-between;
      }
    }
    &__sidebar {
      margin-bottom: 40px;
      @media screen and (min-width: 992px) {
        width: 18%;
        padding-right: 10px;
      }
    }
    &__info {
      position: relative;
      @media screen and (min-width: 992px) {
        width: 82%;
      }
      &-hint {
        font-size: 14px;
        margin-bottom: 20px;
      }
      &-filters {
        margin-bottom: 40px;
        &-output {
          &-item {
            font-weight: bold;
            font-size: 26px;
            color: $mainBlue;
            margin-bottom: 30px;
          }
        }
      }
    }
  }
</style>
