import { ConfigDataTable } from "../Config/ConfigDataTable";
import { ConfigModal } from "../Config/ConfigModal";
import { DataTableModal } from "./DataTableModal";

export class DataTableEditableAddRowModal extends DataTableModal {
    constructor(config: ConfigModal){
        super(config);
    }
    /* constructor(IdModal:string, Title: string, Config: ConfigDataTable ){
        super(IdModal, Title, Config);
    } */

}

window.customElements.define('data-table-editable-add-row-modal', DataTableEditableAddRowModal, { extends: 'div' } );