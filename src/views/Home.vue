<template>
  <div class="container">
        <div class="header-container">
          <h3>Conversations</h3>
          <!-- Appel du modal pour créer une conversation -->
          <CreerConversation/>
        </div>
    
    <div class="conversations">
      <!-- Récupère toute les conversations qui sont stockés dans l'état "conversations" dans le store -->
      <div v-for="conversation in $store.state.conversations">
        <Conversation :conversation="conversation"/>
      </div>
    </div>
  
  </div>
</template>

<script>
  import CreerConversation from "@/components/CreerConversation.vue"
  import Conversation from '@/components/Conversation.vue'

  export default {
    name : 'Home',
    components: {
      CreerConversation,
      Conversation
    }

}
</script>

<style lang="scss">
  .container {
    text-align: left;
    margin: 1em;

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1em;
      background-color:#c8c8c8;
      color: white;
    }
  }
</style>