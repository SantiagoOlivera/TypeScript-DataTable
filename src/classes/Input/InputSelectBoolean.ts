import { Config } from "../Config/Config";
import { ConfigInput } from "../Config/ConfigInput";
import { Program } from "../Program/Program";
import { InputSelect } from "./InputSelect";
import { OptionSelect } from "./OptionSelect";

export class InputSelectBoolean extends InputSelect {
    constructor(config: ConfigInput) {
        super(config);
    }

    public SetClassName(): void {
        this.className = `${Program.classes.FORM_CONTROL_SMALL} ${Program.classes.INPUT_SELECT_BOOLEAN}`;
    }


    public SetOptions(): void {
        this.optionsList = [
            new OptionSelect('', ''),
            new OptionSelect('0', Program.language.defaults.boolean.falseText),
            new OptionSelect('1', Program.language.defaults.boolean.trueText),
        ]
    }

    public GetValue(): boolean {
        var ret: boolean = null;
        if(this.value === '0'){
            ret = false;
        } else if(this.value === '1') {
            ret = true;
        }
        return ret;
    }

    public SetValue(val: any): void {
        var ret: boolean = null;
        if(this.value === '0'){
            ret = false;
        } else if(this.value === '1') {
            ret = true;
        }
    }

}

window.customElements.define('input-select-boolean', InputSelectBoolean, { extends: 'select'});