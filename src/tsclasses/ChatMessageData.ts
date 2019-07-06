import uuidv4 from 'uuid/v4';

export default class ChatMessageData {
    public uuid: string;
    public author: string;
    public sentTime: string;
    public messageContent: string;
    public isLocal: boolean;

    constructor(author: string, sentTime: Date, messageContent: string, isLocal: boolean) {
        this.uuid = uuidv4();
        this.author = author;
        this.messageContent = messageContent;
        this.isLocal = isLocal;

        let hours: string = sentTime.getHours().toString();
        hours = hours.length < 2 ? '0' + hours : hours;
        let minutes: string = sentTime.getMinutes().toString();
        minutes = minutes.length < 2 ? '0' + minutes : minutes;
        let seconds: string = sentTime.getSeconds().toString();
        seconds = seconds.length < 2 ? '0' + seconds : seconds;
        this.sentTime = hours + ':' + minutes + ':' + seconds;
    }
}
