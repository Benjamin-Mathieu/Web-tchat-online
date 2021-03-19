<template>
    <div class="container">
        <h1>Liste des membres</h1>
    
    <!-- Récupère tous les membres qui sont stockés dans l'état "membres" dans le store -->
    <div v-for="membre in $store.state.membres">
        <Membre :membre="membre"/>
    </div>
    </div>
</template>

<script>
import Membre from '@/components/Membre.vue'

export default {
    components: {
        Membre,
    },
    
}
</script>

<style lang="scss">
    h1{
        text-align: center;
    }
</style>