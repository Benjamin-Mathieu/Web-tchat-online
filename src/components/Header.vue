<template>
    <header>
        <nav class="navbar">
            <ul>
                <li>
                    <router-link to="/connexion">Coop</router-link>
                </li>
                <li>
                    <router-link to="/">Conversations</router-link>
                </li>
                <li>
                    <router-link to="/membres">Membres</router-link>
                </li>
                <li>
                    <button @click="seDeconnecter">Connexion / Se Déconnecter</button>
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
            this.$store.commit('seDeconnecter')
            this.$router.push("/connexion")
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
        color: green;
        background-color: whitesmoke;
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