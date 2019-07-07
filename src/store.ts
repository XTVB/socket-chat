import Vue from 'vue';
import * as Vuex from 'vuex';
import {getStoreAccessors} from 'vuex-typescript';
import BaseChatDetails from '@/tsclasses/BaseChatDetails';
import MessageChatDetails from '@/tsclasses/MessageChatDetails';
import CommandChatDetails from '@/tsclasses/CommandChatDetails';
import {
    CommandEventType,
    CommandSocketEvent,
    LatLang,
    LoginCredentials,
    MessageSocketEvent,
} from '@/tsclasses/SocketChat';

export declare interface State {
    loggedIn: boolean;
    username: string;
    messages: BaseChatDetails[];
    dateResponse: string | null;
    mapResponse: LatLang | null;
    rateResponse: number | null;
    completeResponse: string | null;
}

type Context = Vuex.ActionContext<State, State>;

Vue.use(Vuex);

const storeOptions = {
    state: {
        loggedIn: false,
        username: '',
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
        setDateResponse(state: State, value: string) {
            state.dateResponse = value;
        },
        setCompleteResponse(state: State, value: string) {
            state.completeResponse = value;
        },
        setRateResponse(state: State, value: number) {
            state.rateResponse = value;
        },
        setMapResponse(state: State, value: LatLang) {
            state.mapResponse = value;
        },
        resetChat(state: State) {
            // Empty list of messages and reset whether we've received any of the command event types
            state.messages = [];
            state.dateResponse = null;
            state.mapResponse = null;
            state.rateResponse = null;
            state.completeResponse = null;
        },
    },
    actions: {
        socket_connect(context: Context) {
            // TODO future development, keep track of connected state and only attempt to emit events if connected
            // showing message to user if not connected
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
                        // Set response to unset state so we don't show the widget again but know to show the options
                        commitSetDateResponse(context, '');
                        commitNewChat(context, newChat);
                    } else {
                        console.log('Command type already received');
                    }
                    break;
                case CommandEventType.MAP:
                    if (context.state.mapResponse === null) {
                        // Set response so we don't show the widget again. Map command doesn't need responding to from
                        // the user as it doesn't have options
                        commitSetMapResponse(context, (commandSocketEvent.command.data as LatLang));
                        commitNewChat(context, newChat);
                    } else {
                        console.log('Command type already received');
                    }
                    break;
                case CommandEventType.RATE:
                    if (context.state.rateResponse === null) {
                        // Set response to unset state so we don't show the widget again but know to show the options
                        commitSetRateResponse(context, -1);
                        commitNewChat(context, newChat);
                    } else {
                        console.log('Command type already received');
                    }
                    break;
                case CommandEventType.COMPLETE:
                    if (context.state.completeResponse === null) {
                        // Set response to unset state so we don't show the widget again but know to show the options
                        commitSetCompleteResponse(context, '');
                        commitNewChat(context, newChat);
                    } else {
                        console.log('Command type already received');
                    }
                    break;
            }

        },
        send_event(context: Context, event: BaseChatDetails): void {
            // $socket is the socket.io connection which is part of our Vue object, need to use Vue.prototype to access
            // it from the store
            const socket = Vue.prototype.$socket;
            if (event instanceof CommandChatDetails) {
                socket.emit('command');
            } else {
                commitNewChat(context, event);
                const messageEvent: MessageSocketEvent = {
                    author: context.state.username,
                    message: (event as MessageChatDetails).messageContent,
                };
                socket.emit('message', messageEvent);
            }

        },
        async attempt_login(context: Context, login: LoginCredentials): Promise<void> {
            const username = login.username;
            const password = login.password;

            // Dummy server API call to authenticate credentials
            await new Promise((resolve, reject) => {
                if (username === 'TestUser' && password === 'test') {
                    commitResetChat(context);
                    const newChat = new MessageChatDetails('Socket Chat', new Date(),
                        false, 'Welcome to Socket Chat. Type /help for options');
                    commitNewChat(context, newChat);
                    commitSetUsername(context, username);
                    commitSetLogin(context, true);
                    resolve();
                } else {
                    reject('Invalid credentials');
                }
            });


        },
        set_date_response(context: Context, value: string): void {
            commitSetDateResponse(context, value);
            const newChat = new MessageChatDetails(context.state.username, new Date(), true,
                value);
            dispatchSendEvent(context, newChat);
        },
        set_complete_response(context: Context, value: string): void {
            commitSetCompleteResponse(context, value);
            const newChat = new MessageChatDetails(context.state.username, new Date(), true,
                value);
            dispatchSendEvent(context, newChat);
        },
        set_rate_response(context: Context, value: number): void {
            commitSetRateResponse(context, value);
            const newChat = new MessageChatDetails(context.state.username, new Date(), true,
                value.toString());
            dispatchSendEvent(context, newChat);
        },
    },
};

export default new Vuex.Store<State>(storeOptions);


const {commit, read, dispatch} =
    getStoreAccessors<State, State>('');


const actions = storeOptions.actions;

export const dispatchAttemptLogin = dispatch(actions.attempt_login);
export const dispatchSendEvent = dispatch(actions.send_event);
export const dispatchSetDateResponse = dispatch(actions.set_date_response);
export const dispatchSetCompleteResponse = dispatch(actions.set_complete_response);
export const dispatchSetRateResponse = dispatch(actions.set_rate_response);

const mutations = storeOptions.mutations;

export const commitSetLogin = commit(mutations.setLoggedIn);
export const commitNewChat = commit(mutations.newChat);
export const commitSetUsername = commit(mutations.setUsername);
export const commitSetDateResponse = commit(mutations.setDateResponse);
export const commitSetCompleteResponse = commit(mutations.setCompleteResponse);
export const commitSetRateResponse = commit(mutations.setRateResponse);
export const commitSetMapResponse = commit(mutations.setMapResponse);
export const commitResetChat = commit(mutations.resetChat);
