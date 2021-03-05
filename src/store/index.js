import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage : window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins : [vuexLocal.plugin],
  state: {
    membre : false,
    token: false,
    membres: false,
    conversations: false
  },
  mutations: {
    setMembre(state, membre) {
      state.membre = membre
    },
    setMembres(state, membres) {
      state.membres = membres
    },
    setConversation(state, conversations) {
      state.conversations = conversations
    },
    setToken(state, token) {
      state.token = token
    },
    seDeconnecter(state) {
      state.token = false
      state.member = false
    }
  },
  getters: {
    getMembre(state)
    {
      return (membre_id) => {
        return state.membres.find((membre) => {
          return membre_id == membre.id
        })
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
