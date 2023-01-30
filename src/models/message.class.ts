export class Message {
    author: any;
    messageText: any;
    createdAt: any;

    constructor(obj?: any) { 
        this.author = obj ? obj.author : '';
        this.messageText = obj ? obj.message : '';
        this.createdAt = obj ? obj.createdAt : '';
    }

    public toJSON() {
        return {
            author: this.author,
            message: this.messageText,
            createdAt: this.createdAt
        }
    }
}