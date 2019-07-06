<template>
    <div class="chatPanel">
        <div ref="chatContainer" class="chatContainer">
            <transition-group
            v-on:enter="messageAdded">
                <ChatMessage
                        v-for="message in messages"
                        v-bind:message="message"
                        v-bind:key="message.uuid"
                ></ChatMessage>
            </transition-group>
        </div>
        <div class="chatInputContainer">
            <input v-model="messageInput"
                   @keyup.enter="sendMessage"
                   type="text" class="messageEntry">
            <div @click="sendMessage" class="chatSendButton">
                <span> Send</span>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import ChatMessage from '@/components/ChatMessage.vue';
import {commitNewChat} from '@/store';
import MessageChatDetails from '@/tsclasses/MessageChatDetails';

export default Vue.extend({
    name: 'ChatPanel',
    components: {
        ChatMessage,
    },
    props: {
        messages: Array,
        userName: String,
    },
    data() {
      return {
          messageInput: '',
      };
    },
    methods: {
        messageAdded() {
            const container = this.$refs.chatContainer as Element;
            container.scrollBy({
                top: container.scrollHeight - container.scrollTop,
                left: 0,
                behavior: 'smooth',
            });
        },
        sendMessage() {
            const content = this.messageInput;
            this.messageInput = '';
            // If message is empty don't send it
            if (content.trim() === '') {
                return;
            }
            if (content.indexOf('/') === 0) {
                this.processChatOption(content);
                return;
            }

            const user = this.userName;
            const newChat = new MessageChatDetails(user, new Date(), true, content);
            commitNewChat(this.$store, newChat);
            // $socket is socket.io-client instance
            this.$socket.emit('message', {author: user, message: content});
        },
        processChatOption(option: string) {
            // Ignore the '/' which is the first character of the string
            switch (option.slice(1)) {
                case 'help':
                    commitNewChat(this.$store, new MessageChatDetails('Socket Chat', new Date(), false,
                        '/help - Get list of available options\n' +
                        '/command - Request a new "command" type event from the socket'));
                    break;
                case 'command':
                    this.requestCommandSocketEvent();
                    break;
                default:
                    commitNewChat(this.$store, new MessageChatDetails('Socket Chat', new Date(), false,
                        'Chat command not recognised, type /help for list of commands'));
                    break;
            }
        },
        requestCommandSocketEvent() {
            // $socket is socket.io-client instance
            this.$socket.emit('command');
        },

    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../assets/scss/vars";

    .chatPanel {
        // Leave padding-right as 0px and make the children 20px less wide so that the padding-right in chatContainer
        // allows the scroll bar to not overlap the chat messages
        padding: 20px 0 20px 20px;
        box-sizing: border-box;

        .chatContainer {
            width: calc(100% - 20px);
            // Full height minus the margin and the height of the input
            height: calc(100% - 60px);
            margin-bottom: 10px;
            overflow: scroll;
            padding-right: 15px;
        }

        .chatInputContainer {
            width: calc(100% - 20px);
            height: 50px;
            display: table;

            .messageEntry {
                display: table-cell;
                background-color: $socketChatLightGrey;
                color: $socketChatDarkBlue;
                height: 100%;
                line-height: 50px;
                outline: 0;
                padding: 0 10px;
                font-size: 14px;
                width: 100%;
                box-sizing: border-box;
                border: 1px solid $socketChatDarkGrey;
                border-radius: 10px 0 0 10px;
            }

            .chatSendButton {
                display: table-cell;
                background-color: $socketChatLightBlue;
                box-sizing: border-box;
                border: 1px solid $socketChatDarkGrey;
                border-left: 0;
                border-radius: 0 10px 10px 0;
                padding: 0 10px;
                color: white;
                font-size: 14px;
                text-align: center;
                line-height: 50px;
                white-space: nowrap;
                cursor: pointer;
            }
        }
    }

</style>
