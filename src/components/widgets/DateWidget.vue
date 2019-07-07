<template>
    <div class="dateWidget">
        <span>Which day would you like to book your appointment?</span>
        <ResponseOptionsList v-if="show" @clicked="selectDate($event)" v-bind:options="dateOptions"
        ></ResponseOptionsList>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import {dispatchSetDateResponse} from '@/store';
import ResponseOptionsList from '@/components/ResponseOptionsList.vue';

export default Vue.extend({
    name: 'DateWidget',
    components: {
        ResponseOptionsList,
    },
    props: {
        data: String,
    },
    data() {
        return {
            daysOfTheWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        };
    },
    computed: {
        startDate(): Date {
            // If supplied date is a weekend set the start date to the next weekday
            let startDate = new Date(this.data);
            if (!this.isWeekday(startDate)) {
                startDate = this.getNextWeekday(startDate);
            }
            return startDate;
        },
        dateOptions() {
            const startDate = this.startDate;
            const dateOptionsArray = [];
            dateOptionsArray.push(this.getFormattedDateString(startDate));
            let nextDate =  new Date(startDate.toISOString());
            while (dateOptionsArray.length < 5) {
                nextDate = this.getNextWeekday(nextDate) as Date;
                dateOptionsArray.push(this.getFormattedDateString(nextDate));
            }
            return dateOptionsArray;
        },
        show() {
            return this.$store.state.dateResponse === '';
        },
    },
    methods: {
        isWeekday(date: Date): boolean {
            return (date.getDay() !== 0 && date.getDay() !== 6);
        },
        getNextDay(date: Date): Date {
            const newDate = new Date(date.toISOString());
            newDate.setDate(date.getDate() + 1);
            return newDate;
        },
        getNextWeekday(date: Date): Date {
            let newDate = this.getNextDay(date);
            // Have to get nextDay once before the loop otherwise if the original date
            // is a weekday that will be returned
            while (!this.isWeekday(newDate)) {
                newDate = this.getNextDay(newDate);
            }
            return newDate;
        },
        getFormattedDateString(date: Date): string {
            // '2019-07-07T15:53:28.328Z' becomes Sunday Jul 07 2019
            return this.daysOfTheWeek[date.getDay()] + date.toDateString().substr(3);
        },
        selectDate(value: string) {
            dispatchSetDateResponse(this.$store, value);
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../../assets/scss/vars";
    .dateWidget {
        span {
        }
    }
</style>
