export class Channel {
    channelName: string;
    // channelId: any;

    constructor(obj?: any) { 
        this.channelName = obj ? obj.channelName : '';
        // this.channelId = obj ? obj.channelId : '';
    }

    public toJSON() {
        return {
            channelName: this.channelName,
            // channelId: this.channelId
        };
    }

}