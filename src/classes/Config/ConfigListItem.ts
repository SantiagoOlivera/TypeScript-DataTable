import { Functions } from "../Functions/Functions";
import { Config } from "./Config";

export class ConfigListItem extends Config {

    private htmlelement: HTMLElement;

    constructor(config: any) {
        super(config);
        var htmlelement: HTMLElement = config.htmlelement;
        if(!Functions.IsNullOrEmpty(htmlelement)){
            this.SetHTMLElement(htmlelement);
        }
    }

    private SetHTMLElement(element: HTMLElement): void {
        this.htmlelement = element;
    }

    public GetHTMLElement(): HTMLElement {
        return this.htmlelement;
    }
}