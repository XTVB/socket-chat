import {createLocalVue, mount} from '@vue/test-utils';
import Vuex from 'vuex';
import RateWidget from '@/components/widgets/RateWidget.vue';
import ResponseOptionsList from '@/components/ResponseOptionsList.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const factory = (store, propsData? ) => {
    return mount(RateWidget, {
        propsData: {
            ...propsData,
        },
        store,
        localVue,
    });
};

describe('Rate Widget allows the user to provide a rating through buttons', () => {
    let actions;
    let store;

    beforeEach(() => {
        const state = { rateResponse: -1};
        actions = {
            set_rate_response: jest.fn((context, value) => {
                context.state.rateResponse = value;
            }),
        };
        store = new Vuex.Store({
            state,
            actions,
        });
    });

    it('Only displays the options if a rate response hasn\'t been set', () => {
        const wrapper = factory(store, {
            data: [1, 5],
        });

        expect(wrapper.find(ResponseOptionsList).exists()).toBeTruthy();

        store.state.rateResponse = 1;

        expect(wrapper.find(ResponseOptionsList).exists()).toBeFalsy();
    });

    it('Displays the correct number of buttons based on the provided data', () => {
        const wrapper = factory(store, {
            data: [1, 5],
        });

        expect(wrapper.findAll('.optionButton').length).toBe(5);

        wrapper.setProps({
            data: [2, 3],
        });

        expect(wrapper.findAll('.optionButton').length).toBe(2);
    });

    it('Rating response set correctly when a button is pressed and options hidden', () => {
        const wrapper = factory(store, {
            data: [1, 5],
        });

        wrapper.findAll('.optionButton').at(0).trigger('click');

        expect(store.state.rateResponse).toEqual(1);
        expect(wrapper.find(ResponseOptionsList).exists()).toBeFalsy();

        store.state.rateResponse = -1;
        wrapper.findAll('.optionButton').at(2).trigger('click');

        expect(store.state.rateResponse).toEqual(3);
        expect(wrapper.find(ResponseOptionsList).exists()).toBeFalsy();
    });

    it('Shows the right text on the buttons', () => {
        const wrapper = factory(store, {
            data: [1, 5],
        });

        expect(wrapper.find(ResponseOptionsList).text()).toEqual('12345');

        wrapper.setProps({
            data: [2, 3],
        });

        expect(wrapper.find(ResponseOptionsList).text()).toEqual('23');

    });
});
