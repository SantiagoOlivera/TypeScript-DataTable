import * as $ from "jquery";
import "jquery-ui/dist/jquery-ui";
import { ConfigCell } from "../Config/ConfigCell";
import { IInput } from "../Interfaces/IInput";
import { Functions } from "../Functions/Functions";
import { Table } from "../DataTable/Table";
import { Factory } from "../Factory/Factory";
import { DataTableCell } from "./DataTableCell";
import { IFocusable } from "../Interfaces/IFocusable";

export class DataTableCellInput extends DataTableCell {

    private input: IInput;
    
    constructor(config: ConfigCell){
        super(config);
        this.SetInput();
    }

    
    
    //Getters
    public GetTable(): Table {
        return this.GetRow().GetTable();
    }
    public GetRowIndex(): number {
        return this.GetRow().GetIndex();
    }
    public GetCellIdx(): number {
        return this.GetIndex();
    }
    public GetInput(): IInput {
        return this.input;
    }

    //Setters
    public SetInput(): void {
        this.input = Factory.GetInput(this.GetConfig().GetConfig(), true);
    }

    public GetValue() {
        var ret: any = null;
        var isEditable: boolean = this.GetConfig().GetEditable();
        var col =  this.GetConfig().GetColumnName();
        if(isEditable){
            ret = this.input.GetValue();
        } else {
            try {
                ret = this.input.GetText();
            } catch {
                ret = this.innerHTML;
            }
        }
        return ret;
    }

    public Focus(): void {
        this.input.Focus();
    }

    public IsFocusable(): boolean {
        return (this.input.IsFocusable() && !this.input.IsDisabled() && this.input.IsEditable())
    }

    public SetValue(value: any): void { 
        var isEditable: boolean = this.GetConfig().GetEditable();
        if(!Functions.IsNullOrEmpty(this.input)){
            if(isEditable){
                this.input.SetValue(value);
            } else {
                this.innerHTML = value;
            }
        }
    }

    public Draw(): void {
        if(!Functions.IsNullOrEmpty(this.input)){
            this.appendChild(this.input.GetHTMLElement());
        } else {
            this.appendChild(null);
        }
    }
}

window.customElements.define('data-table-cell-input', DataTableCellInput, { extends: 'td' });

