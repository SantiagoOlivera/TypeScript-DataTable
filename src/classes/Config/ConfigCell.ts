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


    constructor(config: any) {
        super(config);
        
        var isResizable: boolean = config.isResizable;
        var row: number = config.row;
        var col: number = config.col;
        var input: IInput = config.input;
        var icon: string = config.icon;
        var columnName: string = config.columnName;
        var data: string = config.data;

        this.SetIsResizable(isResizable);
        this.SetRow(row);
        this.SetCol(col);
        this.SetInput(input);
        this.SetIcon(icon);
        this.SetColumnName(columnName);
        this.SetData(data);
    }

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
    


}