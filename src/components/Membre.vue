<template>
    <div class="row">
        <div class="column"> {{membre.fullname}} 
            <a :href=membre.email>{{membre.email}}</a>
        </div>
        <div class="column">
            <button>Voir conversations</button>
            <button @click="effacerMembre">Supprimer membre</button>
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
        effacerMembre() {
            if(confirm('Voulez-vous supprimer le membre ' + this.membre.fullname+ '?')) {
                api.delete('members/'+this.membre.id).then(response => {
                    this.$bus.$emit('chargerMembres')
                }).catch(error => {
                    console.log(error.response.data)
                })
            }
        }
    }
}
</script>