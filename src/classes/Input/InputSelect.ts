import { ConfigInput } from "../Config/ConfigInput";
import { Form } from "../Form/Form";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { Program } from "../Program/Program";
import { Input } from "./Input";
import { OptionSelect } from "./OptionSelect";

export class InputSelect extends HTMLSelectElement implements IInput, IDraw {

    private readonly HTML_OPTION: string = 'option';

    public optionsList: Array<OptionSelect>;
    private opt: string;
    private config: ConfigInput;
    
    constructor(config: ConfigInput){
        super();
        this.SetConfig(config);
        this.SetClassName();
        this.SetOptions();
        this.Draw();
    }
    
    
    public GetForm(): Form {
        throw new Error("Method not implemented.");
    }
    public Empty(): void {
        this.SetValue(null);
    }

    public GetConfig(): ConfigInput {
        return this.config;
    }

    private SetConfig(config: ConfigInput): void{
        this.config = config;
    }

    public SetClassName(): void {
        this.className = `${Program.classes.FORM_CONTROL_SMALL}`;
    }
    
    public GetHTMLElement(): HTMLElement {
        return this;
    }

    public Draw(): void {
        for(var o of this.optionsList) {
            var opt: HTMLOptionElement = <HTMLOptionElement>document.createElement(this.HTML_OPTION);
            var value: string = o.GetValue();
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
        var val: string = '';
        if(!Functions.IsNullOrEmpty(value)) {
             var opt: OptionSelect = this.optionsList.find( e => { return e.GetValue() === value; });
             if(!Functions.IsNullOrEmpty(opt)){
                val = value;
             } else if(!this.GetConfig().GetAllowEmpty()) {
                val = this.GetConfig().GetDefaultValue();
             }
        } else {
            if(this.GetConfig().GetAllowEmpty()){
                val = '';
            } else {
                val = this.GetConfig().GetDefaultValue();
            }
        }
        this.value = val;
    }

    public GetValue(): any {
        var ret: string = null;
        if(!Functions.IsNullOrEmpty(this.value)) {
            ret = this.value;
        }
        return ret;
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

    public SetOptions():void {
        this.optionsList = new Array<OptionSelect>();
        var options: Array<any> = this.GetConfig().GetOptions();
        if(!Functions.IsNullOrEmpty(options)){
            if(Functions.IsArray(options)) {
                for(var o of options) {
                    this.optionsList.push(new OptionSelect(o.id, o.text));
                }
                var exists = this.optionsList.find(e => { return e.GetValue() === ''; });
                var allowEmpty: boolean = this.GetConfig().GetAllowEmpty();
                if(Functions.IsNullOrEmpty(exists) && allowEmpty) {
                    this.optionsList.unshift(new OptionSelect('', ''));
                } else if(!Functions.IsNullOrEmpty(exists) && !allowEmpty) {
                    var index = this.optionsList.indexOf(exists);
                    if(index !== Program.defaults.NOT_FOUND){
                        this.optionsList.splice(index, 1);
                    }
                }
            }
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
    public GetText(): string {
        var ret: string = '';
        var option = this.optionsList.find( o => { return o.GetValue() === this.opt; })
        if(!Functions.IsNullOrEmpty(option)){
            ret = option.GetDescription();
        }
        return ret;
    }
    public IsEditable(): boolean {
        return this.GetConfig().GetEditable();
    }
    public SetDefault(): void {
        var val: string = '';
        var allowEmpty: boolean = this.GetConfig().GetAllowEmpty();
        var defaultValue: string = this.GetConfig().GetDefaultValue();
        var options: Array<OptionSelect> = this.GetOptions();
        
        if(!Functions.IsNullOrEmpty(defaultValue)){
            val = defaultValue;
        } else if(options.length > 0 && !allowEmpty) {
            val = options[0].GetValue();
        } 

        this.SetValue(val);
    }
}

window.customElements.define('input-select', InputSelect, { extends: 'select'});



