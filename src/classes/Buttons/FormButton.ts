import { ConfigButton } from "../Config/ConfigButton";
import { Button } from "./Button";

export class FormButton extends Button {

    constructor(config: ConfigButton){
        super(config);
        this.type = "button";
        this.Draw();
    }

    public Draw(): void {
        var config: ConfigButton = this.GetConfig();
        var icon: string = config.GetIcon();
        var title: string = config.GetTitle();
        this.style.width = "150px";
        this.innerHTML = `<i class="${icon}"></i> ${title}`;
    }
}

window.customElements.define('form-button', FormButton, { extends: 'button' });