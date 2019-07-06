<template>
    <div id="app">
        <TopBar
                v-bind:showDropdown="loggedIn"
                v-bind:userName="userName"
        ></TopBar>
        <transition name="slideAwayLeft">
            <LoginDialog
                    v-show="!loggedIn"
                    v-on:setLoggedIn="loggedIn = $event"
                    class="loginDialog floatingPanel"
            ></LoginDialog>
        </transition>
        <transition name="slideAwayRight">
            <ChatPanel
                    v-show="loggedIn" class="chatPanel floatingPanel"
                    v-bind:messages="messages"
                    v-bind:userName="userName"
            ></ChatPanel>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TopBar from '@/components/TopBar.vue';
import LoginDialog from '@/components/LoginDialog.vue';
import ChatPanel from '@/components/ChatPanel.vue';

export default Vue.extend({
    name: 'app',
    components: {
        TopBar,
        LoginDialog,
        ChatPanel,
    },
    created() {
        document.title = 'Socket Chat';
    },
    data() {
        return {
            userName: 'test',
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        },
        messages() {
            return this.$store.state.messages;
        },
    },
});
</script>

<style lang="scss">
    @import "assets/scss/vars";
    @import "assets/scss/mixins";
    @import "assets/scss/fonts";
    @import "assets/scss/animations";

    body {
        font-family: 'Lexia';
        font-size: 16px;
        color: $socketChatDarkBlue;
        margin: 0;
        background-color: rgba($socketChatLightGrey, 0.4);

        #app {
            position: absolute;
            height: 100%;
            width: 100%;

            .loginDialog{
                width: 400px;
                height: 300px;
            }
            .chatPanel {
                width: 500px;
                height: calc(80% - 50px);
            }

            .floatingPanel {
                position: absolute;
                // Position half way down plus the height of the top bar
                top: calc(50% + 50px);
                left: 50%;
                transform: translate(-50%, calc(-50% - 25px));
                border-radius: 10px;
                border: $socketChatDarkGreen solid 0.5px;
                box-shadow: 0 0 3px 2px rgba($socketChatDarkGrey, 0.8);
                background-color: white;
            }
        }
    }

</style>
