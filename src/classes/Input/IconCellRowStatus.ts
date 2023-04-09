import { RowStatus } from "../Enum/RowStatus";
import { IInput } from "../Interfaces/IInput";
import { IconCell } from "./IconCell";

export class IconCellRowStatus extends IconCell implements IInput{
    
    private rowStatus: RowStatus;
    
    private readonly iconsClasses = {
        UPDATED: 'bi bi-pencil-square',
        NEW: 'bi bi-plus-lg',
        DELETE: 'bi bi-trash3',
        ERROR: ''
    }

    constructor(rowStatus: RowStatus){
        super();
        this.SetRowStatus(rowStatus);
        this.Render();
    }
    
    GetHTMLElement(): HTMLElement {
        throw new Error("Method not implemented.");
    }

    SetValue(value: RowStatus): void {
        //throw new Error("Method not implemented.");
        this.SetRowStatus(value);
    }
    GetValue() {
        return this.GetRowStatus();
    }
    Supr(): void {
        throw new Error("Method not implemented.");
    }

    private SetRowStatus(rowStatus: RowStatus):void{
        this.rowStatus = rowStatus;
    }

    private GetRowStatus():RowStatus{
        return this.rowStatus;
    }

    public Render(): void {
        this.className = '';
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
        }
    }

    Focus(): void {
        throw new Error("Method not implemented.");
    }

    IsFocusable(): boolean {
        return false;
    }

}

window.customElements.define('icon-cell-row-status', IconCellRowStatus, { extends: 'i' });