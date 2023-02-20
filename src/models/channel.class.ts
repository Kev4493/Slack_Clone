export class Channel {
    channelName: string;
    createdFromUserId: any;

    constructor(obj?: any) { 
        this.channelName = obj ? obj.channelName : '';
        this.createdFromUserId = obj ? obj.createdFromUserId : '';
    }

    public toJSON() {
        return {
            channelName: this.channelName,
            createdFromUserId: this.createdFromUserId
        };
    }
}