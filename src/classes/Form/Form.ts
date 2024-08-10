import { ConfigForm } from "../Config/ConfigForm";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";


export abstract class Form extends HTMLFormElement implements IDraw, IInput {

    private config: ConfigForm;
    public containers: Array<HTMLDivElement> = new Array<HTMLDivElement>();
    public header: HTMLDivElement;
    public body: HTMLDivElement;
    public footer: HTMLDivElement;

    constructor(config: ConfigForm) {
        super();
        this.SetConfig(config);
    }
    public GetConfig(): ConfigForm {
        return this.config;
    }
    private SetConfig(config: ConfigForm): void {
        this.config = config;
    }
    public abstract Draw(): void;
    public abstract GetHTMLElement(): HTMLElement
    public abstract SetValue(value: any): void
    public abstract GetValue(): any
    public abstract Supr():void;
    public abstract Disable(disabled:boolean):void
    public abstract Hide(hidden:boolean):void
    public abstract IsDisabled():boolean
    public abstract IsHidden():boolean
    public abstract IsEditable(): boolean
    public abstract Empty(): void
    public abstract GetForm(): Form
    public abstract GetText(): string
    public abstract SetDefault(): void 
    public abstract IsFocusable(): boolean
    public abstract Focus(): void

    public AppendChild(e: any): void {
        this.appendChild(e);
    }
}