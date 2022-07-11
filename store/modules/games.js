import { gamesLimit } from '@/consts'

export const state = () => ({
  gamesList: [],
  platformsList: [],
  game: {},
  gameScreenshots: [],
  count: 0
})

export const mutations = {
  setGamesList (state, data) {
    if (data.results.length) {
      data.payload.page === 1 ? state.gamesList = data.results : state.gamesList.push(...data.results)
      return
    }

    state.gamesList = []
  },
  setPlatformsList (state, platformsList) {
    state.platformsList = platformsList
  },
  setGame (state, game) {
    state.game = game
  },
  setGameScreenshots (state, screenshots) {
    state.gameScreenshots = screenshots
  },
  setGamesCount (state, data) {
    state.count = data.count
  }
}

export const actions = {
  async fetchGamesList ({ commit }, payload) {
    try {
      let data = null
      if (payload.platform) {
        if (payload.released && !payload.rating) {
          data = await this.$axios.$get(`games?parent_platforms=${payload.platform}&dates=${payload.released}&page=${payload.page}&page_size=${gamesLimit}&key=${process.env.API_KEY}`)
        }
        if (payload.rating && !payload.released) {
          data = await this.$axios.$get(`games?ordering=-rating&parent_platforms=${payload.platform}&page=${payload.page}&page_size=${gamesLimit}&key=${process.env.API_KEY}`)
        }
        if (payload.rating && payload.released) {
          data = await this.$axios.$get(`games?ordering=-rating&parent_platforms=${payload.platform}&dates=${payload.released}&page=${payload.page}&page_size=${gamesLimit}&key=${process.env.API_KEY}`)
        }
        if (!payload.released && !payload.rating) {
          data = await this.$axios.$get(`games?parent_platforms=${payload.platform}&page=${payload.page}&page_size=${gamesLimit}&key=${process.env.API_KEY}`)
        }
      }

      if (payload.query) {
        data = await this.$axios.$get(`games?search=${payload.query}&page=${payload.page}&page_size=${gamesLimit}&key=${process.env.API_KEY}`)
      }

      if (!payload.platform && !payload.query) {
        data = await this.$axios.$get(`games?page=${payload.page}&page_size=${gamesLimit}&key=${process.env.API_KEY}`)
      }
      commit('setGamesList', { results: data.results, payload })
      commit('setGamesCount', { count: data.count })
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async fetchPlatforms ({ commit }) {
    try {
      const { results } = await this.$axios.$get(`platforms/lists/parents?key=${process.env.API_KEY}`)
      commit('setPlatformsList', results || [])
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async fetchGame ({ commit }, id) {
    try {
      const data = await this.$axios.$get(`games/${id}?key=${process.env.API_KEY}`)
      commit('setGame', data || [])
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },
  async fetchScreenshots ({ commit }, id) {
    try {
      const { results } = await this.$axios.$get(`games/${id}/screenshots?key=${process.env.API_KEY}`)
      commit('setGameScreenshots', results || [])
    } catch (e) {
      commit('setError', e, { root: true })
    }
  }
}

export const getters = {
  gamesList: state => state.gamesList,
  platformsList: state => state.platformsList,
  game: state => state.game,
  gameScreenshots: state => state.gameScreenshots,
  count: state => state.count
}
