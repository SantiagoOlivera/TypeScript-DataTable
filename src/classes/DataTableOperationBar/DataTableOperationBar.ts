import { ConfigDataTable, ConfigDataTableEditable } from "src/classes/Config/ConfigDataTable";
import { DataTableEditableAddRowModal } from "../Modals/DataTableModalAddRow";
import { DataTable } from "../DataTable/DataTable";

export class DataTableOperationBar extends HTMLDivElement {

    private readonly icons = {
        SAVE: '<i class="bi bi-save"></i>',
        ADD: '<i class="bi bi-plus"></i>',
        UPDATE: '<i class="bi bi-pencil-square"></i>'
    };

    private readonly classes = {
        BTN: 'btn',
        BTN_SUCCESS: 'btn-success',
        BTN_SM: 'btn-sm',
        PADDING_1: 'p-1',
        MARGIN_1: 'm-1'
    };

    private BtnSave: HTMLButtonElement;
    private BtnAdd: HTMLButtonElement;
    private BtnUpdate: HTMLButtonElement;
    private BtnDelete: HTMLButtonElement;
    private BtnExcel: HTMLButtonElement;
    private ModalAddRow: DataTableEditableAddRowModal;
    private config: ConfigDataTable;
    private dt: DataTable;

    
    constructor(dt: DataTable) {
        super();
        this.SetDataTable(dt);
        this.SetClasses();
        this.SetButtons();
    }

    private SetDataTable(dt: DataTable):void{
        this.dt = dt;
    }

    private GetDataTable():DataTable{
        return this.dt;
    }

    private SetClasses(): void {
        //this.classList.add(this.classes.MARGIN_1);
    }

    private SetButtons(): void {
        this.SetAddButton();
        this.SetSaveButton();
        this.SetUpdateButton();
    }

    private SetSaveButton(): void {

        this.BtnSave = <HTMLButtonElement>document.createElement('button');
        this.BtnSave.style.maxWidth = '50px';
        this.BtnSave.classList.add(this.classes.BTN);
        this.BtnSave.classList.add(this.classes.BTN_SUCCESS);
        this.BtnSave.classList.add(this.classes.BTN_SM);
        this.BtnSave.innerHTML = this.icons.SAVE;
        this.appendChild(this.BtnSave);
        this.appendChild(document.createTextNode( '\u00A0' ));

        this.BtnSave.addEventListener('click', () => { 
            console.log(this.GetDataTable().GetData());
        });
    }

    

    private OpenModalAdd() :void{

        if(!this.ModalAddRow){
            //reveer esto
            var body = document.querySelector('body');
            var config: ConfigDataTableEditable = <ConfigDataTableEditable>this.GetDataTable().GetConfig();
            
            this.ModalAddRow = new DataTableEditableAddRowModal(
                'DataTableModalAddRow', 
                'Agregar', 
                config
            );

            body.prepend(this.ModalAddRow);
        }
        this.ModalAddRow.Open();
    }

    private SetAddButton(): void {
        
        this.BtnAdd = <HTMLButtonElement>document.createElement('button');
        this.BtnAdd.style.maxWidth = '50px';
        this.BtnAdd.classList.add(this.classes.BTN);
        this.BtnAdd.classList.add(this.classes.BTN_SUCCESS);
        this.BtnAdd.classList.add(this.classes.BTN_SM);
        this.BtnAdd.innerHTML = this.icons.ADD;
        this.appendChild(this.BtnAdd);
        this.appendChild(document.createTextNode( '\u00A0' ));

        this.BtnAdd.addEventListener('click', () => { 
            this.OpenModalAdd();
        });

    }

    private SetUpdateButton():void{
        this.BtnUpdate = <HTMLButtonElement>document.createElement('button');
        this.BtnUpdate.style.maxWidth = '50px';
        this.BtnUpdate.classList.add(this.classes.BTN);
        this.BtnUpdate.classList.add(this.classes.BTN_SUCCESS);
        this.BtnUpdate.classList.add(this.classes.BTN_SM);
        this.BtnUpdate.innerHTML = this.icons.UPDATE;
        this.appendChild(this.BtnUpdate);
        this.appendChild(document.createTextNode( '\u00A0' ));

        this.BtnUpdate.addEventListener('click', () => { 
            //this.OpenModalAdd();
        });
    }

}

window.customElements.define('data-table-operation-bar', DataTableOperationBar, { extends: 'div' });