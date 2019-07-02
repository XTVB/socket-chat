<template>
    <div id="app">
        <TopBar
                v-bind:showDropdown="loggedIn"
                v-bind:userName="userName"
        ></TopBar>
        <transition name="slideAwayLeft">
            <LoginDialog
                    v-show="!loggedIn"
                    v-on:login="loggedIn = $event"
                    v-on:setUserName="userName = $event"
                    class="loginDialog floatingPanel"
            ></LoginDialog>
        </transition>
        <transition name="slideAwayRight">
            <ChatPanel
                    v-show="loggedIn" class="chatPanel floatingPanel"
                    v-bind:messages="messages"
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
        data() {
            return {
                loggedIn: false,
                userName: 'test',
                messages: [
                    {
                        author: 'System',
                        sentTime: 'Today',
                        messageContent: 'Welcome to Socket Chat. Type /help for options',
                        isLocal: false,
                    },
                ],
            };
        },
        sockets: {
            connect() {
                console.log('socket connected');
            },
            message(message: SocketMessage) {
                console.log(message);
                const newMessage: ChatMessage = {
                    author: message.author,
                    sentTime: new Date().toDateString(),
                    messageContent: message.message,
                    isLocal: false,
                };
                // @ts-ignore
                this.messages.push(newMessage);
            },
            command(message: SocketCommand) {
                console.log(message);
                // this.messages.push(message);
            },
        },
        methods: {
            requestCommand() {
                // $socket is socket.io-client instance
                this.$socket.emit('command');
            },
            testMessage() {
                const content = 'test';
                const user = this.userName;

                // $socket is socket.io-client instance
                this.$socket.emit('message', {author: user, message: content});
                const newMessage: ChatMessage = {
                    author: user,
                    sentTime: new Date().toDateString(),
                    messageContent: content,
                    isLocal: true,
                };
                this.messages.push(newMessage);
            },
        },
    });
</script>

<style lang="scss">
    @import "./assets/vars";
    @import "./assets/mixins";
    @import "./assets/fonts";
    @import "./assets/animations";

    body {
        font-family: 'Lexia';
        font-size: 16px;
        margin: 0;
        background-color: rgba($socketChatBackgroundColour, 0.4);

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
                @include centrally-position-div;
                border-radius: 10px;
                border: $socketChatGreen solid 0.5px;
                box-shadow: 0 0 3px 2px rgba($socketChatDarkGrey, 0.8);
                background-color: white;
            }
        }
    }

</style>
