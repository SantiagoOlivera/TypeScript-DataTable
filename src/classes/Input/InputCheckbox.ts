import { Config } from "../Config/Config";
import { ConfigInput } from "../Config/ConfigInput";
import { Form } from "../Form/Form";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { Input } from "./Input";

export class InputCheckbox extends HTMLDivElement implements IInput, IDraw {

    private config: ConfigInput;
    private checkbox: CheckBox;
    private label: HTMLLabelElement;

    constructor(config: ConfigInput){
        super();
        this.SetConfig(config);
        this.SetClassName();
        this.SetCheckbox();
        this.SetLabel(); 
        this.Draw(); 
    }
    

    private SetConfig(config: ConfigInput):void {
        this.config = config;
    }
    public SetClassName(): void {
        this.className = 'form-check';
    }
    private SetCheckbox(): void {
        this.checkbox = new CheckBox();
        this.checkbox.SetInput(this);
    }
    private SetLabel(): void {
        this.label = document.createElement('label');
        this.label.className = 'form-check-label';
        this.label.setAttribute('for', this.GetConfig().GetId());
        this.label.innerHTML = this.GetConfig().GetLabel();
    }
    public Draw(): void {
        this.appendChild(this.checkbox);
        this.appendChild(this.label);
    }
    public GetHTMLElement(): HTMLElement {
        return this;
    }
    public SetValue(value: any): void {
        //throw new Error("Method not implemented.");
        if(!Functions.IsNullOrEmpty(value) && 
            Functions.IsBoolean(value)
        ) {
            this.checkbox.SetValue(value);
        } else {
            this.checkbox.SetValue(false);
        }
    }
    public GetValue() {
        return this.checkbox.GetValue();
    }
    public Supr(): void {
        throw new Error("Method not implemented.");
    }
    public IsFocusable(): boolean {
        return this.checkbox.IsFocusable();
    }
    public Focus(): void {
        this.checkbox.focus();
    }
    public Disable(disabled: boolean): void {
        this.checkbox.Disable(disabled);
    }
    public Hide(hidden: boolean): void {
        
    }
    public IsDisabled(): boolean {
        return this.checkbox.IsDisabled();
    }
    public IsHidden(): boolean {
        return false;
    }
    public IsEditable(): boolean {
        return this.GetConfig().GetEditable();
    }
    public GetConfig(): ConfigInput {
        return this.config;
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
    public SetDefault(): void {
        this.checkbox.SetDefault();
    }
}

window.customElements.define('input-checkbox', InputCheckbox, { extends: 'div' } );


class CheckBox extends HTMLInputElement implements IInput {

    private input: IInput;

    constructor(){
        super();
        this.SetType();
        this.SetClassName();
    }

    public SetInput(input: IInput): void {
        this.input = input;
    }
    public GetInput(): IInput {
        return this.input;
    }
    private SetClassName(): void {
        this.className = 'form-check-input';
    }

    private SetType(): void {
        this.type = 'checkbox';
    }

    public GetHTMLElement(): HTMLElement {
        return <HTMLElement><unknown>this.input;
    }
    public SetValue(value: any): void {
        this.checked = value;
    }
    public GetValue() {
        return this.checked;
    }
    public Supr(): void {
        this.checked = !this.checked;
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
        throw new Error("Method not implemented.");
    }
    public IsDisabled(): boolean {
        return this.disabled;
    }
    public IsHidden(): boolean {
        throw new Error("Method not implemented.");
    }
    public IsEditable(): boolean {
        throw new Error("Method not implemented.");
    }
    public GetConfig(): Config {
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
    public SetDefault(): void {
        this.SetValue(false);
    }

}

window.customElements.define('check-box', CheckBox, { extends: 'input' } );