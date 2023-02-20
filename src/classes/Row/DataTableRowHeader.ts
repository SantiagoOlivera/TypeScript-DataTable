import { DataTableCell } from "../Cell/DataTableCell";
import { DataTableRow } from "./DataTableRow";

export class DataTableRowHeader extends DataTableRow{
   
    constructor(cells: Array<DataTableCell>){
        super();
        this.SetCells(cells);   
        this.Draw();
    }

    public Draw(): void {
        var cells: Array<DataTableCell> = this.GetCells();
        for(var c of cells){
            this.appendChild(c);
        }
    }

}

window.customElements.define('data-table-row-header', DataTableRowHeader, { extends: 'tr' });