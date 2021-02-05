<template>

    <div>
    <div v-for="messages in $store.state.messages">
        <Messages/>
    </div>

        <form v-on:submit.prevent="envoyerMessage">
            <div><input v-model="message" required type="text" placeholder="Tapez votre message"></div>
            <div><button>Envoyer message</button></div>
        </form>
    </div>
</template>

<script>
import Messages from "@/components/Messages.vue"

export default {
    
    props : ['conversation'],
    components: {
        Messages
    },

    data() {
        return {
            message : this.$store.messages,
            member_id : this.$store.state.membre.id,
            channel_id : this.$store.state.conversations['0'].id
        }
    },
    methods: {
        envoyerMessage() {
            api.post('channels/' + this.channel_id + '/posts',  {
                channel_id : this.member_id,
                member_id : this.channel_id,
                message : this.message
            }).then(response => {
                this.$bus.$emit('poster-message')
            }).catch(error => {
                    console.log(error.response.data)
                })
        }
    }
}
</script>