import { DataTableCellColumn } from "../Cell/DataTableCellColumn";
import { ConfigButton } from "../Config/ConfigButton";
import { ConfigForm } from "../Config/ConfigForm";
import { ConfigList } from "../Config/ConfigList";
import { ConfigModal } from "../Config/ConfigModal";
import { DataForm } from "../Form/DataForm";
import { Functions } from "../Functions/Functions";
import { ListButtons } from "../List/ListButtons";
import { FormModal } from "../Modals/FormModal";
import { OptionsListPopOver } from "../PopOver/OptionsListPopOver";
import { PopOver } from "../PopOver/PopOver";
import { Program } from "../Program/Program";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

export class ColumnOptionsButton extends IconButton {

    private column: DataTableCellColumn;
    private options: OptionsListPopOver;
    private buttons: Array<Button>;

    constructor(col: DataTableCellColumn){
        var config: ConfigButton = new ConfigButton({
            title: '',
            icon: Program.icons.VERTICAL_DOTS,
            className: `${Program.classes.MASSIVE_UPDATE_HEADER} ${Program.bootstrap.BUTTON_LIGHT_SMALL} ${Program.bootstrap.FLOAT_RIGHT}`,
        });
        super(config);
        this.SetColumn(col);
        this.SetPopover();
        this.SetEvents();
    }
    

    private SetColumn(col: DataTableCellColumn): void {
        this.column = col;
    }

    public GetColumn(): DataTableCellColumn {
        return this.column;
    }

    public GetButtons(): Array<Button>{
        return this.buttons;
    }

    public SetPopover(): void {
        var title: string = this.GetColumn().GetConfig().GetTitle();
        var name: string = this.GetColumn().GetConfig().GetData();
        var field: any = this.GetColumn().GetConfig().GetConfig();
        var cell: DataTableCellColumn = this.GetColumn();
        var formMassiveUpdate: DataForm = new DataForm(new ConfigForm({
            floatingForm: true,
            fields: [field],
        }));
        var modalMassiveUpdate: FormModal = new FormModal(new ConfigModal({
            id: `massiveUpdate${name}`,
            title: `Modificación masiva "${title}"`,
            form: formMassiveUpdate,
            buttons: [
                {
                    id: `btnMassiveUpdate${name}`,
                    title: 'Aplicar',
                    type: 'icon',
                    className: 'btn btn-success',
                    width: 100,
                    icon: Program.icons.CHECK,
                    onclick: function() {
                        modalMassiveUpdate.Close();
                    }
                }
            ],
        }));
        
        var config: ConfigList = new ConfigList({
            buttons: [
                {
                    id: '',
                    title: `Copiar "${title}"`,
                    icon: Program.icons.COPY,
                    className: Program.bootstrap.LIST_GROUP_ITEM,
                    type: 'icon',
                },
                {
                    id: '',
                    title: `Seleccionar "${title}"`,
                    icon: Program.icons.CHECK_SQUARE,
                    className: Program.bootstrap.LIST_GROUP_ITEM,
                    type: 'icon',
                },
                {
                    id: `btnListMassiveUpdate${name}`,
                    title: `Modificación masiva "${title}"`,
                    icon: Program.icons.LIST_CHECK,
                    className: Program.bootstrap.LIST_GROUP_ITEM,
                    type: 'icon',
                    onclick: function(){
                        modalMassiveUpdate.Open();
                    }
                },
                {
                    id: `btnListOrder${name}`,
                    title: `Ordenar "${title}"`,
                    icon: Program.icons.ORDERED_LIST,
                    className: Program.bootstrap.LIST_GROUP_ITEM,
                    type: 'icon',
                },
                {
                    id: '',
                    title: `Totalizar "${title}"`,
                    icon: Program.icons.CALCULATOR,
                    className: Program.bootstrap.LIST_GROUP_ITEM,
                    type: 'icon',
                },
                {
                    id: '',
                    title: `Estadísticas "${title}"`,
                    icon: Program.icons.ORDERED_LIST,
                    className: Program.bootstrap.LIST_GROUP_ITEM,
                    type: 'icon',
                },
            ]
        });
        var list: ListButtons = new ListButtons(config);
        this.options = new OptionsListPopOver(this, list);
        this.buttons = list.GetButtons();
        for(var b of this.buttons) {
            var opts: OptionsListPopOver = this.options;
            b.addEventListener(Program.events.CLICK, function(){
                opts.Hide();
            });
        }
    }  

    private SetEvents() {
        var btn: ColumnOptionsButton = this;
        var list: OptionsListPopOver = this.options;
        var btns: Array<Button> = list.GetListButtons().GetButtons();
        if(btns.length > 0) {
            btns[0].addEventListener(Program.events.FOCUSOUT, function(event: FocusEvent) {
                if(Functions.IsNullOrEmpty(event.relatedTarget)){
                    btn.focus();
                    event.stopPropagation();
                    event.preventDefault(); 
                }
            });
        }
        if(btns.length > 1){
            btns[btns.length-1].addEventListener(Program.events.FOCUSOUT, function(event: FocusEvent){
                if(Functions.IsNullOrEmpty(event.relatedTarget)){
                    list.Hide();
                    btn.focus();
                    event.stopPropagation();
                    event.preventDefault(); 
                    event.stopImmediatePropagation();
                }
            }); 
        }
        /* var popover: PopOver = this.options;
        this.addEventListener(Program.events.CLICK, function() {
            debugger;
            popover.Show();
        }); */
    }

}

window.customElements.define('column-options-button', ColumnOptionsButton, { extends: 'button' });
