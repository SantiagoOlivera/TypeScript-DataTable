import * as $ from "jquery";
import "jquery-ui/dist/jquery-ui";

export abstract class DataTableCell extends HTMLTableCellElement{
    
    private cellName: string

    constructor(cellName:string){
        super();
        this.SetCellName(cellName);
    }

    private SetCellName(cellName:string):void{
        this.cellName = cellName;
    }

    public GetCellName():string{
        return this.cellName;
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

    public abstract Draw():void
}

