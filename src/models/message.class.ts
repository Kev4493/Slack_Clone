export class Message {
    author: any;
    message: any;
    createdAt: any;

    constructor(obj?: any) { 
        this.author = obj ? obj.author : '';
        this.message = obj ? obj.message : '';
        this.createdAt = obj ? obj.createdAt : '';
    }

    public toJSON() {
        return {
            author: this.author,
            message: this.message,
            createdAt: this.createdAt
        }
    }
}