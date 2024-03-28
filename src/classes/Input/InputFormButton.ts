import { Config } from "../Config/Config";
import { ConfigInput } from "../Config/ConfigInput";
import { ConfigModal } from "../Config/ConfigModal";
import { Form } from "../Form/Form";
import { FormEditable } from "../Form/FormEditable";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { FormModal } from "../Modals/FormModal";

export class InputFormButton extends HTMLButtonElement implements IDraw, IInput {

    private config: ConfigInput;
    
    constructor(config: ConfigInput){
        super();
        this.SetConfig(config);
        this.Draw();
    }
    

    private SetConfig(config: ConfigInput): void {
        this.config = config;
    }

    
    Draw(): void {
        var html: string = this.config.GetInnerHTML();
        var className: string = 'btn btn-success btn-sm';


        this.className = className;
        this.append(html);
        this.SetOpenModal();
    }

    private SetOpenModal(): void{
        var config: ConfigInput = this.config;
        var form: FormEditable = new FormEditable(config.ToConfigForm());

        this.onclick = function(event: Event) {
            console.log(config);
            var cm: ConfigModal = new ConfigModal({
                id: config.GetData() + 'Modal',
                title: config.GetTitle(),
                form: form,
            });
            var modal: FormModal = new FormModal(cm);
            modal.Open();
        }
    }

    GetHTMLElement(): HTMLElement {
        return this;
    }
    SetValue(value: any): void {
        throw new Error("Method not implemented.");
    }
    GetValue() {
        throw new Error("Method not implemented.");
    }
    Supr(): void {
        throw new Error("Method not implemented.");
    }
    IsFocusable(): boolean {
        return true;
    }
    Focus(): void {
        this.focus();
    }
    Disable(disabled: boolean): void {
        //throw new Error("Method not implemented.");
    }
    Hide(hidden: boolean): void {
        //throw new Error("Method not implemented.");
    }
    IsDisabled(): boolean {
        return this.disabled;
    }
    IsHidden(): boolean {
        throw new Error("Method not implemented.");
    }
    GetConfig(): Config {
        return this.config;
    }
    GetForm(): Form {
        throw new Error("Method not implemented.");
    }
    Empty(): void {
        throw new Error("Method not implemented.");
    }


}

window.customElements.define('input-form-button', InputFormButton, { extends: 'button' });