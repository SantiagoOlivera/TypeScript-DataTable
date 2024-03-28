import { ConfigButton } from "../Config/ConfigButton";
import { Functions } from "../Functions/Functions";
import { Button } from "./Button";

export class IconButton extends Button {

    private icon: string;
    private sTitle: string;

    constructor(config: ConfigButton) {
        super(config);
        this.Draw();
    }

    public Draw(): void {
        
        var config: ConfigButton = this.GetConfig();

        var icon: string = config.GetIcon();
        var title: string = config.GetTitle();
        var className: string = config.GetClassName();
        var width: string = config.GetWidth() + 'px';
        var type: string = config.GetType();


        this.className = className;
        this.style.width = width;
        if(type === 'button'){
            this.type = 'button';
        }
        if(!Functions.IsNullOrEmpty(title)){
            this.innerHTML = `<i class="${icon}"></i> ${title}`;
        }else{
            this.innerHTML = `<i class="${icon}"></i>`;
        }
    }

}

window.customElements.define('icon-button', IconButton, { extends: 'button' });