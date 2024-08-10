import { Button } from "../Buttons/Button";
import { Functions } from "../Functions/Functions";
import { Config } from "./Config";

export class ConfigList extends Config {

    private buttons: Array<any>;
    
    constructor(config: any) {
        super(config);

        var buttons: Array<any> = config.buttons;
        if(!Functions.IsNullOrEmpty(buttons)){
            if(Functions.IsArray(buttons)){
                this.SetButtons(buttons);
            } else {
                this.SetButtons([]);
            }
        } else {
            this.SetButtons([]);
        }
        
    }

    public GetButtons(): Array<any> {
        return this.buttons;
    }

    private SetButtons(buttons: Array<any>): void {
        this.buttons = buttons;
    }
}