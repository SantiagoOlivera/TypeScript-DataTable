import { Input } from "../Input/Input";
import { IDraw } from "../Interfaces/IDraw";
import { IForm } from "../Interfaces/IForm";

export abstract class Form extends HTMLFormElement{

    constructor() {
        super();
    }

    /* public abstract SetData(data: any): void
    public abstract GetData(): any
    public abstract DisableAll(disabled: boolean): void 
    public abstract Disable(name: string, disabled: boolean): void 
    public abstract Hide(name: string, hide: boolean): void 
    public abstract Draw(): void  */

}