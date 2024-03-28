import { Cell } from "../Cell/Cell";
import { DataTableCell } from "../Cell/DataTableCell";
import { ConfigRow } from "../Config/ConfigRow";
import { DataTableRow } from "./DataTableRow";

export class DataTableRowHeader extends DataTableRow {
   
    constructor(config: ConfigRow){
        super(config);
        var cells: Array<DataTableCell> = config.GetCells();
        this.SetCells(cells);   
        this.Draw();
    }

    public Draw(): void {
        var cells: Array<Cell> = this.GetCells();
        for(var c of cells){
            this.appendChild(c);
        }
    }

}

window.customElements.define('data-table-row-header', DataTableRowHeader, { extends: 'tr' });