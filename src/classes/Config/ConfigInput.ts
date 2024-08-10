import { Functions } from "../Functions/Functions";
import { Config } from "./Config";
import { ConfigForm } from "./ConfigForm";

export class ConfigInput extends Config {

    private static ToConfigForm(config: ConfigInput): ConfigForm {
        var c: any = Functions.CloneObject(config.GetConfig());
        c.data = Functions.CloneObject(c.value);
        var ret: ConfigForm = new ConfigForm(c);
        return ret;
    }

    private readonly defaults = {
        THOUSAND_SEPARATOR: '.',
        DECIMALS_SEPARATOR: ',',
        EMPTY_STRING: '',
    }

    private data: string;
    private options: Array<any>;
    private decimals: number;
    private thousandSeparator: string; 
    private decimalsSeparator: string;
    private defaultValue: any;
    private value: any;
    private apiUrl: string;
    private maxLength: number;
    private minLength: number;
    private label: string;
    private placeholder: string;
    private maxValue: number;
    private minValue: number;
    private onclick: Function;
    private allowEmpty: boolean;
    
    
    
    constructor(config: any) {
        super(config);
        
        var data: string = config.data;
        var options: Array<any> = config.options;
        var decimals: number = config.decimals;
        var thousandSeparator: string = config.thousandSeparator;
        var decimalsSeparator: string = config.decimalsSeparator;
        var defaultValue: any = config.defaultValue;
        var value: any = config.value;
        var apiUrl: string = config.apiUrl;
        var maxLength: number = config.maxLength;
        var minLength: number = config.minLength;
        var label: string = config.label;
        var placeholder: string = config.placeholder;
        var maxValue: number = config.maxValue;
        var minValue: number = config.minValue;
        var onclick: Function = config.onclick;
        var allowEmpty: boolean = config.allowEmpty;

        if(!Functions.IsNullOrEmpty(data)){
            this.SetData(data);
        }
        if(!Functions.IsNullOrEmpty(options)){
            this.SetOptions(options);
        }
        if(!Functions.IsNullOrEmpty(decimals)){
            this.SetDecimals(decimals)
        }
        if(!Functions.IsNullOrEmpty(thousandSeparator)){
            this.SetThousandSeparator(thousandSeparator);
        }else{
            this.SetThousandSeparator(this.defaults.THOUSAND_SEPARATOR);
        }
        if(!Functions.IsNullOrEmpty(decimalsSeparator)){
            this.SetDecimalsSeparator(decimalsSeparator);
        }else{
            this.SetDecimalsSeparator(this.defaults.DECIMALS_SEPARATOR);
        }
        if(!Functions.IsNullOrEmpty(defaultValue)){
            this.SetDefaultValue(defaultValue);
        }else{
            this.SetDefaultValue(null);
        }
        if(!Functions.IsNullOrEmpty(value)){
            this.SetValue(value);
        }else{
            this.SetValue(null);
        }
        if(!Functions.IsNullOrEmpty(apiUrl)){
            this.SetApiUrl(apiUrl);
        }else{
            this.SetApiUrl(null);
        }
        if(!Functions.IsNullOrEmpty(maxLength)){
            this.SetMaxLength(maxLength);
        }else{
            this.SetMaxLength(null);
        }
        if(!Functions.IsNullOrEmpty(minLength)){
            this.SetMinLength(minLength);
        }else{
            this.SetMinLength(null);
        }
        if(!Functions.IsNullOrEmpty(label)){
            this.SetLabel(label);
        }else{
            this.SetLabel(null);
        }
        if(!Functions.IsNullOrEmpty(placeholder)){
            this.SetPlaceHolder(placeholder);
        }else{
            this.SetPlaceHolder(this.defaults.EMPTY_STRING);
        }
        if(!Functions.IsNullOrEmpty(maxValue)){
            this.SetMaxValue(maxValue);
        }else{
            this.SetMaxValue(null);
        }
        if(!Functions.IsNullOrEmpty(minValue)){
            this.SetMinValue(minValue);
        }else{
            this.SetMinValue(null);
        }
        if(!Functions.IsNullOrEmpty(onclick)){
            this.SetOnClick(onclick);
        }else{
            this.SetOnClick(null);
        }
        if(!Functions.IsNullOrEmpty(allowEmpty)){
            this.SetAllowEmpty(allowEmpty);
        }else{
            this.SetAllowEmpty(true);
        }
    }

    public ToConfigForm(): ConfigForm {
        var ret: ConfigForm = ConfigInput.ToConfigForm(this);
        return ret;
    }

    //Getters
    public GetData(): string {
        return this.data;
    }
    public GetOptions() : Array<any> {
        return this.options;
    }
    public GetDecimals():number {
        return this.decimals;
    }
    public GetThousandSeparator():string {
        return this.thousandSeparator;
    }
    public GetDecimalsSeparator():string {
        return this.decimalsSeparator;
    }
    public GetDefaultValue():any {
        return this.defaultValue;
    }
    public GetValue():any {
        return this.value;
    }
    public GetApiUrl(): string {
        return this.apiUrl;
    }
    public GetMaxLength(): number {
        return this.maxLength;
    }
    public GetMinLength(): number {
        return this.minLength;
    }
    public GetLabel(): string {
        return this.label;
    }
    public GetPlaceHolder(): string {
        return this.placeholder;
    }
    public GetMaxValue(): number {
        return this.maxValue;
    }
    public GetMinValue(): number{
        return this.minValue;
    }
    public GetOnClick(): Function {
        return this.onclick;
    }
    public GetAllowEmpty(): boolean {
        return this.allowEmpty;
    }

    //Setters
    private SetData(data: string):void {
        this.data = data;
    }
    private SetOptions(options: Array<any>):void{
        this.options = options;
    }
    private SetDecimals(decimals:number):void{
        this.decimals = decimals;
    }
    private SetThousandSeparator(thousandSeparator:string):void{
        this.thousandSeparator = thousandSeparator;
    }
    private SetDecimalsSeparator(decimalsSeparator:string):void{
        this.decimalsSeparator = decimalsSeparator;
    }
    private SetDefaultValue(defualtValue: any):void {
        this.defaultValue = defualtValue;
    }
    public SetValue(value: any):void {
        this.value = value;
    }
    private SetApiUrl(apiUrl: string):void {
        this.apiUrl = apiUrl;
    }
    private SetMaxLength(maxLength: number) :void {
        this.maxLength = maxLength;
    }
    private SetMinLength(minLength: number) :void {
        this.minLength = minLength;
    }
    private SetLabel(label: string): void {
        this.label = label;
    }
    private SetPlaceHolder(placeholder: string): void{
        this.placeholder = placeholder;
    }
    private SetMaxValue(maxValue: number): void{
        this.maxValue = maxValue;
    }
    private SetMinValue(minValue: number): void{
        this.minValue = minValue;
    }
    private SetOnClick(onclick: Function): void{
        this.onclick = onclick;
    }
    private SetAllowEmpty(allowEmpty: boolean): void {
        this.allowEmpty = allowEmpty;
    }
    
}