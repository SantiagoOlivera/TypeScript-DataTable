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


    public static IsString(val: any){
        var ret: boolean = false;
        if(typeof val === this.types.STRING){
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
            if(val.length === 0){
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

}