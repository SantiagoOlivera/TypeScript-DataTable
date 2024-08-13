import { ConfigModal } from "../Config/ConfigModal";
import { Form } from "../Form/Form";
import { Program } from "../Program/Program";
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

    private SetForm(form: Form): void {
        this.form = form;
    }

    private Draw(): void {
        this.AddElementInModalBody(this.form);
        this.addEventListener(Program.events.AFTER_SHOW_MODAL, function() {
            this.GetForm().Focus();
        });
    }

}

window.customElements.define('form-modal', FormModal, { extends: 'div' } );