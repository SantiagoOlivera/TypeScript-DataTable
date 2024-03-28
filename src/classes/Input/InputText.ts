import { ConfigInput } from "../Config/ConfigInput";
import { Form } from "../Form/Form";
import { Functions } from "../Functions/Functions";
import { Input } from "./Input";

export class InputText extends Input {
    

    private readonly defaults = {
        EMPTY_STRING: '',
    }
    
    constructor(config: ConfigInput){
        super(config);
        var value: string = config.GetValue();
        this.SetValue(value);
        this.Draw();
    }

    public SetValue(value: string): void {
        var v: string = '';
        var p: string = this.GetConfig().GetPrefix();
        var s: string = this.GetConfig().GetSuffix();
        if(!Functions.IsNullOrEmpty(value)){
            var maxLength: number = this.GetConfig().GetMaxLength();
            v = value;
            if(!Functions.IsNullOrEmpty(maxLength)){
                if(value.length > maxLength) {
                    v = value.substring(0, maxLength);
                }
            }
        }
        
        if(!Functions.IsNullOrEmpty(p)){
            v = p + v;
        }
        if(!Functions.IsNullOrEmpty(s)){
            v = v + s;
        }

        this.value = v;
    }
    public GetValue() {
        return this.value;
    }

    public Supr(): void {
        this.SetValue('');
    }

    public Draw(): void {
        this.value = this.GetValue();
    }

    public IsFocusable(): boolean {
        return true;
    }

    public Focus(): void {
        this.focus();
    }

    public GetHTMLElement(): HTMLElement {
        return this;
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
        throw new Error("Method not implemented.");
    }
    public Empty(): void {
        throw new Error("Method not implemented.");
    }
}

window.customElements.define('input-text', InputText, { extends: 'input'});