export class Message {
    author: any;
    messageText: any;
    createdAt: any;
    messageFromChannelId: any;

    constructor(obj?: any) { 
        this.author = obj ? obj.author : '';
        this.messageText = obj ? obj.message : '';
        this.createdAt = obj ? obj.createdAt : '';
        this.messageFromChannelId = obj ? obj.messageFromChannelId : '';
    }

    public toJSON() {
        return {
            author: this.author,
            messageText: this.messageText,
            createdAt: this.createdAt,
            messageFromChannelId: this.messageFromChannelId,
        }
    }
}