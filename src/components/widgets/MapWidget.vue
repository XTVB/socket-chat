<template>
    <div>
        <span>Your appointment will be at the following location: </span>
        <div ref="map" class="map"></div>
    </div>
</template>


<script lang="ts">
import {} from 'googlemaps';
import Vue from 'vue';
import {LatLang} from '@/tsclasses/SocketChat';

export default Vue.extend({
    name: 'MapWidget',
    props: {
        data: Object as () => LatLang,
    },
    mounted(): void {
        const map = new google.maps.Map(this.$refs.map as Element, {
            zoom: 14,
            center: this.data,
            gestureHandling: 'cooperative',
        });

        const marker = new google.maps.Marker({
            position: this.data,
            map,
            title: 'Meeting Place',
        });
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../../assets/scss/vars";

    .map {
        width: 400px;
        height: 400px;
        margin-top: 10px;
        border-radius: 10px;

        @media #{$mobile} {
            // Take the full width minus the padding in the chat message and the panel
            width: calc(100vw - 70px);
        }
    }
</style>
