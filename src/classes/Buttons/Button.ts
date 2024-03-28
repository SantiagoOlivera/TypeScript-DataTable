import { ConfigButton } from "../Config/ConfigButton";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";

export abstract class Button extends HTMLButtonElement implements IDraw {

    private config: ConfigButton;

    constructor(config: ConfigButton){
        super();
        this.SetConfig(config);

        console.log(this.config, this.config.GetId());

        this.id = this.config.GetId();
        this.className = this.config.GetClassName();

        this.SetClickEvent();
    }

    public GetConfig(): ConfigButton {
        return this.config;
    }

    private SetConfig(config: ConfigButton) {
        this.config = config;
    }

    private SetClickEvent(){
        var onclick: Function = this.config.GetOnClick();
        if(!Functions.IsNullOrEmpty(onclick)) {
            this.onclick = function(event: Event){
                onclick(event);
            }
        }
    }

    public abstract Draw(): void 

}