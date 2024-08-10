import { Cell } from "../Cell/Cell";
import { DataTableCell } from "../Cell/DataTableCell";
import { ConfigRow } from "../Config/ConfigRow";
import { DataTableRow } from "./DataTableRow";

export class DataTableRowReadOnly extends DataTableRow{

    private value: string;

    constructor(config: ConfigRow) {
        super(config);
        //cells: Array<DataTableCell>
        var cells: Array<Cell>
        //this.SetCells(cells);
        this.Draw();
    }

    public Draw(): void {
        var cells: Array<Cell> = this.GetCells();
        for(var c of cells){
            this.appendChild(c);
        }
    }
}

window.customElements.define('data-table-row-read-only', DataTableRowReadOnly, { extends: 'tr' });