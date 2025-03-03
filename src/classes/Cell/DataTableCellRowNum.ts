import { Button } from "../Buttons/Button";
import { RowNumButton } from "../Buttons/RowNumButton";
import { ConfigButton } from "../Config/ConfigButton";
import { ConfigCell } from "../Config/ConfigCell";
import { ConfigList } from "../Config/ConfigList";
import { Functions } from "../Functions/Functions";
import { InputRowNum } from "../Input/InputRowNum";
import { IFocusable } from "../Interfaces/IFocusable";
import { IInput } from "../Interfaces/IInput";
import { ListButtons } from "../List/ListButtons";
import { OptionsListPopOver } from "../PopOver/OptionsListPopOver";
import { Program } from "../Program/Program";
import { Row } from "../Row/Row";
import { DataTableCell } from "./DataTableCell";
import { DataTableCellInput } from "./DataTableCellInput";

export class DataTableCellRowNum extends DataTableCell {
    

    private button: RowNumButton;
    private options: OptionsListPopOver;
    
    constructor(config: ConfigCell) {
        super(config);
        this.className += ' row-num';
    }

    public GetValue() {

    }

    public SetValue(value: any): void {

    }

    public IsFocusable(): boolean {
        return this.button.GetConfig().GetEditable();
    }
    public Focus(): void {
        this.button.focus();
    }

    public Draw(): void {
        this.innerHTML = '';
        var num: number = this.GetRow().GetIndexNode()+1;
        var cell: DataTableCell = this;
        if(!Functions.IsNullOrEmpty(num)){
             this.button = new RowNumButton(new ConfigButton({
                index: num,
             }));
             this.button.Draw();
             debugger;
             var list: ListButtons = new ListButtons(new ConfigList({
                buttons: [
                    { 
                        title: `Seleccionar`,
                        id: 'btnSelect',
                        icon: Program.icons.CHECK_SQUARE,
                        type: 'icon',
                        hidden: false,
                        className: Program.bootstrap.LIST_GROUP_ITEM,
                    },
                    { 
                        title: `Eleminar`,
                        id: 'btnDelete',
                        icon: Program.icons.DELETE,
                        type: 'icon',
                        className: Program.bootstrap.LIST_GROUP_ITEM,
                        hidden: false,
                        onclick: function() {
                            var row: Row = cell.GetRow();
                            row.Editable(false);
                            list.HideButton('btnDelete', true);
                            list.HideButton('btnUndo', false);
                        },
                    },
                    { 
                        title: `Deshacer`,
                        id: 'btnUndo',
                        icon: Program.icons.DELETE,
                        type: 'icon',
                        className: Program.bootstrap.LIST_GROUP_ITEM,
                        hidden: true,
                        onclick: function() {
                            var row: Row = cell.GetRow();
                            row.Editable(true);
                            list.HideButton('btnUndo', true);
                            list.HideButton('btnDelete', false);
                        },
                    },
                    { 
                        title: `Ver cambios`,
                        id: 'btnSeeChanges',
                        icon: Program.icons.EYE,
                        type: 'icon',
                        hidden: false,
                        className: Program.bootstrap.LIST_GROUP_ITEM,
                    },
                    { 
                        title: `Clonar`,
                        id: 'btnClone',
                        icon: Program.icons.COPY,
                        type: 'icon',
                        hidden: false,
                        className: Program.bootstrap.LIST_GROUP_ITEM,
                    },
                ],   
             }));
             this.options = new OptionsListPopOver(this.button, list);
             this.appendChild(this.button);
        }   
    }
    public Disable(disabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    public Editable(editable: boolean): void {
        throw new Error("Method not implemented.");
    }
}

window.customElements.define('data-table-cell-row-num', DataTableCellRowNum, { extends: 'td' });