<template>
    <div v-bind:class="[shake ? 'shake' : '']">
        <div class="loginContainer">
            <h2>Login</h2>
            <br>
            <form>
                <input v-model="userInput" type="text" placeholder="Username" class="userNameEntry">
                <input v-model="passwordInput" type="password" placeholder="Password" class="passwordEntry">
                <span v-show="invalidLogin">Usename or password is incorrect</span>
                <button @click="attemptLogin">Submit</button>
            </form>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import {dispatchDoLogin} from '@/store';

export default Vue.extend({
    name: 'LoginDialog',
    data() {
        return {
            invalidLogin: false,
            userInput: '',
            passwordInput: '',
            shake: false,
        };
    },
    methods: {
        // Dummy Login, in an actual application this would send the inputs to the server to verify
        attemptLogin(event: Event) {
            event.preventDefault();
            // TODO uncomment when not developing
            // if (this.userInput === 'TestUser' && this.passwordInput === 'test') {
            this.invalidLogin = false;
            dispatchDoLogin(this.$store);
                // this.$emit('setUserName', this.userInput);
            this.userInput = '';
            this.passwordInput = '';
            // } else {
            //     this.invalidLogin = true;
            //     const self = this;
            //     self.shake = true;
            //     // Clear the class after 1 second (when the animation has completed) so that the dialog
            //     // gets shook again next time an invalid login is attempted
            //     setTimeout(() => {
            //         self.shake = false;
            //     }, 1000);
            // }
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../assets/scss/mixins";
    @import "../assets/scss/vars";

    .loginContainer {
        position: relative;
        width: 90%;
        height: 60%;
        color: $socketChatDarkBlue;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        h2 {
            margin: 0;
        }

        input, button, span {
            display: block;
            margin: 0 auto;
        }

        input {
            width: 80%;
            height: 40px;
            border: 1px $socketChatDarkBlue solid;
            border-radius: 8px;
            box-sizing: border-box;
            padding: 5px;
            margin-bottom: 15px;
        }

        span {
            color: $socketChatDarkRed;
            font-size: 12px;
            margin-bottom: 10px;
        }
    }

</style>
