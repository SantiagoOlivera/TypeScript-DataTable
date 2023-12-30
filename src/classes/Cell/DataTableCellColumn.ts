import { DataTableCell } from "./DataTableCell";

export class DataTableCellColumn extends DataTableCell{

    private columnName: String
    private sTitle: string
    private isResizable: boolean

    private readonly classes = {
        RESIZABLE: 'resizable',
        DISPLAY_NONE: 'd-none',
    }

    constructor(
        columnName: string, 
        title: string, 
        bHidden: boolean,
        isResizable: boolean
    ){
        super(columnName);
        this.SetColumnName(columnName);
        this.SetTitle(title);
        this.SetIsResizable(isResizable);
        this.SetHidden(bHidden);
        if(isResizable){
            this.SetResizable();
        }
        this.Draw();
    }

    public Draw(): void {
        var isResizable: boolean = this.GetIsResizable();
        if(isResizable){
            this.classList.add(this.classes.RESIZABLE);
        }
        this.innerHTML = this.GetTitle();
        
    }

    public GetTitle(): string{
        return this.sTitle;
    }

    private SetIsResizable(isResizable: boolean){
        this.isResizable = isResizable;
    }

    public GetIsResizable():boolean{
        return this.isResizable;
    }

    private SetColumnName(columnName: string):void {
        this.columnName = columnName;
    }

    private SetTitle(title:string):void{
        this.sTitle = title;
    }

}
window.customElements.define('data-table-cell-column', DataTableCellColumn, { extends: 'th' });