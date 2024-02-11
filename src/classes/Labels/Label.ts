import { IDraw } from "../Interfaces/IDraw";

export abstract class Label extends HTMLLabelElement implements IDraw {
    
    private text: string;

    constructor() {
        super();
    }

    public abstract Draw(): void


    

    public SetText(text: string){
        this.text = text;
    }

    public GetText(): string{
        return this.text;
    }

}