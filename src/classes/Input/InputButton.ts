import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";

export class InputButton extends HTMLButtonElement implements IDraw, IInput{
    
    private html: HTMLElement;
    private str: string;

    constructor(html?: HTMLElement, str?: string ) {
        super();
        this.className = 'btn btn-success';

        if(html){
            this.SetHtml(html);
        }
        if(str){
            this.SetStr(str);
        }


        this.Draw();
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
        }else{
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