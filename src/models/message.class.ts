export class Message {
    author: any;
    messageText: any;
    createdAt: any;
    messageFromChannelId: any;
    // messageId: any;

    constructor(obj?: any) { 
        this.author = obj ? obj.author : '';
        this.messageText = obj ? obj.message : '';
        this.createdAt = obj ? obj.createdAt : '';
        this.messageFromChannelId = obj ? obj.messageFromChannelId : '';
        // this.messageId = obj ? obj.messageId : '';
    }

    public toJSON() {
        return {
            author: this.author,
            messageText: this.messageText,
            createdAt: this.createdAt,
            messageFromChannelId: this.messageFromChannelId,
            // messageId: this.messageId,
        }
    }
}