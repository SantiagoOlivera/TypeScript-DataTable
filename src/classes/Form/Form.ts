import { ConfigForm } from "../Config/ConfigForm";
import { Program } from "../Program/Program";
import { Input } from "../Input/Input";
import { InputDate } from "../Input/InputDate";
import { InputNumber } from "../Input/InputNumber";
import { InputSelect } from "../Input/InputSelect";
import { InputText } from "../Input/InputText";
import { LiveSearchInput } from "../Input/LiveSearchInput";
import { IDraw } from "../Interfaces/IDraw";
import { IForm } from "../Interfaces/IForm";
import { Functions } from "../Functions/Functions";
import { Button } from "bootstrap";
import { ConfigButton } from "../Config/ConfigButton";
import { FormButton } from "../Buttons/FormButton";
import { ConfigInput } from "../Config/ConfigInput";
import { IInput } from "../Interfaces/IInput";
import { InputFilter } from "../Input/InputFilter";
import { InputYear } from "../Input/InputYear";
import { Config } from "../Config/Config";
import { FormEditable } from "./FormEditable";
import { ConfigDataTable } from "../Config/ConfigDataTable";

export abstract class Form extends HTMLFormElement implements IDraw, IForm, IInput {

    readonly props = {
        DISABLED: 'disabled',
        HIDDEN: 'hidden',
        DATA_INPUT: 'data-input',
    }

    readonly inputTypes = {
        TEXT: 'text',
        NUMBER: 'number',
        LIVE_SEARCH: 'liveSerach',
        SELECT: 'select',
        DATE: 'date',
        YEAR: 'year',
        FORM: 'form',
    }

    readonly classes = {
        WIDTH_100: 'w-100',
        FORM_FLOATING: 'form-floating',
        INVISIBLE: 'invisible',
    }

    private config: ConfigForm;
    private inputs: Array<IInput>;
    private buttons: Array<Button>;

    constructor(config: ConfigForm) {
        super();
        this.SetConfig(config);
        this.SetClassName(config.GetClassName());
        this.CreateInputs();
    }

    GetHTMLElement(): HTMLElement {
        throw new Error("Method not implemented.");
    }
    SetValue(value: any): void {
        throw new Error("Method not implemented.");
    }
    GetValue(): any {
        var ret: any = this.GetData();
        return ret;
    }
    Supr(): void {
        throw new Error("Method not implemented.");
    }
    IsFocusable(): boolean {
        throw new Error("Method not implemented.");
    }
    Focus(): void {
        throw new Error("Method not implemented.");
    }
    Disable(disabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    Hide(hidden: boolean): void {
        throw new Error("Method not implemented.");
    }
    IsDisabled(): boolean {
        throw new Error("Method not implemented.");
    }
    IsHidden(): boolean {
        throw new Error("Method not implemented.");
    }
    
    GetConfig(): Config {
        return this.config;
    }

    public GetData(): any {
        var ret: any = {};
        for(var i of this.inputs) {
            var data: string = i.GetConfig().GetName();
            var value: any = i.GetValue();
            ret[data] = value;
        }
        return ret;
    }

    public abstract Draw(): void 

    private SetClassName(className: string){
        this.className = className;
    }
    private SetConfig(config: ConfigForm):void{
        this.config = config;
    }

    
    /* public GetConfig(): ConfigForm {
        return this.config;
    } */


    public GetTitle(): HTMLElement {
        var ret: HTMLHeadingElement = document.createElement('h1');
        var t: string = this.config.GetTitle();
        if(!Functions.IsNullOrEmpty(t)){
            ret.innerHTML = t;
        }
        return ret;
    }

    public GetButtons(): Array<FormButton> {

        var ret: Array<FormButton> = new Array<FormButton>();
        var config: ConfigForm = this.config;
        var buttons: Array<any> = config.GetButtons(); 

        if(Array.isArray(buttons)){
            for(var b of buttons){
                var cb: ConfigButton = new ConfigButton(b);
                var button: FormButton = new FormButton(cb);
                var form = this;
                button.onclick = function(event){
                    var onclick =  cb.GetOnClick();
                    onclick(event, form);
                }
                ret.push(button);
            }
        }
        
        return ret;
    }

    public GetFilter(): HTMLElement {
        var ret: HTMLDivElement = document.createElement('div');
        var config: ConfigInput = new ConfigInput({
            type: 'text',
            disabled: false,
            value: '',
            placeholder: 'Filtrar',
        });
        var input: Input = new InputText(config);
        return ret;
    }


    private CreateInputs(): void {

        var fields: Array<any> = this.config.GetFields();
        var ret: Array<IInput> = [];
        
        this.inputs = new Array<IInput>();
        
        if(Array.isArray(fields)) {

            for(var f of fields){
            
                var input: IInput = null;
                var config: ConfigInput = new ConfigInput(f);
                var type: string = config.GetType();
    
                if(type === this.inputTypes.TEXT) {
                    input = new InputText(config);
                }else if(type === this.inputTypes.NUMBER){
                    input = new InputNumber(config);
                }else if(type === this.inputTypes.DATE){
                    input = new InputDate(config);
                }else if(type === this.inputTypes.LIVE_SEARCH){
                    input = new LiveSearchInput(config);
                }else if(type === this.inputTypes.SELECT){
                    input = new InputSelect(config);
                } else if(type ===  this.inputTypes.YEAR){
                    input = new InputYear(config);
                } else if(type === this.inputTypes.FORM) {
                    var cf: ConfigForm = new ConfigForm(f);
                    input = new FormEditable(cf);
                }
    
                //input.SetPlaceHolder(placeholder);
                if(input){
                    ret.push(input);
                }
            }
        }

        this.inputs = ret;

    }

    public GetInputs(): Array<IInput> {
        return this.inputs;
    }

    
    public AppendChild(e: any): void {
        this.appendChild(e);
    }

}