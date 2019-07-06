// Event of type "message" emitted through socket.io
interface MessageSocketEvent {
    author: string;
    message: string;
}

// Event of type "command" emitted through socket.io
interface CommandSocketEvent {
    author: string;
    command: {
        type: string;
        data: any;
    };
}
