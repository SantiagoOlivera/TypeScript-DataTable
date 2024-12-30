import { ConfigRow } from "../Config/ConfigRow";
import { IDraw } from "../Interfaces/IDraw";
import { Row } from "./Row";
import { DataTableCell } from "../Cell/DataTableCell";
import { ConfigCell } from "../Config/ConfigCell";
import { IconButton } from "../Buttons/IconButton";
import { ConfigButton } from "../Config/ConfigButton";
import { Button } from "../Buttons/Button";
import { Functions } from "../Functions/Functions";
import { DataTableRow } from "./DataTableRow";
import { Cell } from "../Cell/Cell";
import { DataTable } from "../DataTable/DataTable";
import { FormModal } from "../Modals/FormModal";
import { ConfigModal } from "../Config/ConfigModal";
import { ConfigForm } from "../Config/ConfigForm";
import { DataForm } from "../Form/DataForm";
import { Factory } from "../Factory/Factory";
import { Program } from "../Program/Program";

export class DataTableRowOperationBar extends DataTableRow implements IDraw {

    public readonly types = {
        ADD: 'add',
        EXCEL: 'excel',
    }

    private buttons: Array<Button>;
    private cell: HTMLTableCellElement;

    constructor(config: ConfigRow){
        super(config);   
    }

    public Draw(): void {        
        this.InitCell();
        this.InitButtons();
    }

    private InitCell(): void {
        var td: HTMLTableCellElement = document.createElement('td');
        var colSpan: number = this.GetConfig().GetColSpan();
        td.colSpan = colSpan;
        this.cell = td;
        this.appendChild(this.cell);
    }

    private InitButtons(): void {
        this.buttons = new Array<Button>();
        var buttons: Array<any> = this.GetConfig().GetButtons();
        for(var b of buttons){
            if(Functions.IsString(b)) {
                if(b === Program.buttons.ADD){
                    this.InitButtonAdd();
                }
            }
        }
    }

    public AddButton(button: Button){
        this.buttons.push(button);
        this.cell.appendChild(button);
    }

    public GetButtons(): Array<Button> {
        return this.buttons;
    }


    private InitButtonAdd(): void {
        var dt: DataTable = <DataTable>this.GetTable();
        var modal: FormModal = new FormModal(new ConfigModal({
            id: 'addFormModal',
            title: 'Agregar',
            form: new DataForm(new ConfigForm({
                title: '',
                id: 'addForm',
                className: '',
                filter: false,
                floatingForm: false,
                transformTable: true,
                fields: dt.GetColumns(),
            })),
            buttons: [
                {
                    id: 'btnModalAdd',
                    title: 'Agregar',
                    icon: 'bi bi-plus',
                    width: 125,
                    disabled: false,
                    hidden: false,
                    type: 'button',
                    className: 'btn btn-success',
                    onclick: function(event: Event){
                        var data: any = modal.GetForm().GetValue();
                        dt.AddData(data);
                        modal.Close();
                    }
                },
            ],
        }));

        var c: any = {
            id: 'btnAdd',
            title: '',
            name: 'add',
            data: 'add',
            icon: 'bi bi-plus',
            width: 45,
            height: 45,
            className: 'btn btn-success btn-sm',
            default: true,
            onclick: function(event: Event) {
                modal.Open();
                modal.GetForm().Empty();
                modal.GetForm().Disable(false);
            },
        };
        var cb: ConfigButton = new ConfigButton(c);
        var btn: IconButton = new IconButton(cb);
        this.AddButton(btn);
    }

}

window.customElements.define('data-table-row-operation-bar', DataTableRowOperationBar, { extends: 'tr' });