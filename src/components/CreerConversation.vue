<template>
<div>
    <button class="new-conv-button" @click="afficherFormulaire">Nouvelle conversation</button>
    <div v-if="afficher" id="creer-conversation">
        <section>
            <h3>Ajouter une conversation</h3>
            <button class="close" @click="masquerFormulaire">X</button>
            <form @submit.prevent="creerConversation">
                    <div><input v-model="topic" required type="text" placeholder="Titre"></div>
                    <div><input v-model="label" required type="text" placeholder="Tags"></div>
                    <button class="creer-conv-button">Créer la conversation</button>
            </form>
        </section>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            afficher: false,
            topic: "", 
            label: ""
        }
    },
    mounted() {
        this.$bus.$on('creer-conversation', this.afficherFomulaire)
    },
    methods : {
        creerConversation() {
            api.post('channels', {
                label : this.label,
                topic : this.topic,
            }).then(response => {
                this.masquerFormulaire()
                this.$bus.$emit('charger-conversations')
            })
        },
        afficherFormulaire() {
            this.topic = '',
            this.label = '',
            this.afficher = true;
        },
        masquerFormulaire() {
            this.afficher = false;
        }
    }
}
</script>



<style lang="scss">

.new-conv-button {
    padding: .7em;
    border-radius: .3em;
    border: none;
    background-color: #2750B8;
    color: white;
    opacity: 0.8;
    transition: .3s ease;
}

.new-conv-button:hover {
    cursor: pointer;
    opacity: 1;
    transition: .7s ease;
}

#creer-conversation {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);

    section {
        position: absolute;
        left: 50%; 
        top: 50%;
        transform: translate(-50%, -50%);
        background: whitesmoke;
        padding: 1em;
        border-radius: 1em;

        h3 {
            color:#363636;
        }

        .close {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 0.7em;
        }
        .close:hover {
            cursor: pointer;
        }

        form {
        border: none;
        text-align: center;

        div {
            margin: .5em;

            input {
                padding: 0.3em;
                margin: 0.3em;
                border-top: none; border-left: none; border-right: none;
                border-bottom: 1px solid #2750B8;
                border-radius: .3em;
                width: 100%;
            }
        }

        .creer-conv-button {
            margin: 1em;
            padding: .7em;
            border-radius: .3em;
            border: none;
            background-color: #2750B8;
            color: white;
            opacity: 0.8;
            transition: .3s ease;

        }
        .creer-conv-button:hover {
            cursor: pointer;
            opacity: 1;
            transition: .7s ease;
        }
    }
}
}
    
</style>