import { DataTable } from "../DataTable/DataTable";
import { Functions } from "../Functions/Functions";
import { IInput } from "../Interfaces/IInput";
import { Program } from "../Program/Program";
import { Row } from "../Row/Row";
import { Config } from "./Config";
import { ConfigMassiveUpdate } from "./ConfigMassiveUpdate";

export class ConfigCell extends Config {

    private isResizable: boolean;
    private col: number;
    private icon: string;
    private columnName: string;
    private data: string;
    private value: any;
    private fixedColumn: boolean;
    private celltype: string;
    private content: string;
    private massiveUpdate: ConfigMassiveUpdate;



    constructor(config: any) {
        super(config);
        
        var isResizable: boolean = config.isResizable;
        var col: number = config.col;
        var icon: string = config.icon;
        var columnName: string = config.columnName;
        var data: string = config.data;
        var value: any = config.value;
        var fixedColumn: boolean = config.fixedColumn;
        var celltype: string = config.celltype;
        var content: string = config.content;
        var massiveUpdate: any | boolean = config.massiveUpdate;

        this.SetIsResizable(isResizable);
        this.SetCol(col);
        this.SetIcon(icon);
        this.SetColumnName(columnName);
        this.SetData(data);
        this.SetValue(value);
        this.SetFixedColumn(fixedColumn);
        this.SetCellType(celltype);
        this.SetContent(content);
        this.SetMassiveUpdate(massiveUpdate);
    }

    //Getters
    public GetIsResizable(): boolean {
        return this.isResizable;
    }
    public GetCol(): number {
        return this.col;
    }
    public GetIcon(): string {
        return this.icon;
    }
    public GetColumnName(): string {
        return this.columnName;
    }
    public GetData(): string {
        return this.data;
    }
    public GetValue(): any{
        return this.value;
    }
    public GetFixedColumn(): boolean {
        return this.fixedColumn;
    }
    public GetCellType(): string {
        return this.celltype;
    }
    public GetContent(): string {
        return this.content;
    }
    public GetMassiveUpdate(): ConfigMassiveUpdate {
        return this.massiveUpdate;
    }

    //Setters
    private SetIsResizable(isResizable: boolean): void{
        this.isResizable = isResizable;
    }
    private SetCol(col: number): void{
        this.col = col;
    }
    private SetIcon(icon: string): void {
        this.icon = icon;
    }
    private SetColumnName(columnName: string): void {
        this.columnName = columnName;
    }
    private SetData(data: string): void {
        this.data = data;
    }
    private SetValue(value: any): void {
        this.value = value;
    }
    private SetFixedColumn(fixedColumn: boolean): void {
        if(!Functions.IsNullOrEmpty(fixedColumn)){
            this.fixedColumn = fixedColumn;
        } else {
            this.fixedColumn = false;
        }
    }
    private SetCellType(celltype: string): void {
        this.celltype = celltype;
    }
    private SetContent(content: string): void {
        this.content = content;
    }
    private SetMassiveUpdate(massiveUpdate: any): void {
        this.massiveUpdate = null;
        if(!Functions.IsNullOrEmpty(massiveUpdate)){
            var config: any = massiveUpdate;
            if(Functions.IsBoolean(massiveUpdate)){
                if(massiveUpdate){
                    config = Program.defaults.massiveUpdate.YES;
                } else {
                    config = Program.defaults.massiveUpdate.NO;
                }
            } 
            this.massiveUpdate = new ConfigMassiveUpdate(config);
        }
    }   
    

    public IsInputCell(): boolean {
        var ret: boolean = false;
        var values: any = Functions.CloneObject(Program.inputTypes);
        var keys = Object.keys(values);
        ret = keys.some(e=>{ return values[e] === this.GetType(); });
        return ret;
    }

}