export class Functions {

    private static readonly types = {
        STRING: 'string',
        NUMBER: 'number',
        OBJECT: 'object',
        BOOLEAN: 'boolean',
    }

    public static IsNumber(val: any){
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
}