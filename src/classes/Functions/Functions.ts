import { Form } from "../Form/Form";
import { LiveSearchOption } from "../Input/LiveSearchInput";

export class Functions {

    private static readonly types = {
        STRING: 'string',
        NUMBER: 'number',
        OBJECT: 'object',
        BOOLEAN: 'boolean',
    }

    public static readonly keycodes = {
        KEY_UP: 38,
        KEY_DOWN: 40,
    }

    public static CloneObject(data: any): any {
        var ret: any = null;
        var data: any 
        if(this.IsArray(data)){
            ret = data.map((o: any) => ( {...o} ));
        }else if(this.IsObject(data)){
            ret = {...data};
        }
        return ret;
    }

    public static IsArray(val: any){
        var ret: boolean = false;
        if(Array.isArray(val)){
            ret = true;
        }
        return ret;
    }

    public static IsObject(val: any): boolean {
        var ret: boolean = false;
        if(
            !Array.isArray(val) && 
            typeof val === this.types.OBJECT
        ) {
            ret = true;
        }
        return ret;
    }


    public static IsString(val: any): boolean {
        var ret: boolean = false;
        if(typeof val === this.types.STRING){
            ret = true;
        }
        return ret;
    }

    public static IsBoolean(val: any): boolean {
        var ret: boolean = false;
        if(typeof val === this.types.BOOLEAN){
            ret = true;
        }
        return ret;
    }

    public static IsNumber(val: any): boolean {
        var ret: boolean = false;
        if(typeof val === this.types.NUMBER){
            ret = true;
        }else if(typeof val === this.types.STRING){
            if(val.length > 0){
                var n = Number(val);
                if(!isNaN(n)){
                    ret = true;
                }
            }
        }
        return ret;
    }

    public static IsNullOrEmpty(val: any): boolean {
        var ret: boolean = false;
        if(val === null || val === undefined){
            ret = true;
        } else if (typeof val === this.types.STRING) {
            if(val.trim().length === 0){
                ret = true;
            }
        } else if(Array.isArray(val)){
            if(val.length === 0){
                ret = true;
            }
        } else if(val instanceof Date) {
            if(isNaN(val.getTime())){
                ret = true;
            }
        } else if (typeof val === this.types.OBJECT) {
            var keys: Array<String> = Object.keys(val);
            if(keys.length === 0){
                ret = true;
            }
        }

        return ret;
    }

    public static ParseNumber( val: any , force: boolean): number {
        var ret: number = null;
        var isValid: boolean = true;
        if(!this.IsNullOrEmpty(val) ){
            try{
                ret = Number(val);
            }catch{
                if(force) {
                    try{
                        var split = val.toString().split('');
                        var i = 0;
                        var number = '';
                        while(i < split.length){
                            var s = split[i];
                            if(
                                this.IsNumber(s) || 
                                (  s === '.' && !number.includes('.') )
                            ){
                                number += s;
                            }
                            i++;
                        }
                        ret = Number(number);
                    } catch {

                    }
                } else {
                    isValid = false;
                }
            }
        }

        if(!isValid){
            throw('Error: Invalid value');
        }
        return ret;
    }


    public static ToStringDate(
        date: Date, 
        format: string
    ): string {
        var ret: string = '';
        if(!this.IsNullOrEmpty(date) && 
            date instanceof Date
        ){
            if(format == 'dd/MM/yyyy'){
                ret = `${date.getDate().toString().padStart(2,'0')}/${(date.getMonth() + 1).toString().padStart(2,'0')}/${date.getFullYear()}`;
            } else if(format == 'd/M/yyyy'){
                ret = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
            } else {
                ret = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            }    
        }
        return ret;
    }


    public static StringFormat(str: string , ...vals: string[]) : string {
        var ret: string = '';
        for(var i = 0; i < vals.length; i++){
            var val: string = vals[i];
            if(!this.IsNullOrEmpty(val)){
                str.replace(`{${i}}`, val);
            }
        }
        
        ret = str;

        return ret;
    }


    
    
    public static ParseStringToDate(str: string): Date {
        const sep = '  /  ';
        var ret: Date = null;
        if(!this.IsNullOrEmpty(str)){
            var yearMonthDay: Array<string> = str.split(sep);

            var y: number = Number.parseInt(yearMonthDay[2]);
            var m: number = Number.parseInt(yearMonthDay[1]) - 1;
            var d: number = Number.parseInt(yearMonthDay[0]);

            ret = new Date(y, m, d);
        }
        return ret;
    }

    public static FormatDateToString(date: Date): string {
        const sep = '  /  ';
        var ret: string = `__${sep}__${sep}____`;
        if(!Functions.IsNullOrEmpty(date)){
            var day: any = date.getDate();
            var month: any = date.getMonth() + 1;
            var year: any = date.getFullYear();
            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month;
            ret = [day, month, year].join(sep);
        }
        return ret;
    }

    public static IsLiveSearchOption(opt: any): boolean {
        var ret: boolean = false;
        if(opt instanceof LiveSearchOption){
            ret = true;
        } else if(Functions.IsObject(opt)) {
            var keys: number = Object.keys(opt).length;
            if(keys === 2){
                if( opt.hasOwnProperty('id') && 
                    opt.hasOwnProperty('text')
                ){
                    ret = true;
                }
            }
        }
        return ret;
    }


    public static IsObjectModifided(oldVal: any, newVal: any): boolean{ 
        var ret: boolean = false;
        if(this.IsObject(oldVal) && this.IsObject(newVal)){
            var keys1: Array<string> = Object.keys(oldVal)
            var keys2: Array<string> = Object.keys(newVal);
            if(keys1.length === keys2.length){
                var i = 0;
                while(i < keys1.length && !ret){
                    var k: string = keys1[i];
                    if(oldVal.hasOwnProperty(k) && newVal.hasOwnProperty(k)){
                        if(
                            this.IsObject(oldVal[k]) && 
                            this.IsObject(newVal[k]) &&  
                            !this.IsNullOrEmpty(oldVal[k]) &&
                            !this.IsNullOrEmpty(newVal[k])
                        ) {
                            ret = this.IsObjectModifided(oldVal[k], newVal[k]);
                        } else if(oldVal[k] !== newVal[k]){
                            ret = true;
                        }
                    } else {
                        ret = true;
                    }
                    i++;
                }
            } else {
                ret = true;
            }
        }
        return ret;
    }

    public static AddSizes(...vals: string[]): number {
        var ret: number = 0;
        var val: number = 0;
        for(var v of vals){
            val = Number(v.replace('px', ''));
            ret += val;
        }
        return ret;
    }

    public static GetForm( config: Object ): Form {
        var ret: Form = null;
        
        return ret;
    }


}