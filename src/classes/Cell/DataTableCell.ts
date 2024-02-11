import * as $ from "jquery";
import "jquery-ui/dist/jquery-ui";
import { ConfigCell } from "../Config/ConfigCell";

export abstract class DataTableCell extends HTMLTableCellElement{
    
    private cellName: string
    private config: ConfigCell;

    constructor(config:ConfigCell){
        super();
        this.SetConfig(config);
        this.SetCellName(config.GetData());
    }

    public abstract Draw(): void

    private SetConfig(config:ConfigCell): void {
        this.config = config;
    }

    private SetCellName(cellName:string):void{
        this.cellName = cellName;
    }

    public SetHidden(hidden: boolean): void {
        this.hidden = hidden;
    }

    public SetResizable(): void {
        $(this).resizable({
            minWidth: 50,
            maxHeight: 45,
        });
    }

    public GetCellName():string{
        return this.cellName;
    }

    public GetConfig(): ConfigCell {
        return this.config;
    }

}

