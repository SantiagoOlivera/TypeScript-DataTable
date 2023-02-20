import { DataTableCell } from "./DataTableCell";

export class DataTableCellColumn extends DataTableCell{

   
    
    private columnName: String
    private sTitle: string

    constructor(columnName: string, title: string){
        super(columnName);
        this.SetColumnName(columnName);
        this.SetTitle(title);
        this.Draw();
    }

    public Draw(): void {
        this.innerHTML = this.GetTitle();
    }

    public GetTitle(): string{
        return this.sTitle;
    }

    private SetColumnName(columnName: string):void {
        this.columnName = columnName;
    }

    private SetTitle(title:string):void{
        this.sTitle = title;
    }

}
window.customElements.define('data-table-cell-column', DataTableCellColumn, { extends: 'th' });