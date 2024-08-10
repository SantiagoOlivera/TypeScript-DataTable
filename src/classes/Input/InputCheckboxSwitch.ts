import { ConfigInput } from "../Config/ConfigInput";
import { InputCheckbox } from "./InputCheckbox";

export class InputCheckboxSwitch extends InputCheckbox {
    constructor(config: ConfigInput){
        super(config);
    }
    public SetClassName(): void {
        this.className = 'form-check form-switch';
    }
}

window.customElements.define('input-checkbox-swtich', InputCheckboxSwitch, { extends: 'div' } );