import {createLocalVue, shallowMount} from '@vue/test-utils';
import Vuex, {Store} from 'vuex';
import {actions, defaultState, mutations, State} from '@/store';
import App from '@/App.vue';
import LoginDialog from '@/components/LoginDialog.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

let store: Store<State>;

beforeEach(async () => {
    store = new Vuex.Store<State>({
        state: defaultState,
        mutations,
        actions,
    });
});

describe('Login Dialog is visible if not logged in', () => {
    it('', async () => {
        const wrapper = shallowMount(App, {store, localVue});
        store.state.loggedIn = true;

        expect(wrapper.find(LoginDialog).exists()).toBe(true);

        // console.log(wrapper.html());
        // console.log(wrapper.text());
        // expect(wrapper.contains('div.loginContainer')).toBe(true);
        // expect(wrapper.contains('div.loginasda')).toBe(true);
        // expect(wrapper).toBe(true);
    });
});

// describe('Active speaker stream can display a muted defaultState', () => {
//
//     beforeEach(() => {
//         MockMeetingsApi.attachActiveSpeakerVideo = jest.fn();
//     });
//
//     it('should have a video mute container if the active speaker video is muted', () => {
//         const wrapper = shallowMount(ActiveSpeakerStream, {store, localVue, computed: {mediaReceived: () => true }});
//
//         expect(wrapper.find('.video-mute-container').isVisible()).toBe(true);
//     });
//
//     it('should not have a video mute container if the active speaker screen sharing, even if their video is ' +
//         'muted', () => {
//         const getters = {
//             activeParticipant: () => {
//                 return {
//                     videoMuted: true,
//                 };
//             },
//             participantIsScreenSharing: () => true,
//             selfSharing: () => false,
//         };
//
//         const meeting = {
//             namespaced: meetingModule.namespaced,
//             getters,
//         };
//
//         const store2 = new Vuex.Store({
//             modules: {
//                 meeting,
//             },
//         });
//
//         const wrapper = shallowMount(ActiveSpeakerStream, {
//             store: store2,
//             localVue,
//             computed: {mediaReceived: () => true },
//         });
//
//         expect(wrapper.find('.video-mute-container').isVisible()).toBe(false);
//     });
//
//     it('should not have a video mute container if the participant is sharing', () => {
//         const getters = {
//             activeParticipant: () => {
//                 return {
//                     videoMuted: true,
//                 };
//             },
//             participantIsScreenSharing: () => false,
//             selfSharing: () => true,
//         };
//
//         const meeting = {
//             namespaced: meetingModule.namespaced,
//             getters,
//         };
//
//         const store2 = new Vuex.Store({
//             modules: {
//                 meeting,
//             },
//         });
//
//         const wrapper = shallowMount(ActiveSpeakerStream, {
//             store: store2,
//             localVue,
//             computed: {mediaReceived: () => true },
//         });
//
//         expect(wrapper.find('.video-mute-container').isVisible()).toBe(false);
//     });
// });
