import { ConfigModal } from "../Config/ConfigModal";
import { Form } from "../Form/Form";
import { FormEditable } from "../Form/FormEditable";
import { Modal } from "./Modal";

export class FormModal extends Modal {

    private form: Form;

    constructor(config: ConfigModal){
        super(config);
        var form: Form = this.GetConfig().GetForm();
        this.SetForm(form);

        
        this.Draw();
    }

    public GetForm(): Form {
        return this.form;
    }

    private SetForm(form: Form){
        this.form = form;
    }

    private Draw(): void {
        this.AddElementInModalBody(this.form);
    }

}

window.customElements.define('form-modal', FormModal, { extends: 'div' } );