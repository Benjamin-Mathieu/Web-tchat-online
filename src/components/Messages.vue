<template>
    <div class="message">
        <img class="avatar" :src="'https://avatars.dicebear.com/v2/jdenticon/'+membre.id+'.svg'" alt="">
        <b><router-link :to="{name: 'Membre', params:{id : membre.id}}">{{membre.fullname}}</router-link></b>
        {{message.message}}

        <button @click="openEdit" v-if="showEdit">
            <img src="../assets/icons/edit.svg" alt="edit-icon" style="height: 16px; width: 16px">
        </button>
        <button @click="supprimerMessage" v-if="showEdit">
            <img src="../assets/icons/delete.svg" alt="delete-icon" style="height: 16px; width: 16px">
        </button>
        <form v-if="isOpen"  @submit.prevent="editerMessage">
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
            editMessage: '',
            showEdit: false,
            isOpen: false
        }
    },

    mounted() {
        // console.log(this.$store.state.membre.id);
        // console.log(this.message.member_id);

        // if(this.message.member_id == this.$store.state.membre.id) {
        //     this.showEdit = true;
        // }        
    },

    methods: {
        editerMessage() {
            api.put('channels/' + this.message.channel_id + '/posts/' + this.message.id, {
                channel_id: this.message.channel_id,
                id: this.message.id,
                message: this.editMessage,
                token: this.$store.state.token
            }).then(response => {
                console.log("Message edité");   
            })
        },
        supprimerMessage() {
            api.delete('channels/' + this.message.channel_id + '/posts/' + this.message.id, {
                channel_id: this.message.channel_id,
                id: this.message.id,
                token: this.$store.state.token
            }).then(response => {
                console.log("Message supprimé");   
            })
        },

        openEdit() {
            this.isOpen = !this.isOpen;
        }

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