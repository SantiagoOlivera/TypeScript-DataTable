import { ConfigCell } from "../Config/ConfigCell";
import { DataTable } from "../DataTable/DataTable";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { Program } from "../Program/Program";
import { DataTableRow } from "../Row/DataTableRow";
import { Row } from "../Row/Row";

export abstract class Cell extends HTMLTableCellElement implements IDraw {

    private static DEFAULT_WIDTH: number = 100;

    private config: ConfigCell;
    private cellName: string;
    private columnName: string;
    private index: number;
    private row: Row;
    
    constructor(config: ConfigCell) {
        super();
        this.SetConfig(config);
        this.SetCellName();
        this.SetColumnName();
        //this.SetClassName();
        this.SetCellWidth();
        this.SetIndex();
        this.SetFixedColumn();
    }
    
    public isResizable(): boolean{
        var ret: boolean = false;
        return ret;
    }
    //Getters
    public GetConfig(): ConfigCell {
        return this.config;
    }
    public GetIndex(): number {
        return this.index;
    }
    public GetCellName(): string {
        return this.cellName;
    }
    public GetColumnName(): string {
        return this.columnName;
    }
    public GetRow(): Row {
        return this.row;
    }
    //Setters
    private SetConfig(config: ConfigCell): void {
        this.config = config;
    }
    private SetIndex(): void {
        this.index = this.GetConfig().GetIndex();
    }
    private SetCellName(): void {
        this.cellName = this.GetConfig().GetClassName();
    }
    private SetColumnName(): void {
        this.columnName = this.GetConfig().GetData();
    }
    private SetClassName(){
        this.className = this.GetConfig().GetClassName();
    }
    public SetRow(row: Row): void {
        this.row = row;
    }
    private SetCellWidth(): void {
        var width: number = this.GetConfig().GetWidth();
        if(!Functions.IsNullOrEmpty(width)) {
            this.SetWidth(width);
        } else {
            this.SetDefaultWidthCell();
        }
    }
    public Hide(hidden: boolean): void {
        this.hidden = hidden;
    }
    private SetWidth(width: number){
        this.style.width = width + 'px';
        this.style.maxWidth = width + 'px';
        this.style.minWidth = width + 'px';
    }
    private SetDefaultWidthCell(): void  {
        this.SetWidth(Cell.DEFAULT_WIDTH);
    }
    private SetFixedColumn(): void {
        if(this.GetConfig().GetFixedColumn()){
            this.classList.add(Program.classes.STICKY_COLUMN);
        }
    }
    public SetResizable(): void {
        var minWidth: number = this.config.GetMinWidth();
        var maxHeight: number = this.config.GetMaxHeight();
        $(this).resizable({
            //minWidth: 50,
            minWidth: minWidth,
            //maxHeight: 45,
            maxHeight: maxHeight,
        });
    }

    
    public abstract GetValue(): any;
    public abstract SetValue(value: any): void;
    public abstract Draw(): void;
    public abstract Disable(disabled: boolean):void;
    public abstract Editable(editable: boolean): void;

}