<template>
<div>
    <div class="fiche">
        <div><img class="avatar" :src="'https://avatars.dicebear.com/v2/jdenticon/'+leMembre.id+'.svg'" alt="avatar-logo"></div>
        <div class="info-membre">
            <h1>{{leMembre.fullname}}</h1>
            <p>Email: <a :href="'mailto:'+leMembre.email">{{leMembre.email}}</a></p>
            <p>Membre depuis le {{dateCreation}}</p>
        </div>
    </div>

    <h2>Messages</h2>
        <template v-for="message in messagesTries">
            <Message :message="message" :membre="leMembre"></Message>
        </template>
    </div>
    
    </div>
    
</div>
</template>

<script>
import Message from '@/components/Message.vue';

export default {
    components: {
        Message
    },

    data() {
        return {
            leMembre: [],
            logoMembre : '',
            messages: [],
            dateCreation: ''
        }
    },

    mounted() {
        this.leMembre = this.$store.getters.getMembre(this.$route.params.id);
        let d = new Date(this.leMembre.created_at);
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.dateCreation = d.toLocaleDateString('fr-FR', options);
            
        let cpt=0;
        this.$store.state.conversations.forEach(conversation => {
            api.get('channels/' + conversation.id + '/posts').then(response => {
                response.data.forEach(message => {
                    if(message.member_id == this.leMembre.id) {
                        message.conversation = conversation;
                         this.messages.push(message)
                    }
                })
                cpt++
                if(this.$store.state.conversations.length == cpt) {
                    setTimeout(() => this.loading=false,2000);
                }
            })
        })
        
    },

    computed: {
        messagesTries() {
            function compare(a, b) {
                if(a.created_at < b.created_at) {
                    return 1;
                }
                if(a.created_at > b.created_at) {
                    return -1;
                }
                return 0;
            }
            return this.messages.sort(compare).slice(0, 10);
        }
    }
}
</script>

<style lang="scss">
    .fiche {
        display: flex;
        align-items: center;
        text-align: left;
        padding: 1em;
        .avatar {
            width: 80px; height: 80px;
        }
        .info-membre {
            margin-left: 1em;
            h1{
                text-align: left;
            }
        }
    }
</style>