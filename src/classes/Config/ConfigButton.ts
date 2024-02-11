import { Functions } from "../Functions/Functions";
import { Config } from "./Config";

export class ConfigButton extends Config {

    private readonly defaults = {
        TYPE: 'button',
    }

    private data: string;
    private icon: string;
    private onclick: Function;
    private width: string;

    constructor(config: any) {
        super(config);
        
        var data: string = config.data;
        var type: string = config.type;
        var icon: string = config.icon;
        var onclick: Function = config.onclick;
        var width: string = config.width;

        if(!Functions.IsNullOrEmpty(data)){
            this.SetData(data);
        }
        if(Functions.IsNullOrEmpty(type)){
            this.SetType(this.defaults.TYPE);
        }
        if(!Functions.IsNullOrEmpty(icon)){
            this.SetIcon(icon);
        }
        if(!Functions.IsNullOrEmpty(onclick)){
            this.SetOnClick(onclick);
        }
        if(!Functions.IsNullOrEmpty(width)){
            this.SetWidth(width);
        }

    }

    //Getters
    public GetData(): string{
        return this.data;
    }
    public GetIcon(): string{
        return this.icon;
    }
    public GetOnClick(): Function{
        return this.onclick;
    }
    public GetWidth(): string{
        return this.width;
    }

    //Setters
    private SetData(data: string): void {
        this.data = data;
    }
    private SetIcon(icon: string): void {
        this.icon = icon;
    }
    private SetOnClick(onClick: Function): void {
        this.onclick = onClick;
    }
    private SetWidth(width: string): void{
        this.width = width;
    }
}