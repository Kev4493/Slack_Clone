export class User {
    userName: string;
    userEmail: string;
    userId: string;
    userColor: string;
    userActivityStatus: string;
    userStatusInfo: string;

    constructor(obj?: any) { 
        this.userName = obj ? obj.userName : '';
        this.userEmail = obj ? obj.userEmail : '';
        this.userId = obj ? obj.userId : '';
        this.userColor = obj ? obj.userColor : '';
        this.userActivityStatus = obj ? obj.userActivityStatus : '';
        this.userStatusInfo = obj ? obj.userStatusInfo : '';
    }

    public toJSON() {
        return {
            userName: this.userName,
            userEmail: this.userEmail,
            userId: this.userId,
            userColor: this.userColor,
            userActivityStatus: this.userActivityStatus,
            userStatusInfo: this.userStatusInfo
        };
    }

}