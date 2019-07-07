<template>
    <div class="rateWidget">
        <span>How would you rate your experience today?</span>
        <ResponseOptionsList v-if="show" @clicked="selectRate($event)" v-bind:options="options"
        ></ResponseOptionsList>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import ResponseOptionsList from '@/components/ResponseOptionsList.vue';
import {dispatchSetRateResponse} from '@/store';

export default Vue.extend({
    name: 'RateWidget',
    components: {
        ResponseOptionsList,
    },
    props: {
        data: Array,
    },
    computed: {
        options() {
            const optionsArray = [];
            const startIndex = (this.data as number[])[0];
            const endIndex = (this.data as number[])[1];
            for (let i = startIndex; i <= endIndex; i++) {
                optionsArray.push(i);
            }
            return optionsArray;
        },
        show() {
            return this.$store.state.rateResponse === -1;
        },
    },
    methods: {
        selectRate(value: number) {
            dispatchSetRateResponse(this.$store, value);
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
