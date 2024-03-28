import * as $ from "jquery";
import "jquery-ui/dist/jquery-ui";
import { ConfigCell } from "../Config/ConfigCell";
import { Cell } from "./Cell";
import { IInput } from "../Interfaces/IInput";
import { Functions } from "../Functions/Functions";
import { DataTableRow } from "../Row/DataTableRow";
import { DataTable } from "../DataTable/DataTable";

export class DataTableCell extends Cell {
    
    private datatable: DataTable;
    private value: any;
    private input: IInput;
    private rowIdx: number;
    private col: number;
    private row: DataTableRow;

    constructor(config: ConfigCell){
        super(config);

        var input: IInput = this.GetConfig().GetInput();
        var value: any = this.GetConfig().GetValue();
        var col: number = this.GetConfig().GetCol();
        var isEditable: boolean = this.GetConfig().GetEditable();
        var datatable: DataTable = this.GetConfig().GetDataTable();

        if(!Functions.IsNullOrEmpty(input) && isEditable){
            this.SetInput(input);
        } else {
            this.SetInput(null);
        }

        
        this.SetCol(col);
        this.SetValue(value);
        this.SetDataTable(datatable);
        this.Draw();
    }

    //Getters
    public GetCol(): number {
        return this.col;
    }
    public GetRow(): DataTableRow {
        return this.row;
    }
    public GetInput(): IInput {
        return this.input;
    }
    public GetDataTable(): DataTable {
        return this.datatable;
    }

    //Setters
    public SetRow(row: DataTableRow): void {
        this.row = row;
    }
    private SetCol(col: number): void {
        this.col = col;
    }
    private SetInput(input: IInput): void {
        this.input = input;
    }

    private SetDataTable(datatable: DataTable): void {
        this.datatable = datatable;
    }
    

    public SetValue(value: any): void { 
        var isEditable: boolean = this.GetConfig().GetIsResizable();
        if(isEditable){
            this.input.SetValue(value);
        } else {
            this.value = value;
        }
    }

    public GetValue() {
        var ret: any = null;
        var isEditable: boolean = this.GetConfig().GetIsResizable();
        if(isEditable){
            ret = this.input.GetValue();
        } else {
            ret = this.value;
        }
        return ret;
    }

    public Draw(): void {
        var isEditable: boolean = this.GetConfig().GetEditable();
        if(isEditable){
            var input: HTMLElement = this.GetInput().GetHTMLElement();
            this.appendChild(input);
        } else {
            this.innerHTML = this.GetValue();
        }
    }

    public Focus():void{
        var isEditable: boolean = this.GetConfig().GetIsResizable();
        if(isEditable){
            var input: HTMLElement = this.GetInput().GetHTMLElement();
            input.focus();
        }
    }

}

window.customElements.define('data-table-cell', DataTableCell, { extends: 'td' });


/* private cellName: string
    private config: ConfigCell;

    constructor(config:ConfigCell){
        super();
        this.SetConfig(config);
        this.SetCellName(config.GetData());
    }

    private SetConfig(config:ConfigCell): void {
        this.config = config;
    }

    private SetCellName(cellName:string):void{
        this.cellName = cellName;
    }

    public SetHidden(hidden: boolean): void {
        this.hidden = hidden;
    }

    

    public GetCellName():string{
        return this.cellName;
    }

    public GetConfig(): ConfigCell {
        return this.config;
    }

    public abstract Draw(): void

    public abstract GetValue(): any; */