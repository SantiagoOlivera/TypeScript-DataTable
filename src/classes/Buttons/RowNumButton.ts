import { ConfigButton } from "../Config/ConfigButton";
import { Program } from "../Program/Program";
import { Button } from "./Button";

export class RowNumButton extends Button {

    private number: number;

    constructor(config: ConfigButton){
        super(config);
        this.className = Program.bootstrap.BUTTON_SUCCESS_SMALL;
    }
    public Draw(): void {
        this.innerHTML = this.GetConfig().GetIndex().toString();
    }
}

window.customElements.define('row-num-button', RowNumButton, { extends: 'button' });