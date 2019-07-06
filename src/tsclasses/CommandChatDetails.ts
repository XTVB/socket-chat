import BaseChatDetails from '@/tsclasses/BaseChatDetails';
import {Command, CommandEventType, LatLang} from '@/tsclasses/SocketChat';

export default class CommandChatDetails extends BaseChatDetails {
    public type: CommandEventType;
    public data: string[] | LatLang | number[] | string;

    constructor(author: string, sentTime: Date, isLocal: boolean, command: Command) {
        super(author, sentTime, isLocal);
        this.type = command.type;
        this.data = command.data;
    }
}
