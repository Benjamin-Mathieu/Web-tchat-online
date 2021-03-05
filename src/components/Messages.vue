<template>
    <div class="message">
        <img class="avatar" :src="'https://avatars.dicebear.com/v2/jdenticon/'+logoMembre+'.svg'" alt="">
        <b><router-link :to="{name: 'Membre', params:{id : membre.id}}">{{membre.fullname}}</router-link></b>
        {{message.message}}

        <form v-if="showEdit" @submit.prevent="editerMessage">
            <div><input v-model="editMessage" required type="text" placeholder="Tapez votre message"></div>
            <div><button>Editer message</button></div>
        </form>
    </div>
</template>

<script>
export default {
    props : ['message', 'membre'],

    data() {
        return {
            logoMembre: '',
            editMessage: '',
            showEdit: true
        }
    },

    mounted() {
        this.logoMembre = this.membre.id;
        console.log(this.$store.state);
        console.log(this.message);
    },

    methods: {
        editerMessage() {
            api.put('channels/' + this.message.channel_id + '/posts/' + this.message.id).then(response => {
                    if(this.message.member_id == this.membre.id) {
                        console.log('ok')
                    }
            })
        },

        // nouveauMessage() {
        //     api.get('channels/' + this.message.channel_id + '/posts/' + this.message.id), {
        //         channel_id = this.message.channel_id,
        //         id = this.message.id,
        //         message = this.message.message,
        //         token: this.$store.state.token
        //     }.then(response => {
        //         this.test = response.data;
        //         console.log(test);
        //     })
        // }


    }
}
</script>

<style lang="scss" scoped>
    .message {
        background-color: #CCC;
        margin: 1em;
        border-radius: 0.3em;
        padding: 1em;
        .avatar {
        height: 30px; width: 30px;
    }
    }
    
</style>