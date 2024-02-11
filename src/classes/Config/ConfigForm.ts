import { Functions } from "../Functions/Functions";
import { Config } from "./Config";
import { ConfigDataTable } from "./ConfigDataTable";

export class ConfigForm extends Config {

    public static ToConfigDataTable(config: ConfigForm): ConfigDataTable {
        var c: any = config.GetConfig();
        c.columns = c.fields;
        c.rows = [];
        var ret = new ConfigDataTable(c);
        return ret;
    }

    private fields: Array<any>;
    private buttons: Array<any>;
    private filter: boolean;
    private floatingForm: boolean;
    private transformTable: boolean;

    

    constructor( config:any ) {

        super(config);
        
        var fields: Array<any> = config.fields;
        var buttons: Array<any> = config.buttons;
        var filter: boolean = config.filter;
        var floatingForm: boolean = config.floatingForm;
        var transformTable: boolean = config.transformTable;

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


    

    public ToConfigDataTable(): ConfigDataTable {
        var ret: ConfigDataTable = ConfigForm.ToConfigDataTable(this);
        return ret;
    }

}