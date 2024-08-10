import { ConfigInput } from "../Config/ConfigInput";
import { RowStatus } from "../Enum/RowStatus";
import { Form } from "../Form/Form";
import { Functions } from "../Functions/Functions";
import { IInput } from "../Interfaces/IInput";
import { IconCell } from "./IconCell";

export class IconCellRowStatus extends IconCell implements IInput {
    public Render(): void {
        throw new Error("Method not implemented.");
    }
    
    private rowStatus: RowStatus;
    
    constructor(rowStatus: RowStatus){
        super();
        this.SetRowStatus(rowStatus);
    }

    public GetConfig(): ConfigInput {
        throw new Error("Method not implemented.");
    }

    public GetHTMLElement(): HTMLElement {
        return this;
    }

    public SetValue(value: RowStatus): void {
        this.SetRowStatus(value);
    }

    public GetValue() {
        return this.GetRowStatus();
    }

    public Supr(): void {
        throw new Error("Method not implemented.");
    }

    private SetRowStatus(value: RowStatus): void {
        this.rowStatus = value;
    }

    private GetRowStatus(): RowStatus {
        return this.rowStatus;
    }

    public Draw(): void {
       /*  this.className = '';
        var html: HTMLElement = null;
        switch(this.rowStatus){
            case RowStatus.NORMAL:
                break;
            case RowStatus.DELETE:
                this.className = this.iconsClasses.DELETE;
                break;
            case RowStatus.NEW:
                this.className = this.iconsClasses.NEW;
                break;
            case RowStatus.UPDATED:
                this.className = this.iconsClasses.UPDATED;
                break;
            case RowStatus.ERROR:
                this.className = this.iconsClasses.ERROR;
                break;
        } */
    }

    public Focus(): void {
        throw new Error("Method not implemented.");
    }
    public IsFocusable(): boolean {
        return false;
    }
    public Disable(disabled: boolean): void {
        //this.disabled = disabled;
    }
    public Hide(hidden: boolean): void {
       this.hidden = hidden;
    }
    public IsDisabled(): boolean {
        return false;
    }
    public IsHidden(): boolean {
        return this.hidden;
    }
    public Empty(): void {
        throw new Error("Method not implemented.");
    }
    public GetForm(): Form {
        throw new Error("Method not implemented.");
    }
    public GetText(): string {
        throw new Error("Method not implemented.");
    }
    public IsEditable(): boolean {
        return this.GetConfig().GetEditable();
    }
    public SetDefault(): void {
        throw new Error("Method not implemented.");
    }
}

window.customElements.define('icon-cell-row-status', IconCellRowStatus, { extends: 'i' });