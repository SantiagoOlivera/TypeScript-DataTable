import { Button } from "bootstrap";
import { Config } from "../Config/Config";
import { ConfigForm } from "../Config/ConfigForm";
import { ConfigInput } from "../Config/ConfigInput";
import { ConfigModal } from "../Config/ConfigModal";
import { DataTable } from "../DataTable/DataTable";
import { Form } from "../Form/Form";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { FormModal } from "../Modals/FormModal";
import { Program } from "../Program/Program";
import { Factory } from "../Factory/Factory";

export class InputFormButton extends HTMLButtonElement implements IDraw, IInput {

    private config: ConfigInput;
    private formmodal: Form;
    public afterClose: Function;
    private dt: DataTable;
    
    constructor(config: ConfigInput) {
        super();
        this.SetConfig(config);
        this.Draw();
    }

    private SetConfig(config: ConfigInput): void {
        this.config = config;
    }    

    public Draw(): void {
        var html: string = this.GetConfig().GetTitle();
        this.SetClassName();
        this.append(html);
        this.SetOpenModal();
    }

    private SetClassName(): void {
        var className: string = 'btn btn-success btn-sm';
        this.className = className;
    }

    private SetForm(form: Form): void {
        this.formmodal = form;
    }
    public SetDataTable(dt: DataTable): void{
        this.dt = dt;
    }
    public GetDataTable(): DataTable {
        return this.dt;
    }

    public SetAfterClose(afterClose: Function): void {
        this.afterClose = afterClose;
    }

    public GetAfterClose(): Function {
        return this.afterClose;
    }

    private SetOpenModal(): void {
        var button: InputFormButton = this;
        //var config: Object = <ConfigInput>this.GetConfig().GetConfig();
        //debugger;
        var cInput: ConfigInput = this.config;
        var cForm: ConfigForm = cInput.ToConfigForm();
        var config: Object = cInput.GetConfig();

        var form: Form = Factory.GetForm(cForm.GetConfig());
        
        this.SetForm(form);
        //form.SetValue(cForm.GetData());

        this.onclick = function(event: Event) {
            var cm: ConfigModal = new ConfigModal({
                id: cInput.GetData() + 'Modal',
                title: cInput.GetTitle(),
                form: form,
                beforeClose: function(){
                    button.dispatchEvent(new Event(Program.events.CHANGE, { bubbles: true }));
                },
            });
            var modal: FormModal = new FormModal(cm);
            modal.GetForm().Disable(false);
            modal.Open();
        }
    }

    public GetHTMLElement(): HTMLElement {
        return this;
    }
    public SetValue(value: any): void {
        this.formmodal.SetValue(value);
    }
    public GetValue() {
        return this.formmodal.GetValue();
    }
    public Supr(): void {
        throw new Error("Method not implemented.");
    }
    public IsFocusable(): boolean {
        return true;
    }
    public Focus(): void {
        this.focus();
    }
    public Disable(disabled: boolean): void {
        //throw new Error("Method not implemented.");
    }
    public Hide(hidden: boolean): void {
        //throw new Error("Method not implemented.");
    }
    public IsDisabled(): boolean {
        return this.disabled;
    }
    public IsHidden(): boolean {
        throw new Error("Method not implemented.");
    }
    public GetConfig(): ConfigInput {
        return this.config;
    }
    public GetForm(): Form {
        return this.formmodal;
    }
    public Empty(): void {
        throw new Error("Method not implemented.");
    }
    public GetText(): string {
        throw new Error("Method not implemented.");
    }
    public IsEditable(): boolean {
        return this.GetConfig().GetEditable();
    }
    public SetDefault(): void {
        throw new Error("Method not implemented.");
    }

}

window.customElements.define('input-form-button', InputFormButton, { extends: 'button' });