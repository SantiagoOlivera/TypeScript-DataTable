import { ConfigButton } from "../Config/ConfigButton";
import { ConfigInput } from "../Config/ConfigInput";
import { Form } from "../Form/Form";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { Program } from "../Program/Program";

export class InputButton extends HTMLButtonElement implements IDraw, IInput {
    
    private html: HTMLElement;
    private str: string;
    private config: ConfigInput;

    constructor(config: ConfigInput) {
        //html?: HTMLElement, str?: string
        super();
        this.SetConfig(config);

        var className: string = Program.bootstrap.BUTTON_SUCCESS_SMALL;
        var title: string = config.GetTitle();
        var value: any = config.GetValue();
        var innerHTML: string = config.GetInnerHTML();

        this.className = className;
        if(!Functions.IsNullOrEmpty(value)){

        }

        if(!Functions.IsNullOrEmpty(innerHTML)){
            var html: string = this.GetConfig().GetInnerHTML();
            this.append(html);
        }
        
        this.Draw();
    }

    public GetForm(): Form {
        throw new Error("Method not implemented.");
    }
    private SetConfig(config: ConfigInput): void {
        this.config = config;
    }
    public GetConfig(): ConfigInput {
        return this.config;
    }
    public GetHTMLElement(): HTMLElement {
        return this;
    }
    public SetValue(value: any): void {
        
    }
    public GetValue() {
        return this.GetStr();
    }
    public Supr(): void {
        throw new Error("Method not implemented.");
    }
    public Draw(): void {
        /* var html: string = this.GetConfig().GetInnerHTML();
        if(html){
            this.append(html);
        } else {
            this.innerHTML = this.GetStr();
        } */
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

    private SetStr(str: string): void {
        this.str = str;
    }

    private GetStr(): string{
        return this.str;
    }

    public Focus(): void {
        this.focus();
    }

    public IsFocusable(): boolean {
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
    
    public Empty(): void {
        throw new Error("Method not implemented.");
    }
}

window.customElements.define('input-button', InputButton, { extends: 'button' });