import { Cell } from "../Cell/Cell";
import { DataTableCell } from "../Cell/DataTableCell";
import { ConfigRow } from "../Config/ConfigRow";
import { DataTable } from "../DataTable/DataTable";
import { RowStatus } from "../Enum/RowStatus";
import { Functions } from "../Functions/Functions";
import { ISelectable } from "../Interfaces/ISelectable";
import { Program } from "../Program/Program";
import { DataTableRow } from "./DataTableRow";

export abstract class Row extends HTMLTableRowElement implements ISelectable {
    
    private rowNum: number;
    private idx: number;
    private cellsList: Array<Cell>;
    private config: ConfigRow;
    private rowStatus: RowStatus;
    public selected: boolean;
    public toggleSelect: boolean;

    constructor(config: ConfigRow) {
        super();

        var rowNum: number = config.GetRowNum();
        var cells: Array<Cell> = config.GetCells();
        var rowStatus: RowStatus = config.GetRowStatus();

        var r: Row = this;
        this.addEventListener('dblclick', function(event: Event){
            event.stopPropagation();
            r.Select();
        });

        this.SetConfig(config);
        this.SetRowNum(rowNum);
        this.SetRowStatus(rowStatus);
        if(!Functions.IsNullOrEmpty(cells)){
            this.SetCells(cells);
        }else{
            this.SetCells(new Array<DataTableCell>());
        }
    }

    public SetIdx(idx: number): void {
        this.idx = idx;
    }

    public GetIdx(): number {
        return this.idx;
    }

    public Hide( hidden: boolean ): void {
        this.hidden = hidden;
    }

    public IsHidden(): boolean {
        var ret: boolean = this.hidden;
        return ret;
    }
    
    public IsVisible(): boolean {
        var ret: boolean = !this.IsHidden();
        return ret;
    }
    
    public SetToggleSelect(toggleSelect: boolean): void {
        throw new Error("Method not implemented.");
    }

    //Getters
    public GetConfig(): ConfigRow {
        return this.config;
    }
    public GetRowNum(): number {
        return this.rowNum;
    }
    public GetCells(): Array<Cell>{
        return this.cellsList;
    }
    public GetCell(idx: number): Cell{
        var cell: Cell = null;
        if(idx < this.cellsList.length){
            cell = this.cellsList[idx];
        }
        return cell;
    }
    public GetData(): any {
        var ret: any = {};
        var cells: Array<Cell> = this.GetCells();
        for(var c of cells){
            var field: string = c.GetCellName();
            //ret[field] = c.GetInput().GetValue();
        }
        return ret;
    }
    public GetRowStatus() : RowStatus {
        return this.rowStatus;
    }
    
    //Setters
    private SetConfig(config: ConfigRow): void {
        this.config = config;
    }
    public SetCells(cells: Array<Cell>){
        this.cellsList = cells;
    }
    private SetRowNum(rowNum: number): void{
        this.rowNum = rowNum;
    }

    public SetRowStatus(rowStatus: RowStatus) : void {
        this.rowStatus = rowStatus;
    }



    public GetRowNumberCell(): Cell {
        var cell: Cell = this.cellsList.find( e => { return e.GetCellName() === DataTable.ROW_NUM_COLUMN.data });
        return cell;
    }

    public AddCell(cell: Cell){
        //console.log(this.GetRowNum().toString());
        cell.setAttribute('row', this.GetRowNum().toString() );
        this.cellsList.push(cell);
    }

    /* private SetToggleSelect(toggleSelect: boolean){
        this.toggleSelect = toggleSelect;
    } */

    public IsSelected(): boolean {
        return this.selected;
    }

    public Select(): void {
        if(this.GetConfig().IsSelectable()){
            if(this.IsSelected()) {
                this.Deselect();
            } else {
                this.selected = true;
                this.classList.toggle(Program.classes.SELECTED, true);
            }
        }
    }

    public Deselect(): void {
        this.selected = false;
        this.classList.toggle(Program.classes.SELECTED, false);
    }


    public GetRowStatusCell(): Cell {
        var ret: Cell = null;
        var cells: Array<Cell> = this.GetCells();
        var cell: Cell = cells.find( e => { 
            return e.GetConfig().GetData() === DataTable.ROW_STATUS_COLUMN.data;
        });
        if(cell){
            ret = <Cell>cell;
        }
        return ret;
    }

}