import { Button } from "../Buttons/Button";
import { Config } from "../Config/Config";
import { ConfigList } from "../Config/ConfigList";
import { Factory } from "../Factory/Factory";
import { Program } from "../Program/Program";
import { List } from "./List";

export class ListButtons extends List {
    

    private buttons: Array<Button>;

    constructor(config: ConfigList) {
        super(config);
        this.SetButtons();
        this.Draw();
    }


    private SetButtons(): void {
        var btns: Array<any> = this.GetConfig().GetButtons();
        this.buttons = Factory.GetButtons(btns);
    }

    public Draw(): void {
        this.innerHTML = '';
        for(var b of this.buttons){
            this.appendChild(b);
        }
    }

    public GetButtons(): Array<Button> {
        return this.buttons;
    }

}

window.customElements.define('list-buttons', ListButtons, { extends: 'ul' });

