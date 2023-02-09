export class Message {
    author: any;
    messageText: any;
    createdAt: any;
    messageFromChannelId: any;
    messageFromUserId: any;

    constructor(obj?: any) { 
        this.author = obj ? obj.author : '';
        this.messageText = obj ? obj.message : '';
        this.createdAt = obj ? obj.createdAt : '';
        this.messageFromChannelId = obj ? obj.messageFromChannelId : '';
        this.messageFromUserId = obj ? obj.messageFromUserId : '';
    }

    public toJSON() {
        return {
            author: this.author,
            messageText: this.messageText,
            createdAt: this.createdAt,
            messageFromChannelId: this.messageFromChannelId,
            messageFromUserId: this.messageFromUserId,
        }
    }
}