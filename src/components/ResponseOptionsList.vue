<template>
    <div class="optionButtonsContainer">
        <div v-for="option in options"
             @click="clicked(option)" class="optionButton">
            <span>{{option}}</span>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ResponseOptionsList',
    props: {
        options: Array,
    },
    methods: {
        clicked(value: string) {
            this.$emit('clicked', value);
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../assets/scss/vars";

    .optionButtonsContainer {
        margin-top: 10px;

        .optionButton {
            margin: 0 auto 5px auto;
            width: 70%;
            display: block;
            background-color: $socketChatLightBlue;
            box-sizing: border-box;
            border-radius: 20px;
            padding: 0 10px;
            font-size: 14px;
            text-align: center;
            line-height: 50px;
            white-space: nowrap;
            cursor: pointer;
        }
    }
</style>
