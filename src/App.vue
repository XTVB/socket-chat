<template>
    <div id="app">
        <TopBar
                v-bind:showDropdown="loggedIn"
                v-bind:userName="userName"
        ></TopBar>
        <transition name="slideAwayLeft">
            <LoginDialog
                    v-show="!loggedIn"
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
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        },
        messages() {
            return this.$store.state.messages;
        },
        userName() {
            return this.$store.state.username;
        },
    },
});
</script>

<style lang="scss">
    @import "assets/scss/vars";
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

                @media #{$mobile} {
                    width: 100%;
                    // The top bar is 50px so need to take that into account
                    height: calc(100% - 50px);
                }
            }
            .chatPanel {
                width: 70%;
                // The top bar is 50px so need to take that into account
                height: calc(90% - 50px);

                @media #{$mobile} {
                    width: 100%;
                    // The top bar is 50px so need to take that into account
                    height: calc(100% - 50px);
                }
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

                @media #{$mobile} {
                    border: unset;
                    border-radius: unset;
                    box-shadow: unset;
                }
            }
        }
    }

</style>
