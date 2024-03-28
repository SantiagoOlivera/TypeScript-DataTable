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
        LIVE_SEARCH: 'livesearch',
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
    private data: any;
    private index: number;
    private isMainForm: boolean;

    constructor(config: ConfigForm) {
        super();
        this.SetConfig(config);
        this.SetData(config.GetData());
        this.SetIndex(0);
        this.SetClassName(config.GetClassName());
        this.CreateInputs();
    }
    
    public GetForm(): Form {
        throw new Error("Method not implemented.");
    }

    /* private SetIsMainForm(isMainForm: boolean): void{
        this.isMainForm = isMainForm;
    }

    public IsMainForm(): boolean {
        return this.isMainForm;
    } */

    private SetData(data: Array<any>): void {
        this.data = data;
    }

    public SetIndex(index: number): void {
        this.index = index;
    }

    public GetIndex(): number {
        return this.index;
    }

    public Data(): any {
        return this.data;
    }


    public GetHTMLElement(): HTMLElement {
        throw new Error("Method not implemented.");
    }

    public SetValue(value: any): void {
        if(!Functions.IsNullOrEmpty(value)){
            var inputs: Array<IInput> = this.GetInputs();
            for(var i of inputs){
                var name: string = i.GetConfig().GetName();
                var v: any = value[name];
                i.SetValue(v);
            }
        }else{
            this.Empty();
        }
    }
    public GetValue(): any {
        var ret: any = this.GetData();
        return ret;
    }
    public Supr(): void {
        throw new Error("Method not implemented.");
    }
    public IsFocusable(): boolean {
        throw new Error("Method not implemented.");
    }
    public Focus(): void {
        throw new Error("Method not implemented.");
    }
    public Disable(disabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    public Hide(hidden: boolean): void {
        throw new Error("Method not implemented.");
    }
    public IsDisabled(): boolean {
        throw new Error("Method not implemented.");
    }
    public IsHidden(): boolean {
        throw new Error("Method not implemented.");
    }
    
    public GetConfig(): Config {
        return this.config;
    }

    public Empty(): void {
        var inputs: Array<IInput> = this.GetInputs();
        for(var i of inputs){
            i.SetValue(null);
        }
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
                var form: Form = this;
    
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
                    f.data = null;
                    
                    var cf: ConfigForm = new ConfigForm(f);
                    input = new FormEditable(cf);
                }

                //input.SetPlaceHolder(placeholder);
                if(input){
                    ret.push(input);
                    input.GetForm = function(): Form {
                        return form;
                    }
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


    public SetFormData(idx: number): void {
        //var cf: ConfigForm = <ConfigForm>this.GetConfig();
        //var data: any = cf.GetData();
        var data: any = this.Data();
        if(!Functions.IsNullOrEmpty(data)){
            var inputs: Array<IInput> = this.GetInputs();
            console.log("data", data, inputs);
            if(Functions.IsObject(data)) {
                for(var i of inputs){
                    var name: string = i.GetConfig().GetName();
                    var val: any = data[name];
                    i.SetValue(val);
                }
            }else if(Array.isArray(data)){
                if(data.length > 0){
                    if(!Functions.IsNumber(idx)){
                        idx = 0;
                    }
                    var d: any = data[idx];
                    for(var i of inputs){
                        var name: string = i.GetConfig().GetName();
                        var val: any = d[name];
                        i.SetValue(val);
                    }
                }                
            }
        }
    }

}