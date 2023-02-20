import { DataTableCell } from "../Cell/DataTableCell";
import { DataTableRow } from "./DataTableRow";

export class DataTableRowEmpty extends DataTableRow{
    public static EMPTY_ROW_TEXT: string = 'No data';
    private colSpan: number;
    constructor(colSpan: number){
        super();
        this.SetColSpan(colSpan);
        this.Draw();
    }

    private SetColSpan(colSpan: number){
        this.colSpan = colSpan;
    }

    public GetColSpan(): number{
        return this.colSpan;
    }

    public Draw(): void {
        var td: HTMLElement = document.createElement('td');
        td.setAttribute('colspan', this.GetColSpan().toString());
        td.innerHTML = DataTableRowEmpty.EMPTY_ROW_TEXT;
        td.className = 'text-center';
        this.appendChild(td);
    }
}

window.customElements.define('data-table-row-empty', DataTableRowEmpty, { extends: 'tr' });