export class Channel {
    channelName: string;
    // channelId: any;
    createdFromUserId: any;

    constructor(obj?: any) { 
        this.channelName = obj ? obj.channelName : '';
        // this.channelId = obj ? obj.channelId : '';
        this.createdFromUserId = obj ? obj.createdFromUserId : '';
    }

    public toJSON() {
        return {
            channelName: this.channelName,
            // channelId: this.channelId,
            createdFromUserId: this.createdFromUserId
        };
    }

}