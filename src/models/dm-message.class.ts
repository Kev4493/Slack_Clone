export class DMmessage {
    messageFrom: any;
    messageFromId: any;
    messageTo: any;
    messageToId: any;
    messageText: any;

    constructor(obj?: any) {
        this.messageFrom = obj ? obj.messageFrom : '';
        this.messageFromId = obj ? obj.messageFromId : '';
        this.messageTo = obj ? obj.messageTo : '';
        this.messageToId = obj ? obj.messageToId : '';
        this.messageText = obj ? obj.messageText : '';
    }

    public toJSON() {
        return {
            messageFrom: this.messageFrom,
            messageFromId: this.messageFromId,
            messageTo: this.messageTo,
            messageToId: this.messageToId,
            messageText: this.messageText
        }
    }
}