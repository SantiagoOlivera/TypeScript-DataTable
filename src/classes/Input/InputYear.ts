import { ConfigInput } from "../Config/ConfigInput";
import { Form } from "../Form/Form";
import { Functions } from "../Functions/Functions";
import { Input } from "./Input";

export class InputYear extends Input {

    constructor(config: ConfigInput){
        super(config);
        this.onkeyup = () => {
            this.value.replace(/[^0-9\.]/g,'');
        }
        this.SetMaxLength();
    }

    private SetMaxLength(): void {
        this.maxLength = 4;
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
    public SetValue(value: any): void {
        if(
            !Functions.IsNullOrEmpty(value) && 
            Functions.IsNumber(value)
        ){
            this.value = value.toString();
        }
    }
    public GetValue() {
        var ret: number = null;
        if(
            !Functions.IsNullOrEmpty(this.value) && 
            Functions.IsNumber(this.value)
        ){
            ret = Number(this.value);
        }
        return ret;
    }
    public Draw(): void {
        throw new Error("Method not implemented.");
    }
    public Supr(): void {
        throw new Error("Method not implemented.");
    }
    public Disable(disabled: boolean): void {
        this.disabled = disabled;
    }
    public Hide(hidden: boolean): void {
        throw new Error("Method not implemented.");
    }
    public IsDisabled(): boolean {
        return this.disabled;
    }
    public IsHidden(): boolean {
        return this.hidden;
    }
    public GetForm(): Form {
        throw new Error("Method not implemented.");
    }
    public Empty(): void {
        throw new Error("Method not implemented.");
    }
    public GetText(): string {
        return this.GetValue().toString();
    }
    public IsEditable(): boolean {
        return this.GetConfig().GetEditable();
    }
    public SetDefault(): void {
        throw new Error("Method not implemented.");
    }
} 

window.customElements.define('input-year', InputYear, { extends: 'input'});