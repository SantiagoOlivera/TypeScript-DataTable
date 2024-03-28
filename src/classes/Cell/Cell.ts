import { ConfigCell } from "../Config/ConfigCell";
import { IDraw } from "../Interfaces/IDraw";

export abstract class Cell extends HTMLTableCellElement implements IDraw {

    private cellName: string;
    private config: ConfigCell;

    constructor(config: ConfigCell) {
        super();

        var name: string = config.GetName();
        var className: string = config.GetClassName();

        this.SetConfig(config);
        this.SetCellName(name);
        this.SetClassName(className);
    }

    
    public abstract GetValue(): any
    public abstract Draw(): void 


    public SetResizable(): void {
        var minWidth: number = this.config.GetMinWidth();
        var maxHeight: number = this.config.GetMaxHeight();
        $(this).resizable({
            //minWidth: 50,
            minWidth: minWidth,
            //maxHeight: 45,
            maxHeight: maxHeight,
        });
    }

    public isResizable(): boolean{
        var ret: boolean = false;
        return ret;
    }

    //Getters
    public GetCellName(): string {
        return this.cellName;
    }
    public GetConfig(): ConfigCell {
        return this.config;
    }
    //Setters
    private SetConfig(config: ConfigCell): void {
        this.config = config;
    }
    private SetCellName(cellName: string): void {
        this.cellName = cellName;
    }
    public SetHidden(hidden: boolean): void {
        this.hidden = hidden;
    }
    private SetClassName(className: string){
        this.className = className;
    }
    

}