import {createLocalVue, mount} from '@vue/test-utils';
import Vuex from 'vuex';
import ResponseOptionsList from '@/components/ResponseOptionsList.vue';
import DateWidget from '@/components/widgets/DateWidget.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const factory = (store, propsData? ) => {
    return mount(DateWidget, {
        propsData: {
            ...propsData,
        },
        store,
        localVue,
    });
};

describe('Rate Widget allows the user to pick a day out of a list of options', () => {
    let actions;
    let store;

    beforeEach(() => {
        const state = { dateResponse: ''};
        actions = {
            set_date_response: jest.fn((context, value) => {
                context.state.dateResponse = value;
            }),
        };
        store = new Vuex.Store({
            state,
            actions,
        });
    });

    it('Only displays the options if a date response hasn\'t been set', () => {
        const wrapper = factory(store, {
            data: '2019-07-07T21:25:16.364Z',
        });

        expect(wrapper.find(ResponseOptionsList).exists()).toBeTruthy();

        store.state.dateResponse = 'Monday Jul 08 2019';

        expect(wrapper.find(ResponseOptionsList).exists()).toBeFalsy();
    });

    it('Displays the correct number of buttons based on the provided data', () => {
        const wrapper = factory(store, {
            data: '2019-07-07T21:25:16.364Z',
        });

        expect(wrapper.findAll('.optionButton').length).toBe(5);

        wrapper.setProps({
            data: '2019-07-01T21:25:16.364Z',
        });

        expect(wrapper.findAll('.optionButton').length).toBe(5);
    });

    it('Date response set correctly when a button is pressed and options hidden', () => {
        const wrapper = factory(store, {
            data: '2019-07-07T21:25:16.364Z',
        });

        wrapper.findAll('.optionButton').at(0).trigger('click');

        expect(store.state.dateResponse).toEqual('Monday Jul 08 2019');
        expect(wrapper.find(ResponseOptionsList).exists()).toBeFalsy();

        store.state.dateResponse = '';
        wrapper.findAll('.optionButton').at(2).trigger('click');

        expect(store.state.dateResponse).toEqual('Wednesday Jul 10 2019');
        expect(wrapper.find(ResponseOptionsList).exists()).toBeFalsy();
    });

    it('Shows the right text on the buttons', () => {
        const wrapper = factory(store, {
            data: '2019-07-07T21:25:16.364Z',
        });

        expect(wrapper.find(ResponseOptionsList).text()).toEqual('Monday Jul 08 2019Tuesday Jul 09 2019' +
            'Wednesday Jul 10 2019Thursday Jul 11 2019Friday Jul 12 2019');

        wrapper.setProps({
            data: '2019-07-04T21:25:16.364Z',
        });

        expect(wrapper.find(ResponseOptionsList).text()).toEqual('Thursday Jul 04 2019Friday Jul 05 2019' +
            'Monday Jul 08 2019Tuesday Jul 09 2019Wednesday Jul 10 2019');

    });
});
