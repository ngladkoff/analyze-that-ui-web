import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  games: []
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  loadGamesList (state, gamesData) {
    state.games = gamesData;
  },
  
}

const actions = {
  getGamesList ({ commit }) {
    axios.get('http://localhost:8000/api/v1/games/').then(
      (response) => {
        commit('loadGamesList', response.data)
      }
    )
    .catch(
      (e) => {
        console.log(e)
      }
    );
  },
  newGame() {
    axios.get('http://localhost:8000/api/v1/dummy/').then(
      (response) => {
        this.dummys = response.data;
        alert(this.dummys[0].name);
        this.$router.push({ path: 'new'})
      }
    )
    .catch(
      (e) => {
        console.log(e)
      }
    );
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})