import { Input } from "../Input/Input";
import { IForm } from "../Interfaces/IForm";
import { EditForm } from "./EditForm";
import { Form } from "./Form";

export class EditFormGettersAndSetters extends EditForm {

    constructor(inputs: Array<Input>){
        super(inputs);
    }
    
}

window.customElements.define('edit-form', EditFormGettersAndSetters, { extends: 'form' });