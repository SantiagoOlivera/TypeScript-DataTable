import { data } from "jquery";
import { Cell } from "../Cell/Cell";
import { ConfigRow } from "../Config/ConfigRow";
import { DataTable } from "../DataTable/DataTable";
import { IDraw } from "../Interfaces/IDraw";
import { Row } from "./Row";
import { DataTableCell } from "../Cell/DataTableCell";
import { RowStatus } from "../Enum/RowStatus";


export class DataTableRowWithStatus extends Row implements IDraw {
    //private status: RowStatusCell;
    constructor(config: ConfigRow){
        super(config);
    }
}

window.customElements.define('data-table-row-with-status', DataTableRowWithStatus, { extends: 'tr' });