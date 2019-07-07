import {shallowMount} from '@vue/test-utils';
import ResponseOptionsList from '@/components/ResponseOptionsList.vue';

const factory = (propsData?) => {
    return shallowMount(ResponseOptionsList, {
        propsData: {
            ...propsData,
        },
    });
};

describe('Response Options List displays buttons based on passed data', () => {
    it('Has no buttons if no properties are passed', async () => {
        const wrapper = factory();

        expect(wrapper.findAll('.optionButton').length).toBe(0);
    });

    it('Has the right number of buttons based on the length of the array', async () => {
        const wrapper = factory({
            options: ['test1', 'test2', 'test3'],
        });

        expect(wrapper.findAll('.optionButton').length).toBe(3);

        wrapper.setProps({
            options: ['test4', 'test5'],
        });

        expect(wrapper.findAll('.optionButton').length).toBe(2);
    });


    it('Has the right content in the buttons', async () => {
        const wrapper = factory({
            options: ['test1', 'test2', 'test3'],
        });

        expect(wrapper.text()).toBe('test1test2test3');

        wrapper.setProps({
            options: ['test3', 'test1', 'test2'],
        });

        expect(wrapper.text()).toBe('test3test1test2');
    });

    it('Emits an event with the correct data when a button is clicked', async () => {
        const wrapper = factory({
            options: ['test1', 'test2', 'test3'],
        });

        wrapper.findAll('.optionButton').at(0).trigger('click');
        expect(wrapper.emitted().clicked[0]).toEqual(['test1']);

        wrapper.findAll('.optionButton').at(1).trigger('click');
        expect(wrapper.emitted().clicked[1]).toEqual(['test2']);
    });
});
