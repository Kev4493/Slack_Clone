export class DMmessage {
    author: any;
    authorColor: any;
    messageText: any;
    createdAt: any;
    // messageFromChannelId: any;
    messageFromUserId: any;
    members: any[];

    constructor(obj?: any) { 
        this.author = obj ? obj.author : '';
        this.authorColor = obj ? obj.authorColor : '';
        this.messageText = obj ? obj.message : '';
        this.createdAt = obj ? obj.createdAt : '';
        // this.messageFromChannelId = obj ? obj.messageFromChannelId : '';
        this.messageFromUserId = obj ? obj.messageFromUserId : '';
        this.members = obj ? obj.members : [];
    }

    public toJSON() {
        return {
            author: this.author,
            authorColor: this.authorColor,
            messageText: this.messageText,
            createdAt: this.createdAt,
            // messageFromChannelId: this.messageFromChannelId,
            messageFromUserId: this.messageFromUserId,
            members: this.members
        }
    }
}