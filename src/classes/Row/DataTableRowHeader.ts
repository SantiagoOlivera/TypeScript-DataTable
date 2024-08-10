import { Cell } from "../Cell/Cell";
import { DataTableCellColumn } from "../Cell/DataTableCellColumn";
import { ConfigCell } from "../Config/ConfigCell";
import { ConfigRow } from "../Config/ConfigRow";
import { Factory } from "../Factory/Factory";
import { Program } from "../Program/Program";
import { DataTableRow } from "./DataTableRow";
import { Row } from "./Row";

export class DataTableRowHeader extends Row {
   
    constructor(config: ConfigRow){
        super(config);
        this.SetCells();   
    }

    private SetCells(): void {
        var configcells: Array<Object> = this.GetConfig().GetCells();
        var cells: Array<Cell> = Factory.GetCells(configcells, this);
        for(var i=0;i<cells.length; i++){
            this.AddCell(cells[i]);
        }
    }

}

window.customElements.define('data-table-row-header', DataTableRowHeader, { extends: 'tr' });