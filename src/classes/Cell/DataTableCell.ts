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

    public abstract Draw():void
}

