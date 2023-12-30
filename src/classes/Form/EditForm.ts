import { Input } from "../Input/Input";
import { IForm } from "../Interfaces/IForm";
import { Form } from "./Form";

export abstract class EditForm extends Form {

    private inputs: Array<Input>

    constructor(inputs: Array<Input>){
        super();
        this.SetInputs(inputs);
    }

    private SetInputs(inputs: Array<Input>): void {
        this.inputs = inputs;
    }

    public GetInputs(): Array<Input> {
        return this.inputs;
    }


    /* public SetData(data: any): void {
        
    }
    
    public GetData() {
        throw new Error("Method not implemented.");
    }
    public DisableAll(disabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    public Disable(name: string, disabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    public Hide(name: string, hide: boolean): void {
        throw new Error("Method not implemented.");
    }
    public Draw(): void {
        throw new Error("Method not implemented.");
    } */


}

//window.customElements.define('edit-form', EditForm, { extends: 'form' });