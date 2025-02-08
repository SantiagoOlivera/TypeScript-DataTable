import { Functions } from "../Functions/Functions";
import { DataTableRow } from "../Row/DataTableRow";
import { Config } from "./Config";
import { ConfigForm } from "./ConfigForm";
import { ConfigPagination } from "./ConfigPagination";
import { ConfigTable } from "./ConfigTable";

export class ConfigDataTable extends ConfigTable {

    public static ToConfigForm(config: ConfigDataTable): ConfigForm {
        var c: any = config.GetConfig();
        c.fields = c.columns;
        c.data = c.rows;
        var ret = new ConfigForm(c);
        return ret;
    }
    
    private rowNum: boolean;
    private resizableColumns: boolean;
    private headerText: string;
    private buttons: any;
    private rowStatus: boolean;
    private pagination: ConfigPagination;
    
    readonly props = {
        ROWS: 'rows',
        COLUMNS: 'columns',
        ROW_NUM: 'rowNum',
        BUTTONS: 'buttons',
        ROW_STATUS: 'rowStatus',
        RESIZABLE_COLUMNS: 'resizableColumns',
        HEADER_TEXT: 'headerText',
        RESIZE_COLUMNS: 'resizeColumns',
    }

    constructor(config: any) {
        super(config);

        var rowNum: boolean = false;
        if(config.rowNum){
            rowNum = true;
        }
        this.SetRowNum(rowNum);
        var resizableColums: boolean = config[this.props.RESIZABLE_COLUMNS]
        this.SetResizableColumns(resizableColums);
        var headerText: string = config[this.props.HEADER_TEXT];
        if(headerText){
            this.SetHeaderText(headerText);
        }
        var pagination: any = config.pagination;
        if(!Functions.IsNullOrEmpty(pagination)){
            var p: ConfigPagination = new ConfigPagination(pagination);
            this.SetPagination(p);
        }
        this.SetButtons(config[this.props.BUTTONS])
        this.SetRowStatus(config[this.props.ROW_STATUS]);

    }

    //Getters
    public GetResizableColumns(): boolean {
        return this.resizableColumns;
    }
    public GetRowNum(): boolean {
        return this.rowNum;
    }
    public GetRowStatus():boolean{
        return this.rowStatus;
    }
    public GetButtons(): any {
        return this.buttons;
    }
    public GetPagination(): ConfigPagination {
        return this.pagination;
    }


    //Setters
    private SetResizableColumns(resizableColumns: boolean):void{
        this.resizableColumns = resizableColumns;
    }
    private SetRowNum(rowNum: boolean){
        this.rowNum = rowNum;
    }
    private SetHeaderText(headerText: string): void{
        this.headerText = headerText;
    }
    public GetHeaderText(): string{
        return this.headerText;
    }
    private SetRowStatus(rowStatus:boolean):void{
        this.rowStatus = rowStatus;
    }
    private SetButtons(buttons: any):void{
        this.buttons = buttons;
    }
    private SetPagination(pagination: ConfigPagination):void {
        this.pagination = pagination;
    }

}
















/* export class ConfigDataTableReadOnly extends ConfigDataTable {
    constructor(config: any){
        super(config);
    }
} */

/* export class ConfigDataTableEditable extends ConfigDataTable {

    private buttons: any;
    private rowStatus: boolean;

    constructor(config: any){
        super(config);
        this.SetButtons(config[this.props.BUTTONS])
        this.SetRowStatus(config[this.props.ROW_STATUS]);
    }

    private SetRowStatus(rowStatus:boolean):void{
        this.rowStatus = rowStatus;
    }

    public GetRowStatus():boolean{
        return this.rowStatus;
    }

    public GetButtons(): any{
        return this.buttons;
    }

    private SetButtons(buttons: any):void{
        this.buttons = buttons;
    }
} */