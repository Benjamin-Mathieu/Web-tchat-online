<template>
<div>
    <h1>Fiche membre : {{leMembre['fullname']}}</h1>
    <div class="fiche">
        <img class="avatar" :src="'https://avatars.dicebear.com/v2/jdenticon/'+logoMembre+'.svg'" alt="">
        <a :href="'mailto'+leMembre['email']">{{leMembre['email']}}</a>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            leMembre: [],
            logoMembre : ''
        }
    },

    mounted() {
            this.leMembre = this.$store.getters.getMembre(this.$route.params.id);
            this.logoMembre = this.leMembre['id'];       
    }
}
</script>

<style lang="scss">
    .fiche {
        display: flex;
        flex-direction: column;
        align-items: center;
        .avatar {
            width: 80px; height: 80px;
        }
    }
</style>