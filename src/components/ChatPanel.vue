<template>
    <div id="chatPanel">
        <div class="chatContainer">
            <ChatMessage
                    v-for="message in messages"
                    v-bind:message="message"
                    v-bind:key="message.sentTime"
            ></ChatMessage>
        </div>
        <div class="entryContainer">
            <input type="text" class="messageEntry">
            <button>Send</button>
        </div>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';
    import ChatMessage from '@/components/ChatMessage.vue';

    export default Vue.extend({
        name: 'ChatPanel',
        components: {
            ChatMessage,
        },
        props: {
            messages: Array,
        },
    });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    #chatPanel {
        padding: 5px;

        .chatContainer {
            width: 100%;
            height: 80%;
        }

        .entryContainer {
            width: 100%;
            height: 20%;
        }
    }

</style>
