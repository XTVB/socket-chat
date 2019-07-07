<template>
    <div class="completeWidget">
        <span>Would you like to end this conversation?</span>
        <ResponseOptionsList v-if="show" @clicked="selectCompleted($event)" v-bind:options="data"
        ></ResponseOptionsList>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import ResponseOptionsList from '@/components/ResponseOptionsList.vue';
import {dispatchSetCompleteResponse} from '@/store';

export default Vue.extend({
    name: 'CompleteWidget',
    components: {
        ResponseOptionsList,
    },
    props: {
        data: Array,
    },
    computed: {
        show() {
            // Only show if response is in unset state
            return this.$store.state.completeResponse === '';
        },
    },
    methods: {
        selectCompleted(value: string) {
            dispatchSetCompleteResponse(this.$store, value);
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
