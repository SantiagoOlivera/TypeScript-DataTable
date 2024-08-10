import { ConfigButton } from "../Config/ConfigButton";
import { Form } from "../Form/Form";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";

export abstract class Button extends HTMLButtonElement implements IDraw {

    private config: ConfigButton;

    constructor(config: ConfigButton){
        super();
        this.SetConfig(config);
        this.SetId();
        this.SetClassName();
        this.SetClickEvent();
    }

    private SetId(): void {
        this.id = this.GetConfig().GetId();
    }

    private SetClassName(): void {
        this.className = this.GetConfig().GetClassName();
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

    public static GetForm( config: Object ): Form {
        var ret: Form = null;
        
        return ret;
    }

}