<template>
    <div class="membres">
        <div class="info"> 
            <img class="avatar" :src="'https://avatars.dicebear.com/v2/jdenticon/'+membre.id+'.svg'" alt="">
            <p>Pseudo: <router-link :to="{name: 'Membre', params:{id : membre.id}}">{{membre.fullname}}</router-link></p>
            <p>Email: <a :href="'mailto:'+membre.email">{{membre.email}}</a></p>
            <div class="column">
            <button @click="effacerMembre">Supprimer membre</button>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['membre'],

    computed: {
        membreConnecte() {
            return this.$store.state.membre.id = this.membre.id
        }
    },
    methods: {
        // Appel à l'API pour effacer un membre
        effacerMembre() {
                if(confirm('Voulez-vous supprimer le membre ' + this.membre.fullname+ '?')) {
                api.delete('members/'+this.membre.id).then(response => {
                    this.$bus.$emit('chargerMembres'); // Exécution de la fonction chargerMembre dans App.vue
                }).catch(error => {
                    console.log(error.response.data);
                })
            }      
        }
    },
    avatar() {
        
    }
}
</script>

<style lang="scss">

    .membres {
        width: 80%;
        margin: auto;
        text-align: center;

        .info {
            display: flex; flex-direction: column; align-items: center;
            margin: 1em;
            padding: 1em;
            border: 1px solid black;
            background-color: #CCC;
        }
        .avatar {
        width: 60px; height: 60px;
    }
    }
    
</style>