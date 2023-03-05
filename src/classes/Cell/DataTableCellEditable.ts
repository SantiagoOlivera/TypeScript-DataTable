import { IInput } from "../Interfaces/IInput";
import { DataTableCell } from "./DataTableCell";

export class DataTableCellEditable extends DataTableCell{

    private input: IInput;
    private row: number;
    private col: number;
    
    constructor(cellName: string, row:number, col:number, input: IInput, className: string){
        super(cellName);
        this.SetRow(row);
        this.SetCol(col);
        this.SetInput(input);
        this.SetClassName(className);
        this.Draw();
    }

    private SetClassName(className: string){
        this.className = className;
    }

    private SetRow(row: number):void{
        this.row = row;
    }

    public GetRow():number{
        return this.row;
    }

    public GetCol():number{
        return this.col;
    }

    private SetCol(col: number):void {
        this.col = col;
    }

    private SetInput(input: IInput):void{
        this.input = input;
    }

    public GetInput(): IInput{
        return this.input;
    }

    public Draw(): void {
        var html: HTMLElement = <HTMLElement><unknown>this.GetInput();
        this.appendChild(html);
    }

    public Focus():void{
        //console.log(this.input);
        var input: HTMLElement = <HTMLElement><unknown>this.GetInput();
        input.focus();
    }
}

window.customElements.define('data-table-cell-editable', DataTableCellEditable, { extends: 'td' });