<template>
  <div id="app" v-if="apiOk">
    <Header/>
    <router-view/>
  </div>
  <div v-else>
    Impossible de joindre l'API
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {

  components: {
    Header
  },

  data() {
    return {
      apiOk : false
    }
  },
  mounted() {
    console.log("L'app est démarrée")

    api.get('ping').then(reponse => {
      this.apiOk = true;
      console.log("L'api est fonctionnelle");

    this.chargerMembres();
    this.$bus.$on('chargerMembres', this.chargerMembres)

    this.chargerConversation();
    this.$bus.$on('charger-conversations', this.chargerConversation)

    // this.chargerMessages();
    // this.$bus.$on('charger-messages', this.chargerMessages)

      if(!this.$store.state.membre) {
        if(this.$route.path != "/connexion") {
          this.$router.push("/connexion");
        }
      }
    }).catch(error => {
      console.log("L'api ne marche pas");
    })

  },
    methods : {
      chargerMembres() {
        api.get('members', {
          token: this.$store.state.token
        }).then(response => {
          this.$store.commit('setMembres', response.data)
        }).catch(error => {
          console.log(error.response.data.message)
        })
      },

      chargerConversation(){
      api.get('channels', {
          token : this.$store.state.token
      }).then(response => {
          this.$store.commit('setConversation', response.data);

      }).catch(error => {
          alert(error.response.data.message)
      })

    }

  } 
}
</script>

<style lang="scss">

* {
  margin : 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
