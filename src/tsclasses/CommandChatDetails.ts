import BaseChatDetails from '@/tsclasses/BaseChatDetails';
import {Command, CommandEventType, LatLang} from '@/tsclasses/SocketChat';

// Data for 'command' events used to show the widgets
export default class CommandChatDetails extends BaseChatDetails {
    public type: CommandEventType | undefined;
    public data: string[] | LatLang | number[] | string | undefined;

    constructor(author: string, sentTime: Date, isLocal: boolean, command: Command | null) {
        super(author, sentTime, isLocal);
        if (command) {
            this.type = command.type;
            this.data = command.data;
        }
    }
}
