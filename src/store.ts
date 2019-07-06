import Vue from 'vue';
import * as Vuex from 'vuex';
import {getStoreAccessors} from 'vuex-typescript';
import BaseChatDetails from '@/tsclasses/BaseChatDetails';
import MessageChatDetails from '@/tsclasses/MessageChatDetails';
import CommandChatDetails from '@/tsclasses/CommandChatDetails';
import {
    CommandEventType,
    CommandSocketEvent,
    DateResponse,
    LatLang,
    LoginCredentials,
    MessageSocketEvent,
} from '@/tsclasses/SocketChat';

export declare interface State {
    loggedIn: boolean;
    username: string;
    messages: BaseChatDetails[];
    dateResponse: DateResponse | null;
    mapResponse: LatLang | null;
    rateResponse: number | null;
    completeResponse: string | null;
}

type Context = Vuex.ActionContext<State, State>;

Vue.use(Vuex);

const storeOptions = {
    state: {
        // TODO init as false
        loggedIn: true,
        // TODO init as ''
        username: 'test',
        messages: Array<BaseChatDetails>(),
        dateResponse: null,
        mapResponse: null,
        rateResponse: null,
        completeResponse: null,
    },
    mutations: {
        setLoggedIn(state: State, value: boolean) {
            state.loggedIn = value;
        },
        newChat(state: State, chatDetails: BaseChatDetails) {
            state.messages.push(chatDetails);
        },
        setUsername(state: State, value: string) {
            state.username = value;
        },
        resetChat(state: State) {
            state.messages = [];
            state.dateResponse = null;
            state.mapResponse = null;
            state.rateResponse = null;
            state.completeResponse = null;

        },
    },
    actions: {
        socket_connect(context: Context) {
            console.log('socket connected');
        },
        socket_message(context: Context, messageSocketEvent: MessageSocketEvent) {
            const newChat = new MessageChatDetails(messageSocketEvent.author, new Date(), false,
                messageSocketEvent.message);
            commitNewChat(context, newChat);
        },
        socket_command(context: Context, commandSocketEvent: CommandSocketEvent) {
            const newChat = new CommandChatDetails(commandSocketEvent.author, new Date(), false,
                commandSocketEvent.command);
            switch (commandSocketEvent.command.type) {
                case CommandEventType.DATE:
                    if (context.state.dateResponse === null) {
                        context.state.dateResponse = DateResponse.UNSET;
                        commitNewChat(context, newChat);
                    } else {
                        console.log('Command type already received');
                    }
                    break;
                case CommandEventType.MAP:
                    if (context.state.mapResponse === null) {
                        context.state.mapResponse = (commandSocketEvent.command.data as LatLang);
                        commitNewChat(context, newChat);
                    } else {
                        console.log('Command type already received');
                    }
                    break;
                case CommandEventType.RATE:
                    if (context.state.rateResponse === null) {
                        context.state.rateResponse = -1;
                        commitNewChat(context, newChat);
                    } else {
                        console.log('Command type already received');
                    }
                    break;
                case CommandEventType.COMPLETE:
                    if (context.state.completeResponse === null) {
                        context.state.completeResponse = '';
                        commitNewChat(context, newChat);
                    } else {
                        console.log('Command type already received');
                    }
                    break;
            }

        },
        async attempt_login(context: Context, login: LoginCredentials): Promise<void> {
            commitResetChat(context);
            const username = login.username;
            const password = login.password;

            // Dummy server API call to authenticate credentials
            await new Promise((resolve, reject) => {
                if (username === 'TestUser' && password === 'test') {
                    commitSetLogin(context, true);
                    commitSetUsername(context, username);
                    const newChat = new MessageChatDetails('Socket Chat', new Date(),
                        false, 'Welcome to Socket Chat. Type /help for options');
                    commitNewChat(context, newChat);
                    resolve();
                } else {
                    reject('Invalid credentials');
                }
            });


        },
    },
};

export default new Vuex.Store<State>(storeOptions);


const { commit, read, dispatch } =
    getStoreAccessors<State, State>('');


export const defaultState = storeOptions.state;

export const actions = storeOptions.actions;

export const dispatchAttemptLogin = dispatch(actions.attempt_login);

export const mutations = storeOptions.mutations;

export const commitSetLogin = commit(mutations.setLoggedIn);
export const commitNewChat = commit(mutations.newChat);
export const commitSetUsername = commit(mutations.setUsername);
export const commitResetChat = commit(mutations.resetChat);
