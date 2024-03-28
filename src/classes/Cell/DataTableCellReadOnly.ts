import { ConfigCell } from "../Config/ConfigCell";
import { DataTableCell } from "./DataTableCell";

/* export class DataTableCellReadOnly extends DataTableCell{
    private value: string
    constructor(config: ConfigCell) {
        super(config);
        this.Draw();
    }

    public SetValue(value: string){
        this.value = value;
        this.Draw();
    }

    private GetValue(): string{
        return this.value;
    }

    public Draw(): void {
        this.innerHTML = this.GetValue();
    }

}

window.customElements.define('data-table-cell-read-only', DataTableCellReadOnly, { extends: 'td' }); */