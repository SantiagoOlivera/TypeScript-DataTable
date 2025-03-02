import { ConfigCell } from "../Config/ConfigCell";
import { Functions } from "../Functions/Functions";
import { DataTableCell } from "./DataTableCell";

export class DataTableCellCustom extends DataTableCell {
    
    private value: string;  
    constructor(config: ConfigCell){
        super(config);
    }
    public GetValue() {
        return this.value;
    }
    public SetValue(value: any): void {
        this.value = value;
    }
    public Draw(): void {
        this.innerHTML = this.value;
    }
    public IsFocusable(): boolean {
        throw new Error("Method not implemented.");
    }
    public Focus(): void {
        throw new Error("Method not implemented.");
    } 
    public Disable(disabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    public Editable(editable: boolean): void {
        throw new Error("Method not implemented.");
    }
}

window.customElements.define('data-table-cell-custom', DataTableCellCustom, { extends: 'td' });