export class User {
    userName: string;
    userInitials: string;
    userEmail: string;
    userId: string;
    userColor: string;

    constructor(obj?: any) { 
        this.userName = obj ? obj.userName : '';
        this.userInitials = obj ? obj.userInitials : '';
        this.userEmail = obj ? obj.userEmail : '';
        this.userId = obj ? obj.userId : '';
        this.userColor = obj ? obj.userColor : '';
    }

    public toJSON() {
        return {
            userName: this.userName,
            userInitials: this.userInitials,
            userEmail: this.userEmail,
            userId: this.userId,
            userColor: this.userColor,
        };
    }

}