import { Button } from "../Buttons/Button";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { IconButton } from "../Buttons/IconButton";
import * as bootstrap from 'bootstrap';

export abstract class Modal extends HTMLDivElement {

    private ModalId: string;
    private Title: string;
    private buttons: Array<Button>;

    private readonly classes = {
        MODAL: 'modal',
        FADE: 'fade',
        MODAL_BODY: 'modal-body',
        COL_LG_3: 'col-lg-3',
        COL_12: 'col-12',
        ADD_BUTTON: 'add-button',
    };

    constructor(
        ModalId: string, 
        Title: string
    ) {
        super();
        this.SetModalId(ModalId);
        this.SetTitle(Title);
        this.Init();
    }

    private SetTitle(Title: string):void{
        this.Title = Title;
    }

    public GetTitle():string{
        return this.Title;
    }

    private SetModalId(ModalId: string):void{
        this.ModalId = ModalId;
    }

    private GetModalId():string{
        return this.ModalId;
    }

    public GetModal() {
        return this;
    }

    public Open(): void {
        var modal: bootstrap.Modal = new bootstrap.Modal(this);
        modal.show();
    }

    public Close(): void {
        var modal: bootstrap.Modal = new bootstrap.Modal(this);
        modal.hide();
    }



    private Init(): void {
        this.id = this.GetModalId();
        this.classList.add(this.classes.MODAL);
        this.classList.add(this.classes.FADE);
        this.tabIndex = -1;
       
        this.SetModal();
        this.SetHeader();
        this.SetFooter();
    }

    private SetModal(){
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

    private SetHeader(){
        var header: Element = this.GetHeader();
        header.innerHTML = `
            <h5 class="modal-title">${ this.GetTitle() }</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `;
    }

    private SetBody(){
        var body: Element = this.GetBody();
    }

    private SetFooter(){
        var footer: Element = this.GetFooter();
        var btnGuardar: IconButton = new IconButton('bi bi-floppy2-fill', 'Guardar');
        btnGuardar.onclick = function(event){
            console.log("Guardar");
        }
        
        footer.appendChild(btnGuardar);
    }

    private GetBody(): Element {
        var ret: Element = this.getElementsByClassName('modal-body')[0];
        return ret;
    }

    private GetHeader():Element{
        var ret: Element = this.getElementsByClassName('modal-header')[0];
        return ret;
    }

    private GetFooter(): Element {
        var ret: Element = this.getElementsByClassName('modal-footer')[0];
        return ret;
    }

}