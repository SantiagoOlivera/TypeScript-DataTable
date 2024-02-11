import { DataTableCell } from "../Cell/DataTableCell";
import { DataTable } from "../DataTable/DataTable";
import { DataTableEditable } from "../DataTable/DataTableEditable";

export abstract class DataTableRow extends HTMLTableRowElement{
    
    values: Object;
    private rowNum: number;
    private cellsList: Array<DataTableCell>;

    constructor(rowNum?:number){
        super();
        this.SetCells(new Array<DataTableCell>());
        this.SetRowNum(rowNum);
    }

    private SetRowNum(rowNum: number){
        this.rowNum = rowNum;
    }

    public GetRowNum(){
        return this.rowNum;
    }

    public AddCell(cell: DataTableCell){
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
        var cell: DataTableCell = this.cellsList.find( e =>{ return e.GetCellName() === DataTable.ROW_NUM_COLUMN.data});
        return cell;
    }

    public GetCell(idx: number): DataTableCell{
        var cell: DataTableCell = null;
        if(idx < this.cellsList.length){
            cell = this.cellsList[idx];
        }
        return cell;
    }

    public abstract Draw(): void

}

