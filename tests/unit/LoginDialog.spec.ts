import {createLocalVue, shallowMount} from '@vue/test-utils';
import Vuex, {Store} from 'vuex';
import {actions, defaultState, mutations, State} from "@/store";
import LoginDialog from "../../src/components/LoginDialog.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

let store:Store<State>;

beforeEach(async () => {
    store = new Vuex.Store<State>({
        state: defaultState,
        mutations: mutations,
        actions: actions
    });
});

describe('Login Dialog is visible if not logged in', () => {
    it('', async () => {
    });
});
