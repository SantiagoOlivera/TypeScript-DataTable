import { Form } from "../Form/Form";
import { Config } from "./Config";

export class ConfigModal extends Config {

    private form: Form;
    private buttons: Array<any>
    
    constructor(config: any){
        super(config);

        var form: Form = config.form;
        var buttons: Array<any> = config.buttons;

        this.SetForm(form);
        this.SetButtons(buttons);
    }

    public GetForm(): Form {
        return this.form;
    }
    public GetButtons(): Array<any> {
        return this.buttons;
    }

    private SetForm(form: Form){
        this.form = form;
    }
    private SetButtons(buttons: Array<any>){
        this.buttons = buttons;
    }

}