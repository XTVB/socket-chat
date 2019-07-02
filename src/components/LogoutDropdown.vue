<template>
    <div class="logoutDropdown">
        <h2>
            {{userName}}
        </h2>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'LogoutDropdown',
        props: {
            userName: String,
        },
    });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .logoutDropdown {
        width: 100px;
        height: 100%;
        border: black solid 0.5px;
    }
</style>
