<template>
    <header>
        <nav class="navbar">
            <ul>
                <li>
                    <router-link to="/">Conversations</router-link>
                </li>
                <li>
                    <router-link to="/membres">Membres</router-link>
                </li>
                <li v-if="this.$store.state.token === false">
                    <router-link to="/connexion" >Connexion</router-link>
                </li>
                <li v-else>
                    <button @click="seDeconnecter">Se déconnecter</button> 
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name : 'Header',
    methods : {
        seDeconnecter() {
            this.$store.commit('seDeconnecter');
            alert('Vous êtes déconnecté');
        }
    }
}
</script>

<style>
    .navbar {
        margin-bottom: 10px;
        padding: 1em;
        background-color: #2750B8;
    }
    .navbar ul {
        list-style-type: none;
        display: flex; justify-content: space-between; align-items: center;
    }
    .navbar a {
        text-decoration: none;
        color: whitesmoke;
    }
    .navbar a:hover {
        color: paleturquoise;
    }
    .navbar button {
        padding: 0.7em;
        background-color: rgb(62, 172, 172);
        border-radius: 0.3em;
    }
    .navbar button:hover {
        color: whitesmoke;
        background-color: green;
        cursor: pointer;
        transition: 0.7s ease;
        transform: scale(1.1);
    }
</style>