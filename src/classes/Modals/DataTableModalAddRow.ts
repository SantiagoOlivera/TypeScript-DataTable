import { ConfigDataTableEditable } from "../Config/ConfigDataTable";
import { DataTableModal } from "./DataTableModal";

export class DataTableEditableAddRowModal extends DataTableModal {
    
    constructor(IdModal:string, Title: string, Config: ConfigDataTableEditable ){
        super(IdModal, Title, Config);
    }

}

window.customElements.define('data-table-editable-add-row-modal', DataTableEditableAddRowModal, { extends: 'div' } );