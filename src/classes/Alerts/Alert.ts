import { IDraw } from "../Interfaces/IDraw";

export abstract class Alert extends HTMLDivElement implements IDraw {

    private messages: Array<string>;

    constructor() {
        super();
        this.Init();
    } 
    private Init(): void {
        this.messages = new Array<string>();
    }

    public Draw(): void {
        for(var i=0; i<this.messages.length; i++){
            var div: HTMLDivElement = document.createElement('div');
            div.innerHTML = this.messages[i];
            this.appendChild(div);
        }
    }

    public AddMessage(message: string): void {
        this.messages.push(message);
    }

    
}