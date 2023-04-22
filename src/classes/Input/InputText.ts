import { Input } from "./Input";

export class InputText extends Input{
    
    constructor(value?: string){
        super();
        this.SetValue(value);
        this.Draw();
    }

    public SetValue(value: string): void {
        this.value = '';
        if(value){
            this.value = value;
        }
    }
    public GetValue() {
        return this.value;
    }

    public Supr(): void {
        console.log("SPR");
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