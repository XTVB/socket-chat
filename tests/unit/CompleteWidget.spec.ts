import {createLocalVue, mount} from '@vue/test-utils';
import Vuex from 'vuex';
import ResponseOptionsList from '@/components/ResponseOptionsList.vue';
import CompleteWidget from '@/components/widgets/CompleteWidget.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const factory = (store, propsData? ) => {
    return mount(CompleteWidget, {
        propsData: {
            ...propsData,
        },
        store,
        localVue,
    });
};

describe('Complete Widget allows the user to choose whether to end the conversation', () => {
    let actions;
    let store;

    beforeEach(() => {
        const state = { completeResponse: ''};
        actions = {
            set_complete_response: jest.fn((context, value) => {
                context.state.completeResponse = value;
            }),
        };
        store = new Vuex.Store({
            state,
            actions,
        });
    });

    it('Only displays the options if a date response hasn\'t been set', () => {
        const wrapper = factory(store, {
            data: ['Yes', 'No'],
        });

        expect(wrapper.find(ResponseOptionsList).exists()).toBeTruthy();

        store.state.completeResponse = 'Yes';

        expect(wrapper.find(ResponseOptionsList).exists()).toBeFalsy();
    });

    it('Displays the correct number of buttons based on the provided data', () => {
        const wrapper = factory(store, {
            data: ['Yes', 'No'],
        });

        expect(wrapper.findAll('.optionButton').length).toBe(2);

        wrapper.setProps({
            data: ['Yes'],
        });

        expect(wrapper.findAll('.optionButton').length).toBe(1);
    });

    it('Complete response set correctly when a button is pressed and options hidden', () => {
        const wrapper = factory(store, {
            data: ['Yes', 'No'],
        });

        wrapper.findAll('.optionButton').at(0).trigger('click');

        expect(store.state.completeResponse).toEqual('Yes');
        expect(wrapper.find(ResponseOptionsList).exists()).toBeFalsy();

        store.state.completeResponse = '';
        wrapper.findAll('.optionButton').at(1).trigger('click');

        expect(store.state.completeResponse).toEqual('No');
        expect(wrapper.find(ResponseOptionsList).exists()).toBeFalsy();
    });

    it('Shows the right text on the buttons', () => {
        const wrapper = factory(store, {
            data: ['Yes', 'No'],
        });

        expect(wrapper.find(ResponseOptionsList).text()).toEqual('YesNo');

        wrapper.setProps({
            data: ['Not finished', 'Completed'],
        });

        expect(wrapper.find(ResponseOptionsList).text()).toEqual('Not finishedCompleted');

    });
});
