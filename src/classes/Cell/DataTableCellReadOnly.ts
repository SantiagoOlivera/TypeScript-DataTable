import { DataTableCell } from "./DataTableCell";

export class DataTableCellReadOnly extends DataTableCell{
    private value: string
    constructor(cellName: string, value: string){
        super(cellName);
        this.SetValue(value);
        this.Draw();
    }

    private SetValue(value: string){
        this.value = value;
    }

    private GetValue(): string{
        return this.value;
    }

    public Draw(): void {
        this.innerHTML = this.GetValue();
    }

}

window.customElements.define('data-table-cell-read-only', DataTableCellReadOnly, { extends: 'td' });