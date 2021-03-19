<template>
    <div>
        <h1>Créer un compte</h1>
        <form v-on:submit.prevent="creerCompte">
            <div><input v-model="fullname" required type="text" placeholder="Nom"></div>
            <div><input v-model="email" required type="email" placeholder="email"></div>
            <div><input v-model="password" required type="password" name="Mot de passe" id="pass"></div>
            <div><button>Créer le compte</button></div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fullname : "",
            email : "",
            password : ""
        }
    },
    methods : {

        // Création du compte avec l'api
        creerCompte() {
            api.post("members", {
                // Récupération des data rentrés dans les inputs pour l'envoi
                fullname: this.fullname,
                email: this.email,
                password: this.password
            }).then(response => {
                // Si tout se passe bien, message d'alerte et redirection
                alert("Votre compte a été crée, vous pouvez vous connecter à Coop !")
                this.$router.push('/connexion')
                console.log(response.data)
            }).catch(error => {
                alert(error.response.data.message)
            })
        }
    }
}
</script>