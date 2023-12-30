import { IDraw } from "../Interfaces/IDraw";

export class ModalButton extends HTMLButtonElement implements IDraw{
    constructor(){
        super();
    }

    Draw(): void {
        throw new Error("Method not implemented.");
    }
}

window.customElements.define('input-button', ModalButton, { extends: 'button' });