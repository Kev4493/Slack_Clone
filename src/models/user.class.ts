export class User {
    userName: string;
    userEmail: string;
    userId: string;

    constructor(obj?: any) { 
        this.userName = obj ? obj.channelName : '';
        this.userEmail = obj ? obj.userEmail : '';
        this.userId = obj ? obj.userId : '';
    }

    public toJSON() {
        return {
            userName: this.userName,
            userEmail: this.userEmail,
            userId: this.userId,
        };
    }

}