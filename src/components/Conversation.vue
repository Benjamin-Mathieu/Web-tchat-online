<template>
    <div class="row">
        <div class="column">
            
            <router-link :to="{name: 'Conversation', params:{id : conversation.id}}">{{conversation.topic}}</router-link>
            <span class="tag">tags: {{conversation.label}}</span>
            <button @click="effacerConversation"><img src="../assets/icons/delete.svg" alt="delete"></button>
        </div>
    </div>
</template>

<script>
export default {
    props : ['conversation'],

    methods: {
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

<style lang="scss">
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
                border: 1px solid black;
            }
        }

        
    }
</style>