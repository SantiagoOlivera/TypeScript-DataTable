import { ConfigCell } from "../Config/ConfigCell";
import { DataTableCell } from "./DataTableCell";

export class DataTableCellColumn extends DataTableCell {

    private columnName: String
    private sTitle: string
    private isResizable: boolean

    private readonly classes = {
        RESIZABLE: 'resizable',
        DISPLAY_NONE: 'd-none',
    }

    constructor(config: ConfigCell){
        super(config);
        this.SetColumnName(config.GetName());
        this.SetTitle(config.GetTitle());
        this.SetHidden(config.GetHidden());
        this.Draw();
    }

    public Draw(): void {
        var isResizable: boolean = this.GetConfig().GetIsResizable();
        if(isResizable){
            this.SetResizable();
            this.classList.add(this.classes.RESIZABLE);
        }
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