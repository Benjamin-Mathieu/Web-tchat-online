<template>
    <div class="row">
        <div class="column">
            <!-- Redirection sur la conversation pour voir les messages -->
            <h2><router-link :to="{name: 'Conversation', params:{id : conversation.id}}">{{conversation.topic}}</router-link></h2>
            <span class="tag">tags: {{conversation.label}}</span>
            
            <!-- Boutons pour editer le titre, tags et supprimer la conversation -->
            <div class="buttons">
                <button @click="openEdit"><img src="../assets/icons/edit.svg" alt="edit-topic"></button>
                 
                 <!-- Si le bouton pour éditer est cliqué alors le formulaire pour modifier le titre et la description s'affiche -->
                 <form v-if="isOpen"  @submit.prevent="editerConversation">
                    <input v-model="editTopic" required type="text" placeholder="Editer le titre">
                    <input v-model="editTag" required type="text" placeholder="Editer le(s) tag(s)">
                    <button>OK</button>
                </form>

                <button @click="effacerConversation"><img src="../assets/icons/delete.svg" alt="effacer-conversation"></button>
            </div>
        </div>
        <hr>
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

        // Appel à l'API pour editer et effacer une conversation
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
        .column {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.3em;
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