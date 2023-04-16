import * as bootstrap from 'bootstrap';
import { ConfigDataTable } from '../Config/ConfigDataTable';
import { InputNumber } from '../Input/InputNumber';
import { InputSelect } from '../Input/InputSelect';
import { InputText } from '../Input/InputText';
import { LiveSearchInput } from '../Input/LiveSearchInput';
import { IInput } from '../Interfaces/IInput';
import { InputDate } from '../Input/InputDate';

export class DataTableModal extends HTMLDivElement {
    
    private readonly classes = {
        MODAL: 'modal',
        FADE: 'fade',
        MODAL_BODY: 'modal-body',
    };
    private readonly props = {
        TYPE: 'type',
        TITLE: 'title',
    }
    private readonly colTypes = {
        TEXT: 'text',
        NUMBER: 'number',
        LIVE_SEARCH: 'livesearch',
        SELECT: 'select',
        DATE: 'date',
    }

    private ModalId: string;
    private Title: string;
    private Config: ConfigDataTable;

    constructor(ModalId: string, Title: string, Config: ConfigDataTable){
        super();
        this.SetConfig(Config);
        this.SetModalId(ModalId);
        this.SetTitle(Title);
        this.Init();
    }

    private SetConfig(Config: ConfigDataTable){
        this.Config = Config;
        console.log("Config", this.Config);
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

    public Open(): void{
        var modal = new bootstrap.Modal(this);
        this.SetFormInputs();
        modal.show();
    }

    private SetFormInputs(): void {
        
        var ModalBody: HTMLElement = document.getElementById(this.GetModalId()).querySelector(`.${this.classes.MODAL_BODY}`);
        console.log("Modal Body", ModalBody);

        ModalBody.innerHTML = '';
        
        for(var col of this.Config.GetColumns()){
            
            var input: IInput = null;
            var type: string = col[this.props.TYPE];
            
            if( type === this.colTypes.TEXT){
                input = new InputText();
            } else if(type === this.colTypes.NUMBER){
                input = new InputNumber();
            } else if(type === this.colTypes.SELECT){
                input = new InputSelect();
            } else if(type === this.colTypes.LIVE_SEARCH){
                input = new LiveSearchInput();
            } else if (type === this.colTypes.DATE){
                input = new InputDate();
            }
            
            if(input){
                var label: HTMLLabelElement = document.createElement('label');
                label.innerHTML = col[this.props.TITLE];
                ModalBody.appendChild(label);
                ModalBody.appendChild(<HTMLElement><unknown>input);
                ModalBody.appendChild(document.createTextNode( '\u00A0' ));
            }
        }

        
    }

    private Init(): void {
        
        this.id = this.GetModalId();
        this.classList.add(this.classes.MODAL);
        this.classList.add(this.classes.FADE);
        this.tabIndex = -1;
        this.innerHTML = `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${ this.GetTitle() }</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary"> ${ this.GetTitle() } </button>
                </div>
                </div>
            </div>
        `;
    }

}
