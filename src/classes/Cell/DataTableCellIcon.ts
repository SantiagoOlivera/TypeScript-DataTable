import { DataTableCell } from "./DataTableCell";

export class DataTableCellIcon extends DataTableCell{
    private icon: HTMLElement;

    constructor(cellName:string, icon: HTMLElement){
        super(cellName);
        this.SetIcon(icon);
        this.Draw();
    }

    private SetIcon(icon: HTMLElement):void{
        this.icon = icon;
    }

    public GetIcon(): HTMLElement{
        return this.icon;
    }

    public Draw(): void {
        this.appendChild(this.GetIcon());
    }
}