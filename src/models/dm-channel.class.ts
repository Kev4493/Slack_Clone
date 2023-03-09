export class DmChannel {
    memberIds: any[];

    constructor(obj?: any) {
        this.memberIds = obj ? obj.memberIds : [];
    }

    public toJSON() {
        return {
            memberIds: this.memberIds
        }
    }
}