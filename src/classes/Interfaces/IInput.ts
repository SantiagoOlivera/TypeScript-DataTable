export interface IInput{
    GetHTMLElement(): HTMLElement
    SetValue(value: any): void
    GetValue(): any
    Supr():void;
    IsFocusable(): boolean
    Focus(): void
}