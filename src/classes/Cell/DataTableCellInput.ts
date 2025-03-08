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
    private editable: boolean;
    
    constructor(config: ConfigCell){
        super(config);
        this.Init();
    }

    private Init(): void {
        var config: ConfigCell = this.GetConfig();
        var input: IInput = Factory.GetInput(config.GetConfig(), true);
        this.SetInput(input);
        this.SetEditable(config.GetEditable());
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
    public SetInput(input: IInput): void {
        this.input = input;
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
        var ret: boolean = false;
        if(!Functions.IsNullOrEmpty(this.input)){
            if(this.input.IsFocusable() && !this.input.IsDisabled() && this.IsEditable()){
                ret = true;
            }
        }
        return ret;
    }

    public SetValue(value: any): void { 
        var isEditable: boolean = this.GetConfig().GetEditable();
        if(!Functions.IsNullOrEmpty(this.input)) {
            if(isEditable){
                this.input.SetValue(value);
            } else {
                this.input.SetValue(value);
                this.innerHTML = `<div style="padding-left:6px;">${this.input.GetText()}</div>`;
            }
        }
    }

    public Draw(): void {
        this.innerHTML = '';
        if(this.IsEditable()){
            if(!Functions.IsNullOrEmpty(this.input)){
                this.appendChild(this.input.GetHTMLElement());
            }
        } else {
            this.innerHTML = `<div style="padding-left:6px;">${this.input.GetText()}</div>`;
        }
    }

    public IsEditable(): boolean {
        return this.editable;
    }

    public Disable(disabled: boolean): void {
        var c: ConfigCell = this.GetConfig();
        c.SetDisabled(disabled);
        this.input.Disable(c.GetDisabled());
    }

    public SetEditable(editable: boolean): void {
        this.editable = editable;
    }

    public Editable(editable: boolean): void {
        this.SetEditable(editable);
        this.Draw();
    }

}

window.customElements.define('data-table-cell-input', DataTableCellInput, { extends: 'td' });

