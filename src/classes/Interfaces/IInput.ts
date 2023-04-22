export interface IInput{
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
}