import { ConfigDataTable } from "../Config/ConfigDataTable";
import { IDraw } from "../Interfaces/IDraw";
import { ISelectable } from "../Interfaces/ISelectable";
import { DataTableRow } from "../Row/DataTableRow";


export abstract class DataTable extends HTMLTableElement implements IDraw {

    public static readonly MSG_ERROR_CONSTRUCTOR_CONFIG_REQUIRED = "Error: DataTable config is requiered to create table";
    public static readonly ROW_NUM_COLUMN = {
        data: 'rowNum',
        title: '#',
        type: 'rowNum',
        className: 'btn btn-success',
    };

    public static readonly EMPTY_ARRAY: Array<any> = [];

    readonly events = {
        KEYDOWN: 'keydown',
        CLICK:'click',
        CHANGE: 'change',
    }

    readonly keys = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        SUPR: 46,
        ENTER: 13,
        DELETE: 8,
    }

    readonly props = {
        DATA:'data',
        TITLE: 'title',
        ROW_NUM: 'rowNum',
        COLUMNS: 'columns',
        ROWS: 'rows',
        type: 'type',
        ROW_STATUS: 'rowStatus',
        HIDDEN: 'hidden',
    }

    readonly tags = {
        THEAD:'thead',
        TBODY: 'tbody',
        TFOOT: 'tfoot',
    }
    
    private thead: HTMLElement;
    private tbody: HTMLElement;
    private tfoot: HTMLElement;
    private config: ConfigDataTable;
    private rowsList: Array<DataTableRow>;

    constructor(config: ConfigDataTable){  
        super();
        if(!config) {
            throw new Error(DataTable.MSG_ERROR_CONSTRUCTOR_CONFIG_REQUIRED);
        } else {
            this.SetTags();
            this.SetConfig(config);
        }
        this.className = 'table';
    }
    

    public abstract Draw(): void 

    public abstract GetData(): void

    private SetTags(){
        this.thead = document.createElement(this.tags.THEAD);
        this.tbody = document.createElement(this.tags.TBODY);
        this.tfoot = document.createElement(this.tags.TFOOT);
        this.appendChild(this.thead);
        this.appendChild(this.tbody);
        this.appendChild(this.tfoot);
    }

    private SetConfig(config: ConfigDataTable){
        this.config = config;
    }

    public AddRow(row: DataTableRow):void{
        this.rowsList.push(row);
    }

    public GetRow(idx:number): any{
        var row: DataTableRow = null;
        if(idx < this.rowsList.length){
            row = this.rowsList[idx];
        }
        return row;
    }

    public GetRows():Array<DataTableRow>{
        return this.rowsList;
    }

    public Destroy(){
        this.rowsList = DataTable.EMPTY_ARRAY;
        this.thead.innerHTML = null;
        this.tbody.innerHTML = null;
        this.tfoot.innerHTML = null;
    }


    //Create table methods
    public AppendChildBody(row: DataTableRow){
        this.tbody.appendChild(row);
    }

    public AppendChildHead(row: DataTableRow){
        this.thead.appendChild(row);
    }

    public AppendChildFoot(row: DataTableRow){
        this.tfoot.appendChild(row);
    }


    //Configs
    public GetConfig(): ConfigDataTable {
        return this.config;
    }

    public GetConfigRows(){
        return this.config.GetRows();
    }

    public GetConfigColumns(){
        return this.config.GetColumns();
    }

    public GetConfigRowNum(): boolean{
        return this.config.GetRowNum();
    }    
}




