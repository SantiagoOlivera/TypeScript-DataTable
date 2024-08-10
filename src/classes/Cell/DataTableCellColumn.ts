import { ConfigCell } from "../Config/ConfigCell";
import { Functions } from "../Functions/Functions";
import { Cell } from "./Cell";
import { DataTableCell } from "./DataTableCell";
import { ConfigButton } from "../Config/ConfigButton";
import { IconButton } from "../Buttons/IconButton";
import { Program } from "../Program/Program";
import { Button } from "../Buttons/Button";
import { ColumnOptionsButton } from "../Buttons/ColumnOptionsButton";

export class DataTableCellColumn extends DataTableCell {
    
    private sTitle: string;
    //private isResizable: boolean;

    private readonly classes = {
        RESIZABLE: 'resizable',
        DISPLAY_NONE: 'd-none',
    }

    constructor(config: ConfigCell){
        super(config);
        this.SetTitle();
        //this.SetHidden(config.GetHidden());
        this.Draw();
    }

    public Draw(): void {
        this.innerHTML = '';
        var isResizable: boolean = this.GetConfig().GetIsResizable();
        if(isResizable) {
            this.SetResizable();
            this.classList.add(this.classes.RESIZABLE);
        }
        this.innerHTML = this.GetTitle();
        if(this.GetConfig().GetMassiveUpdate()?.IsEnabled()){
            var btn: Button = new ColumnOptionsButton(this);
            this.appendChild(btn);
        }
    }
    
    public GetTitle(): string {
        return this.sTitle;
    }

    private SetTitle(): void {
        var title: string = this.GetConfig().GetTitle();
        if(Functions.IsNullOrEmpty(title)){
            title = '';
        }
        this.sTitle = title;
    }

    public GetValue(): string {
        return this.GetColumnName();
    }

    public SetValue(value: any): void {
        this.innerHTML = value;
    }

    public IsFocusable(): boolean {
        throw false;
    }
    public Focus(): void {
        throw new Error("Method not implemented.");
    }

}

window.customElements.define('data-table-cell-column', DataTableCellColumn, { extends: 'th' });