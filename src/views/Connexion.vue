<template>
<div>
        <form class="form-connexion" v-on:submit.prevent="connecterCompte">
            <div><h2>Se connecter</h2></div>
            <div>
                <b>E-mail</b>
                <input class="input-connexion" v-model="email" required type="email" placeholder="E-mail">
            </div>
            <div>
                <b>Mot de passe</b>
                <input class="input-connexion" v-model="password" required type="password" name="Mot de passe" id="pass" placeholder="Mot de passe">
            </div>
            <div><button class="connect-button">Connexion</button></div>
            <p><router-link to="/creer-compte" class="link">Créer un compte</router-link></p>
        </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            email : "",
            password : ""
        }
    },
    methods : {

        // Connexion du compte avec appel sur API
        connecterCompte() {
            api.post("members/signin", {
                email : this.email,
                password: this.password
            }).then(response => {
                alert("Vous êtes bien connecté")
                this.$store.commit("setMembre", response.data.member)
                this.$store.commit("setToken", response.data.token)
                console.log(response.data)

                this.$router.push("/")
            }).catch(error => {
                alert(error.response.data.message)
            })
        }
    }
}
</script>


<style lang="scss">
    .form-connexion{
        padding: 1em;
        width: 50%;
        height: 100vh;
        margin: auto;

        > :first-child {
            border-bottom: 1px solid;
            margin-bottom: 1em;
        }

        .input-connexion {
            padding: 0.3em;
            margin: 0.3em;
            width: 100%;
        }

        .connect-button {
            margin: 1em;
            padding: .7em;
            width: 50%;
            border-radius: .3em;
            border: none;
            background-color: #2750B8;
            opacity: .8;
            color: white;
            transition: .3s ease;

        }
        .connect-button:hover {
            cursor: pointer;
            opacity: 1;
            transition: .7s ease;
        }

        .link {
            text-decoration: none;
            font-size: .7em;
        }
    }
    
</style>