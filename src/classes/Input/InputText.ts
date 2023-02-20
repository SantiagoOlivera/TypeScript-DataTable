import { Input } from "./Input";

export class InputText extends Input{
    public GetHTMLElement(): HTMLElement {
        throw new Error("Method not implemented.");
    }

    constructor(value: string){
        super();
        this.SetValue(value);
        this.Draw();
    }

    public SetValue(value: string): void {
        this.value = value;
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

    
}

window.customElements.define('input-text', InputText, { extends: 'input'});