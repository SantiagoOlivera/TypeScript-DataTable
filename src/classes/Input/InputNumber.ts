import IMask from 'imask';
import { Input } from "./Input";
import { ConfigInput } from '../Config/ConfigInput';
import { Functions } from '../Functions/Functions';


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

    private readonly props = {
       MASKED: 'masked', 
       NUMBER: 'number',
    }

    private numValue: number;
    private decimals: number;
    private decimalsSeparator: string;
    private thousandSeparator: string;
    private mask: any;
    private minValue: number;
    private maxValue: number; 

    
    constructor(config: ConfigInput) {
        super(config);

        var decimals: number = config.GetDecimals();
        if(!Functions.IsNullOrEmpty(decimals)){
            this.SetDecimals(decimals);
        }else{
            decimals = InputNumber.DEFAULT_DECIMALS;
        }

        var decimalsSeparator: string = config.GetDecimalsSeparator();
        if(!Functions.IsNullOrEmpty(decimalsSeparator)){
            this.SetDecimalsSeparator(decimalsSeparator);
        }else {
            this.SetDecimalsSeparator(InputNumber.DEFAULT_DECIMALS_SEPARATOR);
        }

        var thousandSeparator: string = config.GetThousandSeparator();
        if(!Functions.IsNullOrEmpty(thousandSeparator)){
            this.SetThousandSeparator(thousandSeparator);
        }else{
            this.SetThousandSeparator(InputNumber.DEFAULT_THOUSAND_SEPARATOR);
        }

        var minValue: number = config.GetMinValue();
        if(!Functions.IsNullOrEmpty(minValue)){
            this.SetMinValue(minValue);
        }
        var maxValue: number = config.GetMaxValue();
        if(!Functions.IsNullOrEmpty(maxValue)){
            this.SetMaxValue(maxValue);
        }

        var value: number = config.GetValue();
        if(!Functions.IsNullOrEmpty(value)){
            this.SetValue(value);
        }else{
            this.SetValue(null);
        }
        

        this.Draw();

    }

    private SetMaxValue(maxValue: number): void{
        this.maxValue = maxValue;
    }
    private SetMinValue(minValue: number): void{
        this.minValue = minValue;
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
        var val: number = this.mask[this.props.MASKED][this.props.NUMBER];
        //return this.GetNumValue();
        return val;
    }

    public GetMaxValue(): number {
        return this.maxValue;
    }
    public GetMinValue(): number{
        return this.minValue;
    }

    public Draw(): void {

        var decimals: number = this.GetDecimals();
        var decimalsSeparator: string = this.GetDecimalsSeparator();
        var thousandsSeparator: string = this.GetThousandSeparator();
        
        this.mask = IMask(this, {
            mask: Number, 
            scale: decimals,   
            radix: decimalsSeparator,
            thousandsSeparator: thousandsSeparator, 
            signed: true,
            normalizeZeros: true,
            padFractionalZeros: true,
            min: this.minValue,
            max: this.maxValue,
        });

        /* this.addEventListener('change', function(event){
            debugger;
            var input = <InputNumber>event.target;
            var ds: string = input.GetDecimalsSeparator();
            var decimals: number = input.GetDecimals();

            var split = input.value.toString().split(ds);

            if(split.length > 1){
                var sl = split[1].length;
                if(sl !== decimals){
                    input.value = split[0] + ds + split[1].padEnd(decimals ,'0');
                }
                
            }
        }); */
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

window.customElements.define('input-number', InputNumber, { extends: 'input'});