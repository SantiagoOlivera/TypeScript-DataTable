import { ConfigInput } from "../Config/ConfigInput";
import { Form } from "../Form/Form";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { Program } from "../Program/Program";
import { Input } from "./Input";
import { OptionSelect } from "./OptionSelect";

export class InputSelect extends HTMLSelectElement implements IInput, IDraw{

    private readonly HTML_OPTION: string = 'option';

    private optionsList: Array<OptionSelect>;
    private opt: string;
    private config: ConfigInput;
    
    constructor(config: ConfigInput){
        super();
        
        var className: string = config.GetClassName() + ' ' + Program.classes.FORM_CONTROL_SMALL;
        var opt: string = config.GetValue();

        this.SetConfig(config);


        if(Functions.IsNullOrEmpty(opt)){
            opt = null;
        }
        var options: Array<any> = config.GetOptions();
        var opts: Array<OptionSelect> = [];
        if(!Functions.IsNullOrEmpty(options)){
            for(var o of options) {
                opts.push(new OptionSelect(o.id, o.text))
            }
        }

        
        this.SetClassName(className);
        this.SetOptions(opts);
        this.SetOpt(opt);


        this.Draw();

    }
    public GetForm(): Form {
        throw new Error("Method not implemented.");
    }
    public Empty(): void {
        throw new Error("Method not implemented.");
    }

    public GetConfig(): ConfigInput {
        return this.config;
    }

    private SetConfig(config: ConfigInput): void{
        this.config = config;
    }

    private SetClassName(className:string):void{
        this.className = className;
    }
    
    public GetHTMLElement(): HTMLElement {
        return this;
    }

    public Draw(): void {

        for(var o of this.optionsList){

            var opt: HTMLOptionElement = <HTMLOptionElement>document.createElement(this.HTML_OPTION);

            var value: string =  o.GetValue();
            opt.value = value;
            opt.innerHTML = o.GetDescription();
            
            //console.log("VALUE OPT:" + opt.value, "VALUE:" + this.GetValue());

            if(value === this.GetOpt()){
                opt.selected = true;
            }

            this.appendChild(opt);
        }

    }
    
    public SetValue(value: string): void {
        /* for(var o of this.options){
            var optVal: string = o.getAttribute('value');
            if(value === optVal){
                this.SetOpt(optVal);
                o.selected = true;
            }
        } */
    }

    public GetValue(): string {
        return this.value;
    }

    public Supr(): void {
        throw new Error("Method not implemented.");
    }

    private SetOpt(opt: string): void{
        this.opt = opt;
    }

    public GetOpt(): string{
        return this.opt;
    }

    private SetOptions(options: Array<OptionSelect>):void{
        this.optionsList = new Array<OptionSelect>();
        if(options){
            this.optionsList = options;
        }
    }

    public GetOptions():Array<OptionSelect>{
        return this.optionsList;
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

window.customElements.define('input-select', InputSelect, { extends: 'select'});