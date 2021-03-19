<template>
    <div class="row">
        <div class="column">
            
            <router-link :to="{name: 'Conversation', params:{id : conversation.id}}">{{conversation.topic}}</router-link>
            <span class="tag">tags: {{conversation.label}}</span>
            <div class="buttons">
                <button @click="openEdit"><img src="../assets/icons/edit.svg" alt="edit-topic"></button>
                 
                 <form v-if="isOpen"  @submit.prevent="editerConversation">
                    <input v-model="editTopic" required type="text" placeholder="Editer le titre">
                    <input v-model="editTag" required type="text" placeholder="Editer le(s) tag(s)">
                    <button>OK</button>
                </form>

                <button @click="effacerConversation"><img src="../assets/icons/delete.svg" alt="delete-topic"></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : ['conversation'],

    data() {
        return {
            isOpen : false,
            editTopic: '',
            editTag: ''
        }
    },

    methods: {
        openEdit() {
            this.isOpen = !this.isOpen;
        },
        editerConversation() {
                api.put('channels/' + this.conversation.id, {
                    id: this.conversation.id,
                    label: this.editTag,
                    topic: this.editTopic,
                    token: this.$store.state.token
                }).then(responses => {
                    console.log('Topic/tag édité');
                }).catch(error => {
                    console.log(error.response.data)
                })
        },
        effacerConversation() {
            if(confirm('Voulez-vous supprimer la conversation ' + this.conversation.topic + '?')) {
                api.delete('channels/' + this.conversation.id).then(responses => {
                    this.$bus.$emit('chargerConversation')
                }).catch(error => {
                    console.log(error.response.data)
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .row {
        border: 1px solid black;
        
        .column {
            display: flex;
            align-items: center;
            justify-content: space-between;
            a {
                text-decoration: none;
                color: #2750B8;
            }

            .tag {
                background-color: #E6EDFE;
                border: 1px solid #CCC;
            }

        }

        
    }
</style>