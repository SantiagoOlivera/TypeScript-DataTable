import { DataTable } from "../DataTable/DataTable";
import { IInput } from "../Interfaces/IInput";
import { Config } from "./Config";

export class ConfigCell extends Config {

    private isResizable: boolean;
    private input: IInput;
    private row: number;
    private col: number;
    private icon: string;
    private columnName: string;
    private data: string;
    private value: any;
    private datatable: DataTable;


    constructor(config: any) {
        super(config);
        
        var isResizable: boolean = config.isResizable;
        var row: number = config.row;
        var col: number = config.col;
        var input: IInput = config.input;
        var icon: string = config.icon;
        var columnName: string = config.columnName;
        var data: string = config.data;
        var value: any = config.value;
        var datatable: DataTable = config.datatable;

        this.SetIsResizable(isResizable);
        this.SetRow(row);
        this.SetCol(col);
        this.SetInput(input);
        this.SetIcon(icon);
        this.SetColumnName(columnName);
        this.SetData(data);
        this.SetValue(value);
        this.SetDataTable(datatable);
    }

    //Getters
    public GetIsResizable(): boolean {
        return this.isResizable;
    }
    public GetInput():IInput{
        return this.input;
    }
    public GetRow(): number{
        return this.row;
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
    public GetDataTable(): DataTable {
        return this.datatable;
    }

    //Setters
    private SetIsResizable(isResizable: boolean): void{
        this.isResizable = isResizable;
    }
    private SetInput(input: IInput): void{
        this.input = input;
    }
    private SetRow(row: number): void{
        this.row = row;
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
    private SetDataTable(datatable: any): void {
        this.datatable = datatable;
    }

}