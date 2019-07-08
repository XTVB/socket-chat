<template>
    <div id="topBar">
        <img alt="Vue logo" src="../assets/images/logo.png">
        <LogoutBar v-show="loggedIn" class="farRight"></LogoutBar>
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
        computed: {
            loggedIn() {
                return this.$store.state.loggedIn;
            },
        },
    });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../assets/scss/vars";

    #topBar {
        // Make sure topBar has highest z-index so that border bottom shows even in mobile view where the panels reach
        // the top bar
        z-index: 1;
        position: relative;
        width: 100%;
        height: 50px;
        border-bottom: 0.5px solid $socketChatDarkGreen;
        background-color: white;
        box-shadow: $shadow;

        img {
            // Make the image centered while taking up the full height
            height: 40px;
            padding: 5px;
        }
        
        .farRight {
            float: right;
        }

        @media #{$mobile} {
            box-shadow: unset;
        }
    }

</style>
