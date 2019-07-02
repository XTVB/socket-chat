// Definitions for custom objects

//Event of type "message" emitted through socket.io
interface SocketMessage {
    author: string;
    message: string;
}

//Event of type "command" emitted through socket.io
interface SocketCommand {
    author: string;
    command: {
        type: string;
        data: any;
    };
}

//Message displayed to the user in the ChatPanel
interface ChatMessage {
    author: string;
    sentTime: string;
    messageContent: string;
    isLocal: boolean;
}