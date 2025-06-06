export class ChangedValue {

    private name: string;
    private oldValue: any;
    private newValue: any;

    constructor(name: string, oldValue: any, newValue: any) {
        this.SetName(name);
        this.SetOldValue(oldValue);
        this.SetNewValue(newValue);
    }

    private SetName(name: string): void {
        this.name = name;
    }
    private SetOldValue(oldValue: any): void {
        this.oldValue = oldValue;
    }
    public SetNewValue(newValue: any): void {
        this.newValue = newValue;
    }

    public GetName(): string {
        return this.name;
    }
    public GetNewValue(): any {
        return this.newValue;
    }

}