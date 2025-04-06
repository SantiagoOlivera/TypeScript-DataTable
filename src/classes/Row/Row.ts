import { Cell } from "../Cell/Cell";
import { DataTableCellRowStatus } from "../Cell/DataTableCellRowStatus";
import { ConfigRow } from "../Config/ConfigRow";
import { DataTable } from "../DataTable/DataTable";
import { Table } from "../DataTable/Table";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";

export abstract class Row extends HTMLTableRowElement implements IDraw {
    
    //private rowNum: number;
    private cellsList: Array<Cell>;
    private table: Table;
    private index: number;
    private indexNode: number;
    private rowNum: number;
    private config: ConfigRow;
    private editable: boolean;

    constructor(config: ConfigRow) {
        super();
        this.SetConfig(config);
        this.Init();
    }

    private Init(): void {
        this.cellsList = new Array<Cell>();
        this.SetIndex();
        this.SetRowNum();
    }
    //Setters
    private SetConfig(config: ConfigRow): void {
        this.config = config;
    }
    public SetTable(table: Table): void {
        this.table = table;
    }
    public SetIndex(): void {
        this.index = this.GetConfig().GetIndex();
    }
    public AddCell(cell: Cell): void {
        this.cellsList.push(cell);
    }
    private SetRowNum(): void {
        this.rowNum = this.GetConfig().GetRowNum();
    }
    //Getters
    public GetConfig(): ConfigRow {
        return this.config;
    }
    public GetIndex(): number {
        return this.index;
    }
    public GetTable(): Table {
        return this.table;
    }
    public GetRowNum(): number {
        return this.rowNum;
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
    public GetCells(): Array<Cell>{
        return this.cellsList;
    }
    public GetData(): any {
        var ret: any = {};
        var cells: Array<Cell> = this.GetCells();
        for(var c of cells){
            var field: string = c.GetColumnName();
            ret[field] = c.GetValue();
        }
        return ret;
    }
    public Draw(): void {
        this.innerHTML = '';
        var cells: Array<Cell> = this.GetCells();
        for(var c of cells){
            this.appendChild(c);
        }
    }
    
    public GetCellByColumnName(name: string): Cell {
        var ret: Cell = null;
        var cells: Array<Cell> = this.GetCells();
        var cell: Cell = cells.find( e => { return e.GetConfig().GetData() === name; });
        if(!Functions.IsNullOrEmpty(cell)){
            ret = cell;
        }
        return ret;
    }


    public SetIndexNode(index: number): void {
        this.indexNode = index;
    }
    public GetIndexNode(): number {
        return this.indexNode;
    }

    
    
    /* public SetToggleSelect(toggleSelect: boolean): void {
        throw new Error("Method not implemented.");
    } */

    
    /* public GetRowNum(): number {
        return this.rowNum;
    } */
    
    /* public GetCell(idx: number): Cell{
        var cell: Cell = null;
        if(idx < this.cellsList.length){
            cell = this.cellsList[idx];
        }
        return cell;
    } */
    
    /* public GetRowStatus() : RowStatus {
        return this.rowStatus;
    } */
    
    //Setters
    /* public SetCells(cells: Array<Cell>){
        for(var c of cells){
            c.SetRow(this);
            this.cellsList.push(c);
        }
    } */
    /* private SetRowNum(rowNum: number): void{
        this.rowNum = rowNum;
    } */

    /* public SetRowStatus(rowStatus: RowStatus) : void {
        this.rowStatus = rowStatus;
    } */



    /* public GetRowNumberCell(): Cell {
        var cell: Cell = this.cellsList.find( e => { return e.GetCellName() === DataTable.ROW_NUM_COLUMN.data });
        return cell;
    } */

    /* public AddCell(cell: Cell){
        //console.log(this.GetRowNum().toString());
        cell.setAttribute('row', this.GetRowNum().toString() );
        this.cellsList.push(cell);
    } */

    /* private SetToggleSelect(toggleSelect: boolean){
        this.toggleSelect = toggleSelect;
    } */

    /* public IsSelected(): boolean {
        return this.selected;
    } */

    /* public Select(): void {
        if(this.GetConfig().IsSelectable()){
            if(this.IsSelected()) {
                this.Deselect();
            } else {
                this.selected = true;
                this.classList.toggle(Program.classes.SELECTED, true);
            }
        }
    } */

    /* public Deselect(): void {
        this.selected = false;
        this.classList.toggle(Program.classes.SELECTED, false);
    } */


    /* public GetRowStatusCell(): Cell {
        var ret: Cell = null;
        var cells: Array<Cell> = this.GetCells();
        var cell: Cell = cells.find( e => { 
            return e.GetConfig().GetData() === DataTable.ROW_STATUS_COLUMN.data;
        });
        if(!Functions.IsNullOrEmpty(cell)){
            ret = <Cell>cell;
        }
        return ret;
    } */

    /* public Draw(): void {
        var cells: Array<Cell> = this.GetCells();
        for(var c of cells){
            this.appendChild(c);
        }
    } */

    
    public IsEditable(): boolean {
        return this.editable;
    }

    public Disable(disabled: boolean): void {
        for(var c of this.cellsList){
            try{
                c.Disable(disabled);
                c.Draw();
            } catch{
            }
        }
    };
    public Editable(editable: boolean): void {
        for(var c of this.cellsList){
            try{
                this.editable = editable;
                c.Editable(editable);
                c.Draw();
            } catch{
            }
        }
    };

    public ToggleClassToCells(className: string, force: boolean): void {
        for(var c of this.cellsList){
            c.classList.toggle(className, force);
        }
    }

}