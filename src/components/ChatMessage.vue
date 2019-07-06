<template>
    <div class="chatMessageContainer" :class="message.isLocal ? 'isLocal' : 'isExternal'">
        <div class="chatMessage">
            <div class="messageDetails">
                {{message.author}} : {{message.sentTime}}
            </div>
            <div class="messageContent">
                <span>{{message.messageContent}}</span>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'ChatMessage',
        props: {
            message: Object,
        },
    });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../assets/scss/vars";

    .chatMessageContainer {
        width: 90%;
        margin-bottom: 10px;

        .chatMessage {
            padding: 15px;
            border: $socketChatDarkGrey solid 0.5px;
            border-radius: 20px;
            color: white;
            display: inline-block;

            .messageDetails {
                margin-bottom: 5px;
            }

            .messageContent {
                white-space: pre-wrap;
            }
        }

        &.isLocal {
            text-align: left;
            margin-right: 10%;

            .chatMessage {
                background-color: $socketChatLightBlue;
            }
        }

        &.isExternal {
            text-align: right;
            margin-left: 10%;
            .chatMessage {
                text-align: left;
                background-color: $socketChatLightGreen;
            }
        }
    }

</style>
