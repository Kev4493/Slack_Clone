export class DmChannel {
    memberNames: any[];
    memberIds: any[];

    constructor(obj?: any) {
        this.memberNames = obj ? obj.memberNames : [];
        this.memberIds = obj ? obj.memberIds : [];
    }

    public toJSON() {
        return {
            memberNames: this.memberNames,
            memberIds: this.memberIds
        }
    }
}