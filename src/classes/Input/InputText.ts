import { ConfigInput } from "../Config/ConfigInput";
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
        if(!Functions.IsNullOrEmpty(value)){
            var maxLength: number = this.GetConfig().GetMaxLength();
            v = value;
            if(!Functions.IsNullOrEmpty(maxLength)){
                if(value.length > maxLength) {
                    v = value.substring(0, maxLength);
                    console.log(v, maxLength);
                }
            }
        }
        this.value = v;
    }
    public GetValue() {
        return this.value;
    }

    public Supr(): void {
        //console.log("SPR");
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
        throw new Error("Method not implemented.");
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

window.customElements.define('input-text', InputText, { extends: 'input'});