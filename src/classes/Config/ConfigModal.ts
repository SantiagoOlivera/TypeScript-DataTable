import { Form } from "../Form/Form";
import { Config } from "./Config";

export class ConfigModal extends Config {

    private form: Form;
    private buttons: Array<any>;
    private beforeOpen: Function;
    private beforeClose: Function;
    private afterOpen: Function;
    private afterClose: Function;

    
    constructor(config: any){
        super(config);
        var form: Form = config.form;
        var buttons: Array<any> = config.buttons;
        var beforeOpen: Function = config.beforeOpen;
        var afterOpen: Function = config.afterOpen;
        var beforeClose: Function = config.beforeClose;
        var afterClose: Function = config.afterClose;

        this.SetForm(form);
        this.SetButtons(buttons);
        this.SetBeforeClose(beforeClose);
        this.SetAfterClose(afterClose);
    }

    public GetForm(): Form {
        return this.form;
    }
    public GetButtons(): Array<any> {
        return this.buttons;
    }
    public GetBeforeClose(): Function {
        return this.beforeClose;
    }
    public GetAfterClose(): Function {
        return this.afterClose;
    }
    private SetForm(form: Form){
        this.form = form;
    }
    private SetButtons(buttons: Array<any>){
        this.buttons = buttons;
    }
    private SetBeforeClose(beforeClose: Function): void {
        this.beforeClose = beforeClose;
    }
    private SetAfterClose(afterClose: Function): void {
        this.afterClose = afterClose;
    }

}