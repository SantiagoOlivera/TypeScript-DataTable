import { ConfigCell } from "../Config/ConfigCell";
import { DataTableCell } from "./DataTableCell";

export class DataTableCellIcon extends DataTableCell {
    private icon: string;

    constructor(config: ConfigCell) {
        super(config);
        this.SetIcon(config.GetIcon());
        this.Draw();
    }

    private SetIcon(icon: string): void {
        this.icon = icon;
    }
    public GetIcon(): string {
        return this.icon;
    }
    public Draw(): void {
        var icon: HTMLElement = document.createElement('i');
        icon.className = this.GetIcon();
        
        this.appendChild(icon);
    }
}