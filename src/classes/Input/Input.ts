import { ConfigInput } from "../Config/ConfigInput";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";

export abstract class Input extends HTMLInputElement implements IInput, IDraw {

    public readonly bootrapClasses = {
        FORM_CONTROL: 'form-control',
        DISPLAY_BLOCK: 'd-block',
        DISPLAY_NONE: 'd-none',
    }

    private config: ConfigInput;

    constructor(config: ConfigInput){
        super();
        this.SetConfig(config);
        this.SetType('text');
        this.SetPlaceHolder(config.GetPlaceHolder());
        this.SetMaxLength(config.GetMaxLength());
        this.classList.add(this.bootrapClasses.FORM_CONTROL);
    }

    

    public abstract Focus(): void 
    public abstract IsFocusable(): boolean 
    public abstract GetHTMLElement(): HTMLElement 
    public abstract SetValue(value: any): void 
    public abstract GetValue(): any    
    public abstract Draw(): void
    public abstract Supr(): void 
    public abstract Disable(disabled:boolean): void 
    public abstract Hide(hidden:boolean): void 
    public abstract IsDisabled(): boolean 
    public abstract IsHidden(): boolean 

    
    public GetConfig() : ConfigInput {
        return this.config;
    }
    public GetPlaceHolder(): string {
        return this.placeholder;
    }

    private SetConfig(config: ConfigInput):void {
        this.config = config;
    }
    private SetType(type: string): void{
        this.type = type;
    }
    private SetMaxLength(maxLength: number): void{
        if(!Functions.IsNullOrEmpty(maxLength)){
            this.maxLength = maxLength;
        }
    }
    private SetPlaceHolder(text: string){
        var t: string = '';
        if(!Functions.IsNullOrEmpty(text)) {
            t = text;
        }
        this.placeholder = t;
    }

}

