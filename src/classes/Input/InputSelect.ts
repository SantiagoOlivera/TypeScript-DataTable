import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { Input } from "./Input";
import { OptionSelect } from "./OptionSelect";

export class InputSelect extends HTMLSelectElement implements IInput, IDraw{

    private readonly HTML_OPTION: string = 'option';

    private optionsList: Array<OptionSelect>;
    private opt: string;
    
    constructor(opt: string, options: Array<OptionSelect>){
        super();

        this.SetOptions(options);
        this.SetOpt(opt);
        this.className = 'form-control';
        //this.style.marginTop = '1px';
        this.Draw();

    }


    GetHTMLElement(): HTMLElement {
        return this;
    }

    Draw(): void {

        for(var o of this.optionsList){

            var opt: HTMLOptionElement = <HTMLOptionElement>document.createElement(this.HTML_OPTION);

            var value: string =  o.GetValue();
            opt.value = value;
            opt.innerHTML = o.GetDescription();
            
            //console.log("VALUE OPT:" + opt.value, "VALUE:" + this.GetValue());

            if(value === this.GetOpt()){
                opt.selected = true;
            }

            this.appendChild(opt);
        }

    }
    
    SetValue(value: string): void {
        /* for(var o of this.options){
            var optVal: string = o.getAttribute('value');
            if(value === optVal){
                this.SetOpt(optVal);
                o.selected = true;
            }
        } */
    }

    GetValue(): string {
        return this.opt;
    }

    Supr(): void {
        throw new Error("Method not implemented.");
    }

    private SetOpt(opt: string): void{
        this.opt = opt;
    }

    public GetOpt(): string{
        return this.opt;
    }

    private SetOptions(options: Array<OptionSelect>):void{
        this.optionsList = options;
    }

    public GetOptions():Array<OptionSelect>{
        return this.optionsList;
    }


}

window.customElements.define('input-select', InputSelect, { extends: 'select'});