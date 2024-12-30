import { Functions } from "../Functions/Functions";
import { Config } from "./Config";

export class ConfigForm extends Config {

    /* public static ToConfigDataTable(config: ConfigForm): ConfigDataTable {
        var c: any = config.GetConfig();
        c.columns = c.fields;
        c.rows = [];
        var ret = new ConfigDataTable(c);
        return ret;
    } */

    private fields: Array<any>;
    private buttons: Array<any>;
    private filter: boolean;
    private floatingForm: boolean;
    private transformTable: boolean;
    private data: any;
    private pageLength: number;
    private addElements: boolean;
    private rowStatus: boolean;
    private formtype: string;

    constructor(config: any) {

        super(config);
        
        var fields: Array<any> = config.fields;
        var buttons: Array<any> = config.buttons;
        var filter: boolean = config.filter;
        var floatingForm: boolean = config.floatingForm;
        var transformTable: boolean = config.transformTable;
        var data: any = config.data;
        var pageLength: number = config.pageLength;
        var addElements: boolean = config.addElements;
        var rowStatus: boolean = config.rowStatus;
        var formtype: string = config.formtype;
        

        //Fields
        if( 
            !Functions.IsNullOrEmpty(fields) && 
            Array.isArray(fields) 
        ){
            this.SetFields(fields);
        }
        //Buttons
        if(
            !Functions.IsNullOrEmpty(buttons) && 
            Array.isArray(buttons) 
        ){
            this.SetButtons(buttons);
        }
        if(!Functions.IsNullOrEmpty(filter)){
            this.SetFilter(filter);
        } else {
            this.SetFilter(false);
        }
        if(!Functions.IsNullOrEmpty(floatingForm)){
            this.SetFloatingForm(floatingForm);
        } else {
            this.SetFloatingForm(false);
        }

        if(!Functions.IsNullOrEmpty(transformTable)){
            this.SetTransformTable(transformTable);
        }else{
            this.SetTransformTable(false);
        }

        if(!Functions.IsNullOrEmpty(data)){
            this.SetData(data);
        }else if(Array.isArray(data)){
            this.SetData([]);
        } else {
            this.SetData(null);
        }

        if(!Functions.IsNullOrEmpty(pageLength)){
            this.SetPageLength(pageLength);
        }else{
            this.SetPageLength(1);
        }
        if(!Functions.IsNullOrEmpty(rowStatus)){
            this.SetRowStatus(rowStatus);
        }else{
            this.SetRowStatus(false);
        }
        if(!Functions.IsNullOrEmpty(addElements)){
            this.SetAddElements(addElements);
        }else{
            this.SetAddElements(false);
        }
        if(!Functions.IsNullOrEmpty(formtype)){
            this.SetFormType(formtype);
        } else {
            this.SetFormType('single');
        }
    }

    //Getters
    public GetFields(): Array<any> {
        return this.fields;
    }
    public GetButtons(): Array<any> {
        return this.buttons;
    }
    public GetFilter(): boolean {
        return this.filter;
    }
    public GetFloatingForm(): boolean {
        return this.floatingForm;
    }
    public GetTransformTable(): boolean {
        return this.transformTable;
    }
    public GetData(): any {
        return this.data;
    }
    public GetPageLength(): number {
        return this.pageLength;
    }
    public GetRowStatus(): boolean {
        return this.rowStatus;
    }
    public GetAddElements(): boolean {
        return this.addElements;
    }
    public GetFormType(): string {
        return this.formtype;
    }

    //Setters
    private SetButtons(buttons: Array<any>): void {
        this.buttons = buttons;
    }
    private SetFields(fields: Array<any>): void {
        this.fields = fields;
    }
    public SetFilter(filter: boolean): void {
        this.filter = filter;
    }
    public SetFloatingForm(floatingForm: boolean): void {
        this.floatingForm = floatingForm;
    }
    private SetTransformTable(transformTable: boolean): void {
        this.transformTable = transformTable;
    }
    private SetData(data: any): void {
        this.data = data;
    }
    private SetPageLength(pageLength: number): void {
        this.pageLength = pageLength;
    }
    private SetRowStatus(rowStatus: boolean): void {
        this.rowStatus = rowStatus;
    }
    private SetAddElements(addElements: boolean): void {
        this.addElements = addElements;
    }
    private SetFormType(formtype: string): void {
        this.formtype = formtype;
    }
    

    /* public ToConfigDataTable(): ConfigDataTable {
        var ret: ConfigDataTable = ConfigForm.ToConfigDataTable(this);
        return ret;
    } */

}