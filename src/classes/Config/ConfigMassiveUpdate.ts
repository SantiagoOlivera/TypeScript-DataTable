import { Functions } from "../Functions/Functions";
import { Config } from "./Config";

export class ConfigMassiveUpdate extends Config {


    private enable: boolean;
    private onchange: Function;

    constructor(config: any) {
        super(config);
        
        var enable: boolean = config.enable;
        var onchange: Function = config.onchange;

        if(!Functions.IsNullOrEmpty(enable)){
            this.SetEnable(enable);
        } else {
            this.SetEnable(false);
        }
        if(!Functions.IsNullOrEmpty(onchange)){
            this.SetOnChange(onchange);
        } else {
            this.SetOnChange(null);
        }
        
        
    }

    public IsEnabled(): boolean {
        return this.enable;
    }
    public GetOnChange(): Function {
        return this.onchange;
    }
    private SetEnable(enable: boolean): void {
        this.enable = enable;
    }
    private SetOnChange(onchange: Function): void {
        this.onchange = onchange;
    }

}