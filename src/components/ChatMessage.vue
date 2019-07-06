<template>
    <div class="chatMessageContainer" :class="message.isLocal ? 'isLocal' : 'isExternal'">
        <div class="chatMessage">
            <div class="messageDetails">
                {{message.author}} : {{message.sentTime}}
            </div>
            <div v-if="isCommand(message)">
                <component v-bind:is="commandType"
                           v-bind:data="message.data"
                ></component>
                <span>{{message.type}}</span>
            </div>
            <div v-else class="messageContent">
                <span>{{message.messageContent}}</span>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import BaseChatDetails from '@/tsclasses/BaseChatDetails';
import CommandChatDetails from '@/tsclasses/CommandChatDetails';
import {CommandEventType} from '@/tsclasses/SocketChat';
import CompleteWidget from '@/components/widgets/CompleteWidget.vue';
import DateWidget from '@/components/widgets/DateWidget.vue';
import MapWidget from '@/components/widgets/MapWidget.vue';
import RateWidget from '@/components/widgets/RateWidget.vue';

export default Vue.extend({
    name: 'ChatMessage',
    components: {
        CompleteWidget,
        DateWidget,
        MapWidget,
        RateWidget,
    },
    props: {
        message: BaseChatDetails,
    },
    computed: {
        commandType() {
            switch ((this.message as CommandChatDetails).type) {
                case CommandEventType.DATE:
                    return 'DateWidget';
                case CommandEventType.MAP:
                    return 'MapWidget';
                case CommandEventType.RATE:
                    return 'RateWidget';
                case CommandEventType.COMPLETE:
                    return 'CompleteWidget';
            }
        },
    },
    methods: {
        isCommand(details: BaseChatDetails): details is CommandChatDetails {
            return details instanceof CommandChatDetails;
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../assets/scss/vars";

    .chatMessageContainer {
        width: 90%;
        margin-bottom: 10px;

        @media #{$mobile} {
            width: 100%;
        }

        .chatMessage {
            padding: 15px;
            border: $socketChatDarkGrey solid 0.5px;
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
            @media #{$mobile} {
                margin-right: 0;
            }

            .chatMessage {
                border-radius: 20px 20px 20px 0;
                background-color: $socketChatLightBlue;
            }
        }

        &.isExternal {
            text-align: right;
            margin-left: 10%;
            @media #{$mobile} {
                margin-left: 0;
            }

            .chatMessage {
                border-radius: 20px 20px 0 20px;
                text-align: left;
                background-color: $socketChatLightGreen;
            }
        }
    }

</style>
