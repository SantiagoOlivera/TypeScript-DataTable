import { ConfigRow } from "../Config/ConfigRow";
import { IDraw } from "../Interfaces/IDraw";
import { Row } from "./Row";
import { DataTableCell } from "../Cell/DataTableCell";
import { ConfigCell } from "../Config/ConfigCell";
import { IconButton } from "../Buttons/IconButton";
import { ConfigButton } from "../Config/ConfigButton";
import { Button } from "../Buttons/Button";
import { Functions } from "../Functions/Functions";

export class DataTableRowOperationBar extends Row implements IDraw {

    public readonly types = {
        ADD: 'add',
        EXCEL: 'excel',
    }

    private buttons: Array<Button>;
    private cell: HTMLTableCellElement;

    constructor(config: ConfigRow){
        super(config);
        this.Draw();
    }

    public Draw(): void {

        this.innerHTML = null;
        this.cell = null;
        this.buttons = [];


        var colSpan: number = this.GetConfig().GetColSpan();
        var buttons: Array<any> = this.GetConfig().GetButtons();


        var td: HTMLTableCellElement = document.createElement('td');
        td.colSpan = colSpan;

        /* 
            var cc: ConfigCell = new ConfigCell({
                colSpan: colSpan,
            });
        */

        //var cell: DataTableCell = new DataTableCell(cc); 
        
        this.cell = td;

        for(var b of buttons) {

            var c: any = null;
            var cb: ConfigButton = null;

            if(Functions.IsString(b)) {
                if(b === this.types.ADD){
                    c = {
                        id: 'btnAdd',
                        title: '',
                        name: 'add',
                        data: 'add',
                        icon: 'bi bi-plus',
                        width: 45,
                        height: 45,
                        className: 'btn btn-success btn-sm',
                        default: true,
                    } 
                } else if(b === this.types.EXCEL){
                    c = {
                        id: 'btnExcel',
                        title: '',
                        name: 'excel',
                        icon: 'bi bi-file-excel',
                        width: 45,
                        height: 45,
                        data: 'excel',
                        className: 'btn btn-success btn-sm m-1',
                        default: true,
                        tooltip: 'Agregar',
                    } 
                }
                cb = new ConfigButton(c);
            } else if (Functions.IsObject(b)) {
                cb = new ConfigButton(b);
            }

            var btn: IconButton = new IconButton(cb);
            this.AddButton(btn);

        }

        this.appendChild(this.cell);
    }

    public AddButton(button: Button){
        this.buttons.push(button);
        this.cell.appendChild(button);
    }

    public GetButtons(): Array<Button> {
        return this.buttons;
    }


}

window.customElements.define('data-table-row-operation-bar', DataTableRowOperationBar, { extends: 'tr' });