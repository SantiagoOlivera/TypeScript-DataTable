import { ConfigCell } from "../Config/ConfigCell";
import { Functions } from "../Functions/Functions";
import { Cell } from "./Cell";
import { DataTableCell } from "./DataTableCell";

export class DataTableCellColumn extends Cell {
    

    private columnName: string;
    private sTitle: string;
    //private isResizable: boolean;

    private readonly classes = {
        RESIZABLE: 'resizable',
        DISPLAY_NONE: 'd-none',
    }

    constructor(config: ConfigCell){
        super(config);

        var name: string = config.GetName();
        var title: string = config.GetTitle();


        this.SetColumnName(name);
        if(!Functions.IsNullOrEmpty(title)){
            this.SetTitle(title);
        }else{
            this.SetTitle('');
        }
        //this.SetHidden(config.GetHidden());
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

    public GetValue() {
        throw new Error("Method not implemented.");
    }

}

window.customElements.define('data-table-cell-column', DataTableCellColumn, { extends: 'th' });