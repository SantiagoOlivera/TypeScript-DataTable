import { ConfigInput } from "../Config/ConfigInput";
import { IDraw } from "../Interfaces/IDraw";
import { InputButton } from "./InputButton";

export class InputButtonRowNum extends InputButton {
    constructor(config: ConfigInput){
        //html?: HTMLElement, str?: string
        super(config);
        this.onclick = this.SelectRow;
    }

    public SelectRow(){ 
        console.log("Select Row");
    }

}

window.customElements.define('input-button-row-num', InputButtonRowNum, { extends: 'button' });