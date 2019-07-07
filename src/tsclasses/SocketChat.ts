// Event of type "message" emitted through socket.io
export interface MessageSocketEvent {
    author: string;
    message: string;
}

// Type property of "command" events
export enum CommandEventType {
    DATE = 'date',
    MAP = 'map',
    RATE = 'rate',
    COMPLETE = 'complete',
}

// Data object for commands of MAP CommandEventType
export interface LatLang {
    lat: number;
    lng: number;
}

// Contents of "command" events
export interface Command {
    type: CommandEventType;
    data: string[] | LatLang | number[] | string;
}

// Event of type "command" emitted through socket.io
export interface CommandSocketEvent {
    author: string;
    command: Command;
}

// Payload object for attemptLogin
export interface LoginCredentials {
    username: string;
    password: string;
}
