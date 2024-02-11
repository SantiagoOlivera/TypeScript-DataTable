import { ConfigButton } from "../Config/ConfigButton";
import { ConfigInput } from "../Config/ConfigInput";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";

export class InputButton extends HTMLButtonElement implements IDraw, IInput {
    
    private html: HTMLElement;
    private str: string;
    private config: ConfigInput;

    constructor(config: ConfigInput) {
        //html?: HTMLElement, str?: string
        super();
        this.SetConfig(config);
        //this.className = 'btn btn-success';
        var className: string = config.GetClassName();
        var title: string = config.GetTitle();

        this.className = className;
        if(!Functions.IsNullOrEmpty(title)){

        }
        /* if(!Functions.IsNullOrEmpty()){

        } */
        /* if(html){
            this.SetHtml(html);
        }
        if(str){
            this.SetStr(str);
        } */
        this.Draw();
    }
    
    private SetConfig(config: ConfigInput): void {
        this.config = config;
    }

    public GetConfig(): ConfigInput {
        return this.config;
    }
    
    GetHTMLElement(): HTMLElement {
        return this;
    }

    SetValue(value: any): void {
        throw new Error("Method not implemented.");
    }
    GetValue() {
        return this.GetStr();
    }
    Supr(): void {
        throw new Error("Method not implemented.");
    }


    Draw(): void {
        var html: HTMLElement = this.GetHtml();
        if(html){
            this.appendChild(html);
        } else {
            this.innerHTML = this.GetStr();
        }
    }

    private SetHtml(html: HTMLElement):void{
        this.html = html;
    }

    private GetHtml():HTMLElement{
        var text: string = this.GetStr();
        if(text){
            if(this.html){
                this.html.innerHTML = text;
            }
        }
        return this.html;
    }

    private SetStr(str: string):void {
        this.str = str;
    }

    private GetStr(): string{
        return this.str;
    }

    Focus(): void {
        this.focus();
    }

    IsFocusable(): boolean {
       return true;
    }

    public Disable(disabled: boolean): void {
        this.disabled = disabled;
    }
    public Hide(hidden: boolean): void {
       this.hidden = hidden;
    }
    public IsDisabled(): boolean {
        return this.disabled;
    }
    public IsHidden(): boolean {
        return this.hidden;
    }
    

}

window.customElements.define('input-button', InputButton, { extends: 'button' });