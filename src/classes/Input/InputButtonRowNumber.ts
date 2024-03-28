import { ConfigInput } from "../Config/ConfigInput";
import { Row } from "../Row/Row";
import { InputButton } from "./InputButton";

export class InputButtonRowNumber extends InputButton {

    private row: Row;

    constructor( config: ConfigInput ) {
        super(config);
        this.addEventListener('click', function( event: Event ){
            var btn: InputButtonRowNumber = <InputButtonRowNumber>event.target;
            btn.GetRow().Select();
            event.stopPropagation();
        });
    }

    public SetRow(row: Row): void {
        this.row = row;
    }

    public GetRow(): Row {
        return this.row;
    }

}

window.customElements.define('input-button-row-num', InputButtonRowNumber, { extends: 'button' });