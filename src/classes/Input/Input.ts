import { ConfigInput } from "../Config/ConfigInput";
import { Form } from "../Form/Form";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";
import { IFocusable } from "../Interfaces/IFocusable";
import { IInput } from "../Interfaces/IInput";
import { Program } from "../Program/Program";

export abstract class Input extends HTMLInputElement implements IInput, IDraw {

    public readonly bootrapClasses = {
        FORM_CONTROL: 'form-control',
        FORM_CONTROL_SM: 'form-control-sm',
        DISPLAY_BLOCK: 'd-block',
        DISPLAY_NONE: 'd-none',
    }

    private config: ConfigInput;

    constructor(config: ConfigInput){
        super();
        this.SetConfig(config);
        this.SetType();
        this.SetPlaceHolder(config.GetPlaceHolder());
        //this.SetClassName();
        this.SetStyle();
        this.classList.add(this.bootrapClasses.FORM_CONTROL);
        this.classList.add(this.bootrapClasses.FORM_CONTROL_SM);
    }
    

    public abstract GetHTMLElement(): HTMLElement 
    public abstract SetValue(value: any): void 
    public abstract GetValue(): any    
    public abstract Draw(): void
    public abstract Supr(): void 
    public abstract Disable(disabled:boolean): void 
    public abstract Hide(hidden:boolean): void 
    public abstract IsDisabled(): boolean 
    public abstract IsHidden(): boolean 
    public abstract IsEditable(): boolean 
    public abstract Empty(): void 
    public abstract GetForm(): Form
    public abstract GetText(): string 
    public abstract SetDefault(): void
    public abstract IsFocusable(): boolean
    public abstract Focus(): void
    

    
    public GetConfig() : ConfigInput {
        return this.config;
    }
    public GetPlaceHolder(): string {
        return this.placeholder;
    }

    private SetConfig(config: ConfigInput):void {
        this.config = config;
    }
    private SetType(): void {
        this.type = 'text';
    }
    
    private SetPlaceHolder(text: string){
        var t: string = '';
        if(!Functions.IsNullOrEmpty(text)) {
            t = text;
        }
        this.placeholder = t;
    }

    
    private SetStyle(): void {
        var maxWidth: string = this.GetConfig().GetMaxWidth() + 'px';
        var minWidth: string = this.GetConfig().GetMinWidth() + 'px';
        var align: string = this.GetConfig().GetAlign();
        if(!Functions.IsNullOrEmpty(maxWidth)){
            this.style.maxWidth = maxWidth;
        }
        if(!Functions.IsNullOrEmpty(minWidth)){
            this.style.minWidth = minWidth;
        }
        if(align === 'left'){
            this.style.textAlign = 'left';
        } else if( align === 'center' ){
            this.style.textAlign = 'center';
        } else if( align === 'right' ){
            this.style.textAlign = 'right';
        }
    }

}

