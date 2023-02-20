import { DataTableCell } from "../Cell/DataTableCell";
import { DataTableRow } from "./DataTableRow";

export class DataTableRowReadOnly extends DataTableRow{

    private value: string

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

window.customElements.define('data-table-row-read-only', DataTableRowReadOnly, { extends: 'tr' });