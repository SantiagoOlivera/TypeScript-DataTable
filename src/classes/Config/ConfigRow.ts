import { Button } from "bootstrap";
import { DataTableCell } from "../Cell/DataTableCell";
import { Functions } from "../Functions/Functions";
import { Config } from "./Config";
import { ConfigButton } from "./ConfigButton";
import { RowStatus } from "../Enum/RowStatus";

export class ConfigRow extends Config {

    private rowNum: number;
    private rowStatus: RowStatus;
    private isSelectable: boolean;
    private cells: Array<DataTableCell>;
    private colSpan: number;
    private onclick: Function;
    private buttons: Array<any>;

    constructor(config: any) {
        super(config);

        var rowNum: number = config.rowNum;
        var isSelectable: boolean = config.isSelectable;
        var cells: Array<DataTableCell> = config.cells;
        var colSpan: number = config.colSpan;
        var buttons: Array<any> = config.buttons;
        var rowStatus: RowStatus = config.rowStatus;

        if(!Functions.IsNullOrEmpty(rowNum)){
            this.SetRowNum(rowNum);
        }else{
            this.SetRowNum(null);
        }
        if(!Functions.IsNullOrEmpty(isSelectable)){
            this.SetIsSelectable(isSelectable);
        } else {
            this.SetIsSelectable(false);
        }
        if(!Functions.IsNullOrEmpty(cells)){
            this.SetCells(cells);
        } else {
            this.SetCells([]);
        }
        if(!Functions.IsNullOrEmpty(colSpan)){
            this.SetColSpan(colSpan);
        }else{
            this.SetColSpan(0)
        }
        if(!Functions.IsNullOrEmpty(buttons)){
            this.SetButtons(buttons);
        } else {
            this.SetButtons([]);
        }
        if(!Functions.IsNullOrEmpty(rowStatus)){
            this.SetRowStatus(rowStatus);
        } else {
            this.SetRowStatus(RowStatus.NORMAL);
        }
    }

    //Getters
    public GetRowNum(): number{
        return this.rowNum;
    }
    public IsSelectable(): boolean{
        return this.isSelectable;
    }
    public GetCells(): Array<DataTableCell> {
        return this.cells;
    }
    public GetColSpan(): number {
        return this.colSpan;
    }
    public GetButtons(): Array<any> {
        return this.buttons;
    }
    public GetOnClick(): Function {
        return this.onclick;
    }
    public GetRowStatus(): RowStatus {
        return this.rowStatus;
    }

    //Setters
    private SetRowNum(rowNum: number): void{
        this.rowNum = rowNum;
    }
    private SetIsSelectable(isSelectable: boolean): void{
        this.isSelectable = isSelectable;
    }
    private SetCells(cells: Array<DataTableCell>): void {
        this.cells = cells;
    }
    private SetColSpan(colSpan: number): void{
        this.colSpan = colSpan;
    }
    private SetButtons(buttons: Array<any>){
        this.buttons = buttons;
    }
    private SetRowStatus(rowStatus: RowStatus) : void {
        this.rowStatus = rowStatus;
    }
    private SetOnClick(onclick: Function): void{
        this.onclick = onclick;
    }
    
}