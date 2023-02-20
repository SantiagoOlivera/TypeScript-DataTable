import { IRender } from "../Interfaces/IRender";

export abstract class IconCell extends HTMLElement implements IRender{
    constructor(){
        super();
    }

    public abstract Render(): void 
}
