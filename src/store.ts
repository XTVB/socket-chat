import Vue from 'vue';
import * as Vuex from 'vuex';
import ChatMessageData from '@/tsclasses/ChatMessageData';
import {getStoreAccessors} from 'vuex-typescript';

interface State {
    loggedIn: boolean;
    messages: ChatMessageData[];
}

type Context = Vuex.ActionContext<State, State>;

Vue.use(Vuex);

const storeOptions = {
    state: {
        // TODO init as false
        loggedIn: true,
        messages: Array<ChatMessageData>(),
    },
    mutations: {
        setLoggedIn(state: State, value: boolean) {
            state.loggedIn = value;
        },
        newMessage(state: State, message: ChatMessageData) {
            state.messages.push(message);
        },
    },
    actions: {
        socket_connect(context: Context) {
            console.log('socket connected');
        },
        socket_message(context: Context, message: MessageSocketEvent) {
            console.log(message);
            const newMessage = new ChatMessageData(message.author, new Date(), message.message, false);
            commitNewMessage(context, newMessage);
        },
        socket_command(context: Context, message: CommandSocketEvent) {
            console.log(message);
        },
        do_login(context: Context): void {
            context.state.messages = [];
            commitSetLogin(context, true);
            const newMessage = new ChatMessageData('Socket Chat', new Date(),
                'Welcome to Socket Chat. Type /help for options', false);
            commitNewMessage(context, newMessage);
        },
    },
};

export default new Vuex.Store<State>(storeOptions);


const { commit, read, dispatch } =
    getStoreAccessors<State, State>('');


const actions = storeOptions.actions;

export const dispatchDoLogin = dispatch(actions.do_login);

const mutations = storeOptions.mutations;

export const commitSetLogin = commit(mutations.setLoggedIn);
export const commitNewMessage = commit(mutations.newMessage);
