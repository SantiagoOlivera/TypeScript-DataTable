import { Config } from "../Config/Config";
import { Form } from "../Form/Form";

export interface IInput {
    GetHTMLElement(): HTMLElement
    SetValue(value: any): void
    GetValue(): any
    Supr():void;
    IsFocusable(): boolean
    Focus(): void
    Disable(disabled:boolean):void
    Hide(hidden:boolean):void
    IsDisabled():boolean
    IsHidden():boolean
    IsEditable(): boolean
    GetConfig(): Config
    Empty(): void
    GetForm(): Form
    GetText(): string
    SetDefault(): void
}