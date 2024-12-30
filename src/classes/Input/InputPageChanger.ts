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


    private numberOfElements: number;


    constructor(config: ConfigInput) {
        super();
        this.SetConfig(config);

        var maxValue: number = (<ConfigInput>this.GetConfig()).GetValue();
        this.SetNumberOfElements(maxValue);
        this.SetTxtPageNumber();
        this.SetTxtNumberOfElements();
        this.SetButtonPrevious();
        this.SetButtonNext();
        this.SetClassName();
        this.Draw();
    }

    private SetClassName(): void {
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
    }

    public ChangePage(index: number, triggerEvent?: boolean): void {
        this.txtPageNumber.SetValue(index);
        if(triggerEvent){
            this.txtPageNumber.dispatchEvent(new Event(Program.events.CHANGE_PAGE, {bubbles:true}));
        }
    }

    public SetNumberOfElements(length: number): void {
        this.numberOfElements = length;
        if(!Functions.IsNullOrEmpty(this.txtNumberOfElements)){
            this.txtNumberOfElements.SetValue(this.numberOfElements.toString());   
        }
    }

    public GetNumberOfElements(): number {
        return this.numberOfElements;
    }

    private SetTxtNumberOfElements(): void {
        var numberOfElements: number = this.GetNumberOfElements();
        this.txtNumberOfElements = new InputText(new ConfigInput({
            type: 'text',
            className: 'text-center',
            maxWidth: 60,
            minWidth: 60,
            align: 'center',
            editable: false,
            value: numberOfElements,
            prefix: 'de ',
        }));
    }

    private SetButtonPrevious(): void {
        var ipn: InputNumber = this.txtPageNumber;
        this.btnPrev = new IconButton(new ConfigButton({
            type: 'button',
            icon: 'bi bi-caret-left-fill',
            className: 'btn btn-outline-secondary',
            width: 35,
        }));
        this.btnPrev.addEventListener(Program.events.CLICK, function(event: Event){
            var value: number = ipn.GetValue();
            if(value > 1){
                ipn.SetValue(value-1);
                ipn.dispatchEvent(new Event(Program.events.CHANGE_PAGE, event));
            }
        });
    }

    private SetButtonNext(): void {
        var ipc: InputPageChager = this;
        var ipn: InputNumber = this.txtPageNumber;
        this.btnNext = new IconButton(new ConfigButton({
            type: 'button',
            icon: 'bi bi-caret-right-fill',
            className: 'btn btn-outline-secondary',
            width: 35,
        }));
        this.btnNext.addEventListener(Program.events.CLICK, function(event: Event) {
            var value: number = ipn.GetValue();
            if(value < ipc.GetNumberOfElements()){
                ipn.SetValue(value+1);
                ipn.dispatchEvent(new Event(Program.events.CHANGE_PAGE, event));
            }
        });
    }

    private SetTxtPageNumber(): void {
        var ipc: InputPageChager = this;
        this.txtPageNumber = new InputNumber(new ConfigInput({
            type: 'text',
            className: 'text-center',
            maxWidth: 60,
            minWidth: 60,
            align: 'right',
            value: 0,
            minValue: 0,
            defaultValue: 0,
        }));
        var ipn: InputNumber = this.txtPageNumber;
        this.txtPageNumber.addEventListener(Program.events.CHANGE, function(event: Event) {
            var value = ipn.GetValue();
            if(value > ipc.GetNumberOfElements()){
                ipn.SetValue(ipc.GetNumberOfElements());
            } else {
                ipn.dispatchEvent(new Event(Program.events.CHANGE_PAGE, event));
            }
            event.stopPropagation();
        });
        this.txtPageNumber.addEventListener(Program.events.KEY_DOWN, function(event: KeyboardEvent) {
            var input: InputNumber = <InputNumber>event.target;
            var value: number = input.GetValue();
            var keycode: number = event.keyCode;
            if(keycode === Program.keycodes.KEY_DOWN) {
                if(value > 1){
                    input.SetValue(value-1);
                    input.dispatchEvent(new Event(Program.events.CHANGE_PAGE, event));
                }
                event.preventDefault();
            } else if (keycode === Program.keycodes.KEY_UP) {
                if(value < ipc.GetNumberOfElements()){
                    input.SetValue(value+1);
                    input.dispatchEvent(new Event(Program.events.CHANGE_PAGE, event));
                }
                event.preventDefault();
            }
        });
    }

    public AddNewPage(): void {
        //this.SetNumberOfElements()
        var length: number = this.GetNumberOfElements()+1;
        this.SetNumberOfElements(length);
    }

    public RemovePage(): void {
        var length: number = this.GetNumberOfElements();
        if(length > 0){
            this.SetNumberOfElements(length-1);
        }
    }

    public GetForm(): Form {
        throw new Error("Method not implemented.");
    }
    public Empty(): void {
        throw new Error("Method not implemented.");
    }

    private SetConfig(config: ConfigInput){
        this.config = config;
    }

    public Draw(): void {
        //this.className = 'input-group input-group-sm mb-3';
        this.txtNumberOfElements.Disable(true);
        this.appendChild(this.btnPrev);
        this.appendChild(this.txtPageNumber);
        this.appendChild(this.txtNumberOfElements);
        this.appendChild(this.btnNext);
    }

    public GetHTMLElement(): HTMLElement {
        throw new Error("Method not implemented.");
    }
    public SetValue(value: any): void {
        throw new Error("Method not implemented.");
    }
    public GetValue() {
        throw new Error("Method not implemented.");
    }
    public Supr(): void {
        throw new Error("Method not implemented.");
    }
    public IsFocusable(): boolean {
        throw new Error("Method not implemented.");
    }
    public Focus(): void {
        throw new Error("Method not implemented.");
    }
    public Disable(disabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    public Hide(hidden: boolean): void {
        throw new Error("Method not implemented.");
    }
    public IsDisabled(): boolean {
        throw new Error("Method not implemented.");
    }
    public IsHidden(): boolean {
        throw new Error("Method not implemented.");
    }
    public GetConfig(): Config {
        return this.config;
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

window.customElements.define('input-page-changer', InputPageChager, { extends: 'div' });


