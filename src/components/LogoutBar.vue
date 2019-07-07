<template>
    <div class="logoutBar">
        <div>
            <div @click="logout" class="logoutButton">
                <img alt="Log Out" title="Log Out" class="x-icon" src="../assets/images/x-icon.png">
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
    computed: {
        userName() {
            return this.$store.state.username;
        },
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

    .logoutBar {
        height: 100%;

        .logoutButton {
            position: absolute;
            margin: 0 !important;
            left: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 30px;
            cursor: pointer;
            right: 2vw;
            @media #{$maxLogoutButtonsSpacing} {
                // Max out the reactive positioning at 850px, i.e. 17px between each element
                right: 17px;
            }

            .x-icon {
                position: relative;
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
                border-left: 1.2px solid $socketChatDarkBlue;
                left: -2vw;
                @media #{$maxLogoutButtonsSpacing} {
                    // Max out the reactive positioning at 850px, i.e. 17px between each element
                    left: -17px;
                }
            }
        }

        .userName {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            /* There should be 2 vw either side of the divider which is 1.2px, the logoutButton starts at 2vw right*/
            /* and is 30px wide therefore use calc to position the name correctly*/
            right: calc(6vw + 31.2px);
            @media #{$maxLogoutButtonsSpacing} {
                // Max out the reactive positioning at 850px, i.e. 17px between each element
                right: calc(51px + 31.2px);
            }
        }
    }
</style>
