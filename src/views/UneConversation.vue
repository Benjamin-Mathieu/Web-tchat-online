<template>

    <div class="messages">
        <div v-for="member in this.$store.state.membres">

            <div class="message" v-for="message in messages">
                <div class="member-msg" v-if="member.id == message.member_id">
                    <Message :message="message" :membre="member"/>
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
import Message from "@/components/Message.vue"

export default {
    
    components: {
        Message
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
        padding: 1em;
        text-align: left;
        margin: auto;
    }

    form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 1em;

        input {
            height: 2em;
            width: 400px;
            margin: auto;
        }

        button{
            padding: 0.7em;
            text-align: center;
            margin-top: 1em;
        }
    }
</style>