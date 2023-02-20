import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";

export abstract class Input extends HTMLInputElement implements IInput, IDraw {

    public readonly bootrapClasses = {
        FORM_CONTROL: 'form-control',
        DISPLAY_BLOCK: 'd-block',
        DISPLAY_NONE: 'd-none',
    }

    constructor(){
        super();
        this.type = 'text';
        this.classList.add(this.bootrapClasses.FORM_CONTROL);
    }

    public abstract GetHTMLElement(): HTMLElement 
    public abstract SetValue(value: any): void 
    public abstract GetValue(): any    
    public abstract Draw(): void
    public abstract Supr(): void 

}

