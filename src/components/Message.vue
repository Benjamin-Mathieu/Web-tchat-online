<template>
    <div class="message">
        <img class="avatar" :src="'https://avatars.dicebear.com/v2/jdenticon/'+membre.id+'.svg'" alt="avatar-membre">
        
        <b><router-link :to="{name: 'Membre', params:{id : membre.id}}">{{membre.fullname}}</router-link></b>
        <hr>
        
        <p>{{message.message}}</p>
        
        <div class="buttons">
            <button @click="openEdit" v-if="showEdit">
            <img src="../assets/icons/edit.svg" alt="edit-icon" style="height: 16px; width: 16px">
            </button>
            <button @click="supprimerMessage" v-if="showEdit">
                <img src="../assets/icons/delete.svg" alt="delete-icon" style="height: 16px; width: 16px">
            </button>
        </div>
        
        <form v-if="isOpen"  @submit.prevent="editerMessage">
            <div><input v-model="editMessage" required type="text" placeholder="Editer le message"></div>
            <div><button>OK</button></div>
        </form>
    
        <p style="text-align: right; font-size: 0.8em">posté le {{dateMsg}}</p> 
    </div>
</template>

<script>
export default {
    props : ['message', 'membre'],

    data() {
        return {
            editMessage: '',
            showEdit: false,
            isOpen: false,
            dateMsg: ''
        }
    },

    mounted() {
        if(this.message.member_id == this.$store.state.membre.id) {
            this.showEdit = true;
        }
        let d = new Date(this.message.created_at);
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        this.dateMsg = d.toLocaleDateString('fr-FR', options);
    },

    methods: {
        editerMessage() {
            api.put('channels/' + this.message.channel_id + '/posts/' + this.message.id, {
                channel_id: this.message.channel_id,
                id: this.message.id,
                message: this.editMessage,
                token: this.$store.state.token
            }).then(response => {
                alert("Message edité");
            })
        },
        supprimerMessage() {
            if(confirm('Supprimer le message ?')) {
                api.delete('channels/' + this.message.channel_id + '/posts/' + this.message.id, {
                    channel_id: this.message.channel_id,
                    id: this.message.id,
                    token: this.$store.state.token
                }).then(response => {
                    console.log("Message supprimé");
                })
            }
            
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
        position: relative;

        hr {
            margin: 1em 0;
        }

        .buttons {
            display: none;
            position: absolute;
            top: 0; right: 0;
        }
        
        .avatar {
            height: 40px; width: 40px;
            margin-right: 1em;
        }
    }

    .message:hover {
        background-color: #AAA;

        .buttons{
            display: block;
        }
        button:hover {
            cursor: pointer;
        }
    }
</style>