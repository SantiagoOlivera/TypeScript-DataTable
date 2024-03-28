import { Button } from "bootstrap";
import { IconButton } from "../Buttons/IconButton";
import { Config } from "../Config/Config";
import { ConfigInput } from "../Config/ConfigInput";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { ConfigButton } from "../Config/ConfigButton";
import { InputText } from "./InputText";
import { InputNumber } from "./InputNumber";
import { Functions } from "../Functions/Functions";
import { Form } from "../Form/Form";
import { Program } from "../Program/Program";

export class InputPageChager extends HTMLDivElement implements IDraw, IInput {
    
    private config: ConfigInput;

    private btnPrev: IconButton;
    private txtPageNumber: InputNumber;
    private txtNumberOfElements: InputText;
    private btnNext: IconButton;

    constructor(config: ConfigInput) {
        super();
        this.SetConfig(config);

        var maxValue: number = this.config.GetValue();
        var type: string = this.config.GetType();

        this.btnPrev = new IconButton(new ConfigButton({
            type: 'button',
            icon: 'bi bi-caret-left-fill',
            className: 'btn btn-outline-secondary',
            width: 35,
        }));

        this.txtPageNumber = new InputNumber(new ConfigInput({
            type: 'text',
            className: 'text-center',
            maxWidth: 60,
            minWidth: 60,
            align: 'right',
            value: 1,
            minValue: 1,
            maxValue: maxValue,
            defaultValue: 1,
        }));

        this.txtNumberOfElements = new InputText(new ConfigInput({
            type: 'text',
            className: 'text-center',
            maxWidth: 60,
            minWidth: 60,
            align: 'center',
            editable: false,
            value: maxValue,
            prefix: 'de ',
        }));

        this.btnNext = new IconButton(new ConfigButton({
            type: 'button',
            icon: 'bi bi-caret-right-fill',
            className: 'btn btn-outline-secondary',
            width: 35,
        }));

        var ipn: InputNumber = this.txtPageNumber;
        this.btnPrev.addEventListener('click', function(event: Event){
            var value: number = ipn.GetValue();
            if(value > 1){
                ipn.SetValue(value-1);
                ipn.dispatchEvent(new Event(Program.events.CHANGE_PAGE, event));
            }
        });

        this.btnNext.addEventListener('click', function(event: Event){
            var value: number = ipn.GetValue();
            if(value < maxValue){
                ipn.SetValue(value+1);
                ipn.dispatchEvent(new Event(Program.events.CHANGE_PAGE, event));
            }
        });

        this.txtPageNumber.addEventListener('change', function(event: Event) {
            ipn.dispatchEvent(new Event(Program.events.CHANGE_PAGE, event));
        });

        this.txtPageNumber.addEventListener('keyup', function(event: KeyboardEvent) {
            var input: InputNumber = <InputNumber>event.target;
            var value: number = input.GetValue();
            var keycode: number = event.keyCode;
            if(keycode === Program.keycodes.KEY_DOWN) {
                if(value > 1){
                    input.SetValue(value-1);
                    input.dispatchEvent(new Event(Program.events.CHANGE_PAGE, event));
                }
            } else if (keycode === Program.keycodes.KEY_UP) {
                if(value < maxValue){
                    input.SetValue(value+1);
                    input.dispatchEvent(new Event(Program.events.CHANGE_PAGE, event));
                }
            }
        });


        this.style.width = this.GetConfig().GetWidth() + 'px';
        var align: string = this.GetConfig().GetAlign();
        this.classList.add(
            Program.bootstrap.INPUT_GROUP, 
            Program.bootstrap.SMALL_INPUT_GROUP
        );
        if(Program.align.RIGHT){
            this.classList.add(Program.bootstrap.FLOAT_RIGHT);
        }else if(Program.align.CENTER){

        }else if(Program.align.LEFT){
            
        }
    

        this.Draw();
      
    }
    GetForm(): Form {
        throw new Error("Method not implemented.");
    }
    Empty(): void {
        throw new Error("Method not implemented.");
    }

    private SetConfig(config: ConfigInput){
        this.config = config;
    }

    Draw(): void {
        //this.className = 'input-group input-group-sm mb-3';
        this.txtNumberOfElements.Disable(true);
        this.appendChild(this.btnPrev);
        this.appendChild(this.txtPageNumber);
        this.appendChild(this.txtNumberOfElements);
        this.appendChild(this.btnNext);
    }

    GetHTMLElement(): HTMLElement {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    Focus(): void {
        throw new Error("Method not implemented.");
    }
    Disable(disabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    Hide(hidden: boolean): void {
        throw new Error("Method not implemented.");
    }
    IsDisabled(): boolean {
        throw new Error("Method not implemented.");
    }
    IsHidden(): boolean {
        throw new Error("Method not implemented.");
    }
    GetConfig(): Config {
        return this.config;
    }
    



}

window.customElements.define('input-page-changer', InputPageChager, { extends: 'div' });


