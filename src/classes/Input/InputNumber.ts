import IMask from 'imask';
import { Input } from "./Input";
import { ConfigInput } from '../Config/ConfigInput';
import { Functions } from '../Functions/Functions';
import { Form } from '../Form/Form';


export class InputNumber extends Input {
    
    
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

        this.SetOnInput();
        this.InitMask();

        var value: number = config.GetValue();
        if(!Functions.IsNullOrEmpty(value)){
            this.SetValue(value);
        }else{
            this.SetValue(null);
        }

    }

    private SetOnInput(): void {
        var defualtValue: any = this.GetConfig().GetDefaultValue();
        if(!Functions.IsNullOrEmpty(defualtValue)) {
            this.addEventListener('change', function(event: Event){
                var input: InputNumber = <InputNumber>event.target;
                var value: any = input.GetValue();
                if(Functions.IsNullOrEmpty(value)){
                    input.SetValue(defualtValue);
                }
            });
        }
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
        if(!Functions.IsNullOrEmpty(value)){
            val = value
                .toFixed(this.GetDecimals())
                .replace('.', this.GetDecimalsSeparator());
        }

        this.value = val;
        if(!Functions.IsNullOrEmpty(this.mask)){
            this.mask.updateValue();
            this.value = this.mask._value;
        }

    }

    public GetValue(): number{
        var val: number = this.mask[this.props.MASKED][this.props.NUMBER];
        if(Functions.IsNullOrEmpty(this.value)){
            val = null;
        }
        //return this.GetNumValue();
        return val;
    }

    public GetMaxValue(): number {
        return this.maxValue;
    }
    public GetMinValue(): number{
        return this.minValue;
    }

    private InitMask() {

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
    }

    public Draw(): void {
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
        return this;
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
    public GetForm(): Form {
        throw new Error('Method not implemented.');
    }
    public Empty(): void {
        throw new Error('Method not implemented.');
    }
    public GetText(): string {
        return this.value;
    }
    public IsEditable(): boolean {
        return this.GetConfig().GetEditable();
    }
    public SetDefault(): void {
        this.SetValue(0);
    }
    
}

window.customElements.define('input-number', InputNumber, { extends: 'input'});