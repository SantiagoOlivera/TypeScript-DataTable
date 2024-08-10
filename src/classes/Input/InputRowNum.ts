import { Button } from "../Buttons/Button";
import { ConfigButton } from "../Config/ConfigButton";
import { Form } from "../Form/Form";
import { IInput } from "../Interfaces/IInput";
import { Program } from "../Program/Program";

export class InputRowNum extends Button implements IInput {

    constructor(config: ConfigButton) {
        super(config);
    }

    public Draw(): void {
        
    }
    public GetHTMLElement(): HTMLElement {
        throw new Error("Method not implemented.");
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
    public IsEditable(): boolean {
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
        throw new Error("Method not implemented.");
    }
    
}