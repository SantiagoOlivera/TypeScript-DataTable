import { Cell } from "../Cell/Cell";
import { ConfigRow } from "../Config/ConfigRow";
import { IDraw } from "../Interfaces/IDraw";
import { Row } from "./Row";


export class DataTableRow extends Row implements IDraw {

    constructor(config: ConfigRow){
        super(config);
        this.Draw();
    }

    public Draw(): void {
        var cells: Array<Cell> = this.GetCells();
        for(var c of cells){
            this.appendChild(c);
        }
    }
}

window.customElements.define('data-table-row', DataTableRow, { extends: 'tr' });

/* export abstract class DataTableRow extends HTMLTableRowElement {
    
    //values: Object;
    private rowNum: number;
    private cellsList: Array<DataTableCell>;
    private config: ConfigRow;

    constructor(config: ConfigRow){
        //rowNum?:number
        super();
        this.SetConfig(config);
        this.SetCells(new Array<DataTableCell>());
        //this.SetRowNum(rowNum);
    }

    private SetConfig(config: ConfigRow): void {
        this.config = config;
    }

    public GetConfig(): ConfigRow{
        return this.config;
    }

    private SetRowNum(rowNum: number){
        this.rowNum = rowNum;
    }

    public GetRowNum(){
        return this.rowNum;
    }

    public AddCell(cell: DataTableCell) {
        console.log(this.GetRowNum().toString());
        cell.setAttribute('row', this.GetRowNum().toString() );
        this.cellsList.push(cell);
    }

    public GetCells(): Array<DataTableCell>{
        return this.cellsList;
    }

    public SetCells(cells: Array<DataTableCell>){
        this.cellsList = cells;
    }

    public GetRowNumCell(): DataTableCell{
        var cell: DataTableCell = this.cellsList.find( e =>{ return e.GetCellName() === DataTable.ROW_NUM_COLUMN.data });
        return cell;
    }

    public GetCell(idx: number): DataTableCell{
        var cell: DataTableCell = null;
        if(idx < this.cellsList.length){
            cell = this.cellsList[idx];
        }
        return cell;
    }

    public GetData(): any {
        var ret: any = {};
        var cells: Array<DataTableCell> = this.GetCells();

        for(var c of cells){
            var field: string = c.GetCellName();
            //ret[field] = c.GetInput().GetValue();
        }

        return ret;
    }

    public abstract Draw(): void

} */

