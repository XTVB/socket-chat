<template>
    <div class="chatMessage">
        <p>
            {{message.author}}
        </p>
        <p>
            {{message.sentTime}}
        </p>
        <p>
            {{message.messageContent}}
        </p>
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
    .chatMessage {
        padding: 5px;
        border: black solid 0.5px;
        margin: 5px;
    }

</style>
