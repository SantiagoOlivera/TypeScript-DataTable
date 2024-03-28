import { Functions } from "../Functions/Functions";

export class ConfigPagination {

    private config: any;
    private length: number;

    constructor(config: any) {
        
        var length: number = config.length;
        
        if(!Functions.IsNullOrEmpty(config)){
            this.SetConfig(config);
        }
        if(!Functions.IsNullOrEmpty(length)){
            this.SetLength(length);
        }

    }

    //Getters
    public GetConfig(): any {
        return this.config;
    }
    public GetLength(): number {
        return this.length;
    }

    public GetQuantityByPage(quantity: number): number {
        var ret = 0; 
        var length: number = this.GetLength();
        if(quantity > 0){
            ret = Number( ( quantity / length ).toFixed(0) );
        }
        return ret;
    }


    //Setters
    private SetConfig(config: any): void {
        this.config = config;
    }
    private SetLength(length: number): void {
        this.length = length;
    }
    
}