import { IDraw } from "../Interfaces/IDraw";

export abstract class Button extends HTMLButtonElement implements IDraw {

    constructor(){
        super();
        this.type = 'button';
    }

    public abstract Draw(): void 

}