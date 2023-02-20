import { IDraw } from "../Interfaces/IDraw";
import { InputButton } from "./InputButton";

export class InputButtonRowNum extends InputButton {
    constructor(html?: HTMLElement, str?: string){
        super(html,str);
        this.onclick = this.SelectRow;
    }

    public SelectRow(){ 
        console.log("Select Row");
    }

}

window.customElements.define('input-button-row-num', InputButtonRowNum, { extends: 'button' });