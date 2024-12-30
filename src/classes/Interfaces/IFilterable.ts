import { Config } from "../Config/Config";
import { Functions } from "../Functions/Functions";

export interface IFilterable {
    Filter(filters: Array<Filter>): any;
    GetFilters(): Array<Filter>;
    GetConfig(): Config;
    IsFiltered(): boolean;
}

export class Filter {

    private id: string;
    private value: any;

    constructor(id: string, value: any) {
        if(!Functions.IsNullOrEmpty(value)){
            this.id = id;
            this.value = value;
        } else {
            throw("Invalid filter");
        }
    }

    public GetId(): string {
        return this.id;
    }

    public GetValue(): any {
        return this.value;
    }


    public static ObjectToFiltersArray(data: any): Array<Filter> {
        var ret: Array<Filter> = new Array<Filter>();
        if(!Functions.IsNullOrEmpty(data)) {
            if(Functions.IsObject(data)) {
                var keys = Object.keys(data);
                for(var k of keys) {
                    var filter: Filter = null;
                    var value: any = data[k];
                    if(!Functions.IsNullOrEmpty(value)) {
                        if(Functions.IsDate(value)) {
                            filter = new Filter(k, value);
                        } else if(Functions.IsObject(value)) {
                            if(!Functions.IsEmptyObject(value)){
                                filter = new Filter(k, value);
                            }
                        } else {
                            filter = new Filter(k, value);
                        }
                    }
                    if(filter !== null){
                        ret.push(filter);
                    }
                }
            }
        }
        return ret;
    }

    public static FilterData(data: Array<any>, filters: Array<Filter>): Array<any> {
        var ret: Array<any> = new Array<any>();
        var d: Array<any> = data;
        var i: number = 0;
        var hasData: boolean = true;
        while(i < filters.length && hasData){
            var f: Filter = filters[i];
            d = d.filter( e => { 
                var ret: boolean = false;
                var value: any = e[f.GetId()];
                ret = Functions.IsEquals(value, f.GetValue());
                return ret;
            });
            console.log(f, d);
            if(d.length === 0) {
                hasData = false;
            }
            i++;
        }
        ret = d;
        return ret;
    }

}