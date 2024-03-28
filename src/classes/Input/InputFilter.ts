import { ConfigInput } from "../Config/ConfigInput";
import { Form } from "../Form/Form";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { Input } from "./Input";
import { InputText } from "./InputText";

export class InputFilter extends HTMLDivElement implements IInput, IDraw {

    private config: ConfigInput;
    private input: InputText;

    constructor(config: ConfigInput){
        super();
        this.SetConfig(config);
        this.Draw();
    }
    
    

    public Draw(): void {
        this.className = this.config.GetClassName();
        this.input = new InputText(this.config);
        this.appendChild(this.input);
    }

    public GetInput(): Input {
        return this.input;
    }


    private SetConfig(config: ConfigInput){
        this.config = config;
    }

    public GetHTMLElement(): HTMLElement {
        return this;
    }
    SetValue(value: any): void {
        throw new Error("Method not implemented.");
    }
    GetValue() {
        throw new Error("Method not implemented.");
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
    GetConfig(): ConfigInput {
        throw new Error("Method not implemented.");
    }
    Empty(): void {
        throw new Error("Method not implemented.");
    }
    GetForm(): Form {
        throw new Error("Method not implemented.");
    }

}

window.customElements.define('input-filter', InputFilter, { extends: 'div' });