import { Functions } from "../Functions/Functions";
import { Config } from "./Config";

export class ConfigTable extends Config {

    public static readonly MSG_ERROR_CONFIG_REQUIRED = 'Error: Config DataTable config is required';
    public static readonly MSG_ERROR_CONFIG_ROWS_REQUIRED = 'Error: Config DataTable config rows are required';
    public static readonly MSG_ERROR_CONFIG_COLUMNS_REQUIRED = 'Error: Config DataTable config columns are required';

    private rows: Array<any>;
    private columns: Array<any>;

    constructor(config: any){
        if(Functions.IsNullOrEmpty(config)) {
            throw new Error(ConfigTable.MSG_ERROR_CONFIG_REQUIRED);
        }else if(!config.rows){
            throw new Error(ConfigTable.MSG_ERROR_CONFIG_ROWS_REQUIRED);
        }else if(!config.columns){
            throw new Error(ConfigTable.MSG_ERROR_CONFIG_COLUMNS_REQUIRED);
        }
        super(config);
        this.SetRows(config.rows);
        this.SetColumns(config.columns);
    }

    //Getters
    public GetRows(){
        return this.rows;
    }
    public GetColumns(){
        return this.columns;
    }
    //Setters
    private SetRows(rows: Array<any>){
        this.rows = rows;
    }
    private SetColumns(columns: Array<any>){
        this.columns = columns;
    }
    
}