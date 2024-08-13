import { Button } from "../Buttons/Button";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { IconButton } from "../Buttons/IconButton";
import * as bootstrap from 'bootstrap';
import { ConfigForm } from "../Config/ConfigForm";
import { ConfigButton } from "../Config/ConfigButton";
import { ConfigModal } from "../Config/ConfigModal";
import { Functions } from "../Functions/Functions";
import { Program } from "../Program/Program";

export abstract class Modal extends HTMLDivElement {

    private ModalId: string;
    private Title: string;
    private buttons: Array<Button>;
    private config: ConfigModal;
    private modal: bootstrap.Modal;

    private modalHeader: HTMLDivElement;
    private modalBody: HTMLDivElement;
    private modalFooter: HTMLDivElement;

    private readonly classes = {
        MODAL: 'modal',
        FADE: 'fade',
        MODAL_BODY: 'modal-body',
        COL_LG_3: 'col-lg-3',
        COL_12: 'col-12',
        ADD_BUTTON: 'add-button',
    };

    constructor(config: ConfigModal) {
        super();
        this.SetConfig(config);
        this.SetModalId();
        this.SetTitle();
        this.SetButtons();
        this.Init();
    }

    private SetConfig(config: ConfigModal){
        this.config = config;
    }

    private SetButtons(): void {
        var buttons: Array<Button> = this.GetConfig().GetButtons();
        if(!Functions.IsNullOrEmpty(buttons)){
            this.buttons = new Array<Button>();
            for(var b of buttons) {
                var cb: ConfigButton = new ConfigButton(b);
                var btn: IconButton = new IconButton(cb);
                this.AddButton(btn);
            }
        }
    }

    public GetConfig(): ConfigModal {
        return this.config;
    }

    private SetTitle():void{
        this.Title = this.GetConfig().GetTitle();
    }

    public GetTitle():string{
        return this.Title;
    }

    private SetModalId():void{
        this.ModalId = this.GetConfig().GetId();
    }

    private GetModalId():string{
        return this.ModalId;
    }

    public GetModal() {
        return this;
    }

    public Open(): void {
        this.modal = new bootstrap.Modal(this);
        this.modal.show();
    }


    public Close(): void {
        this.modal.hide();
    }

    private Init(): void {
        this.id = this.GetModalId();
        this.classList.add(this.classes.MODAL);
        this.classList.add(this.classes.FADE);
        this.tabIndex = -1;
       
        this.SetModal();
        this.SetHeader();
        this.SetFooter();

        var beforeClose: Function = this.GetConfig().GetBeforeClose();
        if(!Functions.IsNullOrEmpty(beforeClose)){
            this.addEventListener(Program.events.BEFORE_CLOSE_MODAL, function(){
                beforeClose();
            });
        }
        
        this.addEventListener(Program.events.AFTER_CLOSE_MODAL, function(){
            var afterClose: Function = this.GetConfig().GetAfterClose();
            if(!Functions.IsNullOrEmpty(afterClose)){
                afterClose();
            }
        });
    }

    private SetModal(): void {

        /* this.modalHeader = document.createElement('div');
        this.modalHeader.className = 'modal-header';
        
        this.modalBody = document.createElement('div');
        this.modalBody.className = 'modal-body row';

        this.modalFooter = document.createElement('div');
        this.modalBody.className = 'modal-footer'; */


        this.innerHTML = `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                    </div>
                    <div class="modal-body row">
                    </div>
                    <div class="modal-footer float-right">
                    </div>
                </div>
            </div>
        `;
    }

    private SetHeader(): void {
        var header: Element = this.GetHeader();
        header.innerHTML = `
            <h5 class="modal-title">${ this.GetTitle() }</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `;
    }

    private SetBody(): void {
        var body: Element = this.GetBody();
    }

    public AddElementInModalBody(e: Element): void {
        var body: Element = this.GetBody();
        body.appendChild(e);
    }

    public AddButton(button: Button): void {
        this.buttons.push(button);
    }

    public GetButtons(): Array<Button> {
        return this.buttons;
    }

    private SetFooter(){
        var footer: Element = this.GetFooter();
        if(!Functions.IsNullOrEmpty(this.buttons)) {
            for(var b of this.buttons) {
                footer.appendChild(b);
            }
        }
    }

    private GetBody(): Element {
        var ret: Element = this.getElementsByClassName('modal-body')[0];
        return ret;
    }

    private GetHeader(): Element {
        var ret: Element = this.getElementsByClassName('modal-header')[0];
        return ret;
    }

    private GetFooter(): Element {
        var ret: Element = this.getElementsByClassName('modal-footer')[0];
        return ret;
    }

}