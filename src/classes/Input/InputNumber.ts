import IMask from 'imask';
import { Input } from "./Input";


export class InputNumber extends Input{
    
    public static MSG_ERROR_NUMERIC_VALUE_INVALID: string = "Error: invalid numeric value";
    public static DEFAULT_DECIMALS: number = 0;
    public static DEFAULT_DECIMALS_SEPARATOR: string = ",";
    public static DEFAULT_THOUSAND_SEPARATOR: string = ".";
    //REGEX
    public static REGEX_ONLY_INT_NUMBER = new RegExp(/[^0-9]/g);
    public static REGEX_REMOVE_ZEROS_START = new RegExp(/^0+(?!$)/g);
    //public static REGEX_DECIMAL = new RegExp(/^\d*\.?\d*$/);
    //public static REGEX_DECIMAL = new RegExp(/[^0-9]*+{.}/g);
    //public static REGEX_DECIMAL = new RegExp(/[^0-9,]|(?<=\,,*)\,/g);
    public static REGEX_DECIMAL = new RegExp(/[0-9]+(\,[0-9]*)?/g);

    private numValue: number;
    private decimals: number;
    private decimalsSeparator: string;
    private thousandSeparator: string;
    
    constructor(
        value?: number, 
        decimals?: number, 
        decimalsSeparator?: string, 
        thousandSeparator?: string
    ){
        super();
        
        if(!decimals){
            decimals = InputNumber.DEFAULT_DECIMALS;
        }        
        
        if(!decimalsSeparator){
            decimalsSeparator = InputNumber.DEFAULT_DECIMALS_SEPARATOR;
        }

        if(!thousandSeparator){
            thousandSeparator = InputNumber.DEFAULT_THOUSAND_SEPARATOR
        }

        this.SetDecimals(decimals);
        this.SetThousandSeparator(thousandSeparator);
        this.SetDecimalsSeparator(decimalsSeparator);
        
        this.SetValue(value);
        /* var val: any = Number(Number(value).toFixed(decimals));
        if(value){
            if(!isNaN(val)) {
                this.SetValue(val);
                this.SetNumValue(val);
            }else{    
                throw new Error(InputNumber.MSG_ERROR_NUMERIC_VALUE_INVALID);
            }
        }
         */
        //this.SetValidateEvents();

        this.Draw();

    }

    private SetValidateEvents(){
/* 
        var decimals:number = this.GetDecimals();

        if(!decimals){
            this.addEventListener('input', function(event){
                var input: InputNumber = <InputNumber>event.target;
                var val: string = null;
                val = this.value.replace(InputNumber.REGEX_ONLY_INT_NUMBER, '').replace(InputNumber.REGEX_REMOVE_ZEROS_START, '');
                input.SetValue(val);
            })
        }else{
            this.addEventListener('input', function(event){
                var input: InputNumber = <InputNumber>event.target;
                var val: string = input.GetValue().toString();

                console.log(InputNumber.REGEX_DECIMAL.test(val))
                if(InputNumber.REGEX_DECIMAL.test(val)){
                    input.SetValue(val);
                }
            })
            this.addEventListener('change', function(event){
                var input: InputNumber = <InputNumber>event.target;
                var val: number = input.GetValue();
                input.SetValue(val.toString());
            });
        } */


    }

    private SetDecimals(decimals: number):void{
        this.decimals = decimals;
    }

    public GetDecimals(): number{
        return this.decimals;
    }

    private SetThousandSeparator(thousandSeparator: string){
        this.thousandSeparator = thousandSeparator;
    }

    public GetThousandSeparator(): string{
        return  this.thousandSeparator;
    }

    private SetDecimalsSeparator(sep: string):void{
        this.decimalsSeparator = sep;
    }

    public GetDecimalsSeparator(): string{
        return this.decimalsSeparator;
    }

    private SetNumValue(numValue: number):void{
        this.numValue = numValue;
    }

    public GetNumValue(): number{
        return this.numValue;
    }

    public SetValue(value: number): void {
        var val: string = '';
        if(value){
            val = value.toString().replace('.', this.GetDecimalsSeparator());
        }
        this.value = val;
    }

    public GetValue(): number{
        return this.GetNumValue();
    }

    public Draw(): void {

        var decimals: number = this.GetDecimals();
        var decimalsSeparator: string = this.GetDecimalsSeparator();
        var thousandsSeparator: string = this.GetThousandSeparator();
        
        debugger;
        IMask(this, {
            mask: Number, 
            scale: decimals,   
            radix: decimalsSeparator,
            thousandsSeparator: thousandsSeparator, 
        })

        /* this.value = '';
        var value = this.GetValue();
        if(value) {
            this.value = this.convertString(value);
        } */

    }

    public Supr(): void {
        this.SetValue(null);
    }

    public convertString(value: number): string {
        return value
                .toFixed(this.GetDecimals())
                .toString()
                .replace(InputNumber.DEFAULT_DECIMALS_SEPARATOR, this.GetDecimalsSeparator());
    }

    public GetHTMLElement(): HTMLElement {
        throw new Error("Method not implemented.");
    }

    public IsFocusable(): boolean {
        return true;
    }

    public Focus(): void {
        this.focus();
    }
    

}

window.customElements.define('input-number', InputNumber, { extends: 'input'});