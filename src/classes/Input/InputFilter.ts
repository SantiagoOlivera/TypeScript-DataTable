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
    public SetValue(value: any): void {
        throw new Error("Method not implemented.");
    }
    public GetValue() {
        throw new Error("Method not implemented.");
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
    public GetConfig(): ConfigInput {
        throw new Error("Method not implemented.");
    }
    public Empty(): void {
        throw new Error("Method not implemented.");
    }
    public GetForm(): Form {
        throw new Error("Method not implemented.");
    }
    public GetText(): string {
        throw new Error("Method not implemented.");
    }
    public IsEditable(): boolean {
        return this.GetConfig().GetEditable();
    }
    public SetDefault(): void {
        throw new Error("Method not implemented.");
    }
}

window.customElements.define('input-filter', InputFilter, { extends: 'div' });