<template>
    <div class="logoutDropdown">
        <div>
            <div @click="logout" class="logoutButton">
                <img title="Log Out" class="x-icon" src="../assets/images/x-icon.png">
            </div>
            <div class="userName">
                {{userName}}
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import {commitSetLogin} from '@/store';

export default Vue.extend({
    name: 'LogoutBar',
    props: {
        userName: String,
    },
    methods: {
        logout() {
            commitSetLogin(this.$store, false);
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../assets/scss/vars";

    .logoutDropdown {
        width: 400px;
        height: 100%;

        .logoutButton {
            position: absolute;
            margin: 0 !important;
            right: 1vw;
            left: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 30px;
            cursor: pointer;
            .x-icon {
                position: absolute;
                width: inherit;
                height: inherit;
                border-radius: 30px;
                background-color: $socketChatDarkBlue;

                &:hover {
                    background-color: $socketChatDarkGreen;
                }
            }

            &:after {
                content: '';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                height: 30px;
                left: -1vw;
                border-left: 1.2px solid $socketChatDarkBlue;
            }
        }

        .userName {
            position: absolute;
            /* There should be 1 vw either side of the divider which is 1.2px, the logoutButton starts at 1vw right*/
            /* and is 30px wide therefore use calc to position the name correctly*/
            right: calc(3vw + 31.2px);
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>
