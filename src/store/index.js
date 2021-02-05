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
    conversations: false,
    messages: false
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
    setMessage(state, messages) {
      state.messages = messages
    },
    seDeconnecter(state) {
      state.token = false
      state.member = false
    }
  },
  actions: {
  },
  modules: {
  }
})
