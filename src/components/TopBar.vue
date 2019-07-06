<template>
    <div id="topBar">
        <img alt="Vue logo" src="../assets/images/logo.png">
        <LogoutBar v-show="showDropdown" class="farRight"
                        v-bind:userName="userName"
        ></LogoutBar>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';
    import LogoutBar from './LogoutBar.vue';

    export default Vue.extend({
        name: 'TopBar',
        components: {
            LogoutBar,
        },
        props: {
            showDropdown: Boolean,
            userName: String,
        },
    });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../assets/scss/vars";

    #topBar {
        position: relative;
        width: 100%;
        height: 50px;
        border-bottom: 0.5px solid $socketChatDarkGreen;
        background-color: white;
        box-shadow: 0 0 3px 2px rgba($socketChatDarkGrey, 0.8);

        img {
            height: 40px;
            padding: 5px;
        }
        
        .farRight {
            float: right;
        }
    }

</style>
