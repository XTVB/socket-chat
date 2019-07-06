import BaseChatDetails from '@/tsclasses/BaseChatDetails';

export default class MessageChatDetails extends BaseChatDetails {
    public messageContent: string;

    constructor(author: string, sentTime: Date, isLocal: boolean, messageContent: string) {
        super(author, sentTime, isLocal);
        this.messageContent = messageContent;
    }
}
