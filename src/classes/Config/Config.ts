import { Functions } from "../Functions/Functions";

export class Config {
    
    private config: any;
    private id: string;
    private type: string;
    private title: string;
    private disabled: boolean;
    private hidden: boolean;
    private editable: boolean;
    private className: string;
    private name: string;
    private tooltip: string;

    constructor(config: any) {

        var id: string = config.id;
        var type: string = config.type;
        var title: string = config.title;
        var disabled: boolean = config.disabled;
        var hidden: boolean = config.hidden;
        var editable: boolean = config.editable;
        var className: string = config.className;
        var name: string = config.name;
        var tooltip: string = config.tooltip;

        if(!Functions.IsNullOrEmpty(config)){
            this.SetConfig(config);
        }
        if(!Functions.IsNullOrEmpty(id)){
            this.SetId(id);
        }
        if(!Functions.IsNullOrEmpty(type)){
            this.SetType(type);
        }
        if(!Functions.IsNullOrEmpty(title)){
            this.SetTitle(title);
        }
        if(!Functions.IsNullOrEmpty(disabled)){
            this.SetDisabled(disabled);
        }
        if(!Functions.IsNullOrEmpty(hidden)){
            this.SetHidden(hidden);
        }
        if(!Functions.IsNullOrEmpty(editable)){
            this.SetEditable(editable);
        }
        if(!Functions.IsNullOrEmpty(className)){
            this.SetClassName(className);
        }
        if(!Functions.IsNullOrEmpty(name)){
            this.SetName(name);
        }
        if(!Functions.IsNullOrEmpty(tooltip)){
            this.SetTooltip(tooltip);
        }
    }

    
    //Getters
    public GetConfig(): any {
        return this.config;
    }
    public GetId(): string {
        return this.id;
    }
    public GetTitle(): string {
        return this.title;
    }
    public GetType(): string {
        return this.type;
    }
    public GetDisabled(): boolean {
        return this.disabled;
    }
    public GetHidden(): boolean {
        return this.disabled;
    }
    public GetClassName(): string {
        return this.className;
    }
    public GetName(): string {
        return this.name;
    }
    public GetTooltip(): string {
        return this.tooltip;
    }

    //Setters
    private SetConfig(config: any){
        this.config = config;
    }
    private SetId(id: string): void {
        this.id = id;
    }
    private SetTitle(title: string): void {
        this.title = title;
    }
    public SetType(type: string): void {
        this.type = type;
    }
    private SetDisabled(disabled: boolean): void {
        this.disabled = disabled;
    }
    private SetHidden(hidden: boolean): void {
        this.hidden = hidden;
    }
    private SetEditable(editable: boolean): void {
        this.editable = editable;
    }
    private SetClassName(className: string): void {
        this.className = className;
    }
    private SetName(name: string): void {
        this.name = name;
    }
    private SetTooltip(tooltip: string): void {
        this.tooltip = tooltip;
    }

}