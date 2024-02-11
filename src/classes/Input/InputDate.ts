import IMask from 'imask';
import { Input } from "./Input";
import { ConfigInput } from '../Config/ConfigInput';
import { Functions } from '../Functions/Functions';

export class InputDate extends Input {

    private date: Date;
    //private format: string;
    private mask: any;
    
    private readonly EMPTY_STRING = '';
    private readonly props = {
        MASKED: 'masked',
        DATE: 'date',
    };

    private readonly sep = '  /  ';

    constructor(config: ConfigInput){
        super(config);
        var value: Date = config.GetValue();
        if(!Functions.IsNullOrEmpty(value)){
            this.SetValue(value);
        }else {
            this.SetValue(null);
        }
        this.SetChangeEvent();
        this.Draw();
    }

    private SetFormat(format: string): void{
        //this.format = format;
    }

    private GetFormat(): string{
        //return this.format;
        return '';
    }

    public Focus(): void {
        this.focus();
    }

    public IsFocusable(): boolean {
        return true;
    }

    public GetHTMLElement(): HTMLElement {
        return this;
    }

    public SetValue(value: Date): void {
        this.date = value;
    }

    public GetValue(): Date {
        return this.date;
    }

    public GetSep(): string{
        return this.sep;
    }

    public Draw(): void {

        const s = this.GetSep();

        const format = function(date: Date): string{
            
            var str: string = null;
            var day: any = date.getDate();
            var month: any = date.getMonth() + 1;
            var year: any = date.getFullYear();

            if (day < 10) day = "0" + day;
            if (month < 10) month = "0" + month;
            str = [day, month, year].join(s);
            

            return str;
        }

        const parse = function(str: string): Date{
            var val: Date = new Date();
            var yearMonthDay: Array<string> = str.split(s);

            var y: number = Number.parseInt(yearMonthDay[2]);
            var m: number = Number.parseInt(yearMonthDay[1]) - 1;
            var d: number = Number.parseInt(yearMonthDay[0]);
            var val: Date = new Date(y, m, d);

            return val;
        }
        
        const options = {
            mask: Date,
            //pattern: 'd{'+ s +'}`m{'+ s +'}`Y', 
            pattern: `d${s}m${s}Y`,
            blocks: {
                d: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: IMask.MaskedRange,
                    from: 1900,
                    to: 9999,
                }  
            },
            format: format,
            parse: parse,
            lazy: false,
        };

        this.mask = IMask(this, options);

        var val: Date = this.GetValue();
        if(val){
            this.value = format(val);
        }

        
    }

    public Supr(): void {
        this.value = this.EMPTY_STRING;
        this.SetValue(null);
    }

    public GetMask(){
        return this.mask;
    }
    
    private SetChangeEvent():void{
        this.addEventListener('change', function(e){
            var input = <InputDate>this;
            var mask: any = input.GetMask();
            var value: Date = mask[input.props.MASKED][input.props.DATE];
            input.SetValue(value);
            if(!value){
                input.Supr();
            }
            console.log(this,this.value, value);
        });
    }
    
    public Disable(disabled: boolean): void {
        this.disabled = disabled;
    }
    public Hide(hidden: boolean): void {
       this.hidden = hidden;
    }
    public IsDisabled(): boolean {
        return this.disabled;
    }
    public IsHidden(): boolean {
        return this.hidden;
    }
    

}

window.customElements.define('input-date', InputDate, { extends: 'input'});