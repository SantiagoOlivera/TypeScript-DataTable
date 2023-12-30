export interface IForm {
    SetData(data: any): void;
    GetData(): any;
    DisableAll(disabled: boolean): void;
    Disable(name: string, disabled: boolean): void;
    Hide(name: string, hide: boolean): void;
}