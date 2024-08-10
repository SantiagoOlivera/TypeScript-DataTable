import { DataTableCell } from "../Cell/DataTableCell";
import { ConfigRow } from "../Config/ConfigRow";
import { DataTableRow } from "./DataTableRow";

export class DataTableRowEmpty extends DataTableRow{

    public static EMPTY_ROW_TEXT: string = 'No data';

    constructor(config: ConfigRow){
        super(config);
    }

    public Draw(): void {
        
        var td: HTMLElement = document.createElement('td');
        td.setAttribute('colspan', this.GetConfig().GetColSpan().toString());
        
        td.innerHTML = DataTableRowEmpty.EMPTY_ROW_TEXT;
        td.className = 'text-center';

        this.appendChild(td);
    }
}

window.customElements.define('data-table-row-empty', DataTableRowEmpty, { extends: 'tr' });