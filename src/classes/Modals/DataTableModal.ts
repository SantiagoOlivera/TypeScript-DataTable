import * as bootstrap from 'bootstrap';
import { ConfigDataTable } from '../Config/ConfigDataTable';
import { InputNumber } from '../Input/InputNumber';
import { InputSelect } from '../Input/InputSelect';
import { InputText } from '../Input/InputText';
import { LiveSearchInput } from '../Input/LiveSearchInput';
import { IInput } from '../Interfaces/IInput';
import { InputDate } from '../Input/InputDate';
import { Modal } from './Modal';

export class DataTableModal extends Modal {
    
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

    private Config: ConfigDataTable;

    constructor(ModalId: string, Title: string, Config: ConfigDataTable){
        super(ModalId, Title);
        //this.SetConfig(Config);
        /* this.SetModalId(ModalId);
        this.SetTitle(Title);
        this.Init(); */
        //this.SetButtonsActions();
    }

    private SetConfig(Config: ConfigDataTable){
        this.Config = Config;
        //console.log("Config", this.Config);
    }

    /* private SetTitle(Title: string):void{
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
    } */

    /* public Open(): void{
        var modal = new bootstrap.Modal(this);
        this.SetFormInputs();
        modal.show();
    }
 */
    private SetFormInputs(): void {
        
        /* var ModalBody: HTMLElement = document.getElementById(this.GetModalId()).querySelector(`.${this.classes.MODAL_BODY}`);
        //console.log("Modal Body", ModalBody);

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
                var div: HTMLDivElement = document.createElement('div');
                div.classList.add(this.classes.COL_LG_3);
                div.classList.add(this.classes.COL_12);
                var label: HTMLLabelElement = document.createElement('label');
                label.innerHTML = col[this.props.TITLE];
                div.appendChild(label);
                div.appendChild(<HTMLElement><unknown>input);
                div.appendChild(document.createTextNode( '\u00A0' ));
                ModalBody.appendChild(div);
            }
        } */
        
    }

    private SetButtonsActions():void{
        //console.log(document.getElementById(this.GetModalId()));
        //var AddButton: HTMLElement = document.getElementById(this.GetModalId()).querySelector(`.${this.classes.ADD_BUTTON}`);
        /* var AddButton: HTMLElement = document.getElementById(this.GetModalId()).querySelector(`.${this.classes.ADD_BUTTON}`);
        AddButton.addEventListener('click', (e) => {
            console.log("Add");
        }); */
    }

    /* private Init(): void {
        
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
                <div class="modal-body row">
                </div>
                <div class="modal-footer float-right">
                    <button type="button" class="btn btn-secondary " style="width:100px;" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary ${this.classes.ADD_BUTTON}" style="width:100px;"> ${ this.GetTitle() } </button>
                </div>
                </div>
            </div>
        `;
    } */

}
