import { ConfigButton } from "../Config/ConfigButton";
import { Button } from "./Button";

export class PaginationButton extends Button {

    private text: string;
    private index: number;

    constructor(config: ConfigButton){
        super(config);
        
        this.text = this.GetConfig().GetText();
        this.index = this.GetConfig().GetIndex();

        this.Draw();
    }

    public Draw(): void {
        this.innerHTML = this.text;
    }

    public GetIndex(): number {
        return this.index;
    }

}

window.customElements.define('pagination-button', PaginationButton, { extends: 'button' });