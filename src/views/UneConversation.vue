<template>

    <div class="messages">
        <div v-for="member in this.$store.state.membres">

            <div class="message" v-for="message in messages">
                <div class="member-msg" v-if="member.id == message.member_id">
                    <Messages :message="message" :membre="member"/>
                </div>
            </div> 
        </div>
        
        <form @submit.prevent="envoyerMessage">
            <div><input v-model="message" required type="text" placeholder="Tapez votre message"></div>
            <div><button>Envoyer message</button></div>
        </form>
    </div>
</template>

<script>
import Messages from "@/components/Messages.vue"

export default {
    
    components: {
        Messages
    },

    data() {
        return {
            messages : [],
            member_id : this.$store.state.membre.id,
            channel_id : this.$route.params.id,
            message : ''
        }
    },

    mounted() {
        this.chargerMessages()
        if(this.$route.params.member_id) 
        {
            this.membre = this.$store.getters.getMembre(this.$route.params.member_id)
            let cpt = 0
            
            this.$store.state.conversations.forEach(conversation => 
            {
                api.get('channels/' + this.channel_id + '/posts').then(response => 
                {
                    response.data.forEach(message => 
                    {
                        if(message.member_id == this.membre.id) 
                        {
                            message.conversation = conversation
                            this.messages.push(message)
                        }
                    })
                    cpt++;
                    if(this.$store.state.conversations.length == cpt) 
                    {
                        this.loading = false
                    }
                })
            })
        }
    },
    methods: {
        envoyerMessage() {
            api.post('channels/' + this.channel_id + '/posts',  {
                channel_id : this.channel_id,
                member_id : this.member_id,
                message : this.message
            }).then(response => {
                this.chargerMessages()
            })
        },
        chargerMessages() {
            api.get('channels/' + this.channel_id + '/posts', {
                token: this.$store.state.token
            }).then(response => {
                this.messages = response.data
            })
      }
    }
}
</script>

<style lang="scss" scoped>
    .messages {
        border: 1px solid grey;
        padding: 1em;
        text-align: left;
        margin: auto;
        width: 80%;
    }

    form {
        display: flex;
        align-items: center;
        margin-top: 1em;

        input {
            height: 2em;
            width: 300px;
        }

        button{
            padding: 0.7em;
            text-align: center;
            margin-left: 1em;
        }
    }
</style>