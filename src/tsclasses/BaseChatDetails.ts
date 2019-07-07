import uuidv4 from 'uuid/v4';

// Structure of message objects given to the ChatPanel to render
export default class BaseChatDetails {
    public uuid: string;
    public author: string;
    public sentTime: string;
    public isLocal: boolean;

    constructor(author: string, sentTime: Date, isLocal: boolean) {
        this.uuid = uuidv4();
        this.author = author;
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
