import { Form } from "../Form/Form";
import { ConfigForm } from "../Config/ConfigForm";
import { ConfigInput } from "../Config/ConfigInput";
import { InputCheckbox } from "../Input/InputCheckbox";
import { InputCheckboxSwitch } from "../Input/InputCheckboxSwitch";
import { InputDate } from "../Input/InputDate";
import { InputFormButton } from "../Input/InputFormButton";
import { InputNumber } from "../Input/InputNumber";
import { InputSelect } from "../Input/InputSelect";
import { InputText } from "../Input/InputText";
import { InputYear } from "../Input/InputYear";
import { LiveSearchInput } from "../Input/LiveSearchInput";
import { IInput } from "../Interfaces/IInput";
import { Program } from "../Program/Program";
import { DataForm } from "../Form/DataForm";
import { Row } from "../Row/Row";
import { ConfigRow } from "../Config/ConfigRow";
import { DataTableRowHeader } from "../Row/DataTableRowHeader";
import { Table } from "../DataTable/Table";
import { DataTableRow } from "../Row/DataTableRow";
import { Cell } from "../Cell/Cell";
import { ConfigCell } from "../Config/ConfigCell";
import { DataTableCell } from "../Cell/DataTableCell";
import { DataTableCellColumn } from "../Cell/DataTableCellColumn";
import { DataTableCellInput } from "../Cell/DataTableCellInput";
import { DataTableRowEmpty } from "../Row/DataTableRowEmpty";
import { DataTableCellCustom } from "../Cell/DataTableCellCustom";
import { DataTableCellRowStatus } from "../Cell/DataTableCellRowStatus";
import { DataTableRowPagination } from "../Row/DataTableRowPagination";
import { DataTableRowOperationBar } from "../Row/DataTableRowOperationBar";
import { ConfigDataTable } from "../Config/ConfigDataTable";
import { Functions } from "../Functions/Functions";
import { IconButton } from "../Buttons/IconButton";
import { ConfigButton } from "../Config/ConfigButton";
import { DataTableCellRowNum } from "../Cell/DataTableCellRowNum";
import { InputButton } from "../Input/InputButton";
import { Button } from "../Buttons/Button";
import { InputSelectBoolean } from "../Input/InputSelectBoolean";

export abstract class Factory {
    static GetOperationBarButton(b: any): Button {
        throw new Error("Method not implemented.");
    }

    public static test(): string {
        return '';
    }

    public static GetForm( config: Object ): Form {
        var c: ConfigForm = new ConfigForm(config);
        var ret: Form = new DataForm(c);
        return ret;
    }

    public static GetInput(config: Object, isForDataTable?: boolean): IInput {
        var ret: IInput = null;
        var c: ConfigInput = new ConfigInput(config);
        var type: string = c.GetType();
        if(!Functions.IsNullOrEmpty(type)){
            if(type === Program.inputTypes.TEXT) {
                ret = new InputText(c);
            }else if(type === Program.inputTypes.NUMBER){
                ret = new InputNumber(c);
            }else if(type === Program.inputTypes.DATE) {
                ret = new InputDate(c);
            }else if(type === Program.inputTypes.LIVE_SEARCH){
                ret = new LiveSearchInput(c);
            }else if(type === Program.inputTypes.SELECT){
                ret = new InputSelect(c);
            } else if(type ===  Program.inputTypes.YEAR){
                ret = new InputYear(c);
            } else if(type ===  Program.inputTypes.CHECKBOX){
                ret = new InputCheckbox(c);
            } else if(type ===  Program.inputTypes.CHECKBOX_SWITCH){
                ret = new InputCheckboxSwitch(c);
            }  else if(type === Program.inputTypes.SELECT_BOOLEAN) {
                ret = new InputSelectBoolean(c);
            } else if(type === Program.inputTypes.BUTTON){
                
            } else if(type === Program.inputTypes.FORM) {
                if(isForDataTable) {
                    ret = new InputFormButton(c);
                } else {
                    ret = Factory.GetForm(config);
                }
            } else if(type === Program.inputTypes.ICON){
                ret = null;
            } else if(type === Program.inputTypes.ROW_NUM) {
                ret = null;
            }else {
                ret = new InputText(c);
            }
        }
        return ret;
    }

    

    public static GetRows(rows: Array<Object>, table: Table): Array<Row> {
        var ret: Array<Row> = new Array<Row>();
        for(var i=0;i<rows.length;i++) {
            var r: Row = Factory.GetRow(rows[i], table);
            ret.push(r);
        }
        return ret;
    }

    public static GetRow(data: Object, table: Table): Row {
        var ret: Row = null;
        var c: ConfigRow = new ConfigRow(data);
        var rowtype: string = c.GetRowType();
        if(rowtype === Program.rowtypes.HEAD){
            ret = new DataTableRowHeader(c);
        } else if(rowtype === Program.rowtypes.BODY){
            ret = new DataTableRow(c);
        } else if(rowtype === Program.rowtypes.EMPTY){
            ret = new DataTableRowEmpty(c);
        } else if(rowtype === Program.rowtypes.PAGINATION){
            ret = new DataTableRowPagination(c);
        } else if(rowtype === Program.rowtypes.OPERATION_BAR) {
            ret = new DataTableRowOperationBar(c);
        }
        ret.SetTable(table);
        ret.Draw();
        return ret;
    }


    public static GetCells(cells: Array<Object>, row: Row): Array<Cell> {
        var ret: Array<Cell> = new Array<Cell>();
        for(var i = 0; i < cells.length; i++) {
            var cell: Cell = Factory.GetCell(cells[i], row);
            ret.push(cell);
        }
        return ret;
    }

    public static GetCell(data: Object, row: Row): Cell {
        var ret: Cell = null;
        var c: ConfigCell = new ConfigCell(data);
        var celltype: string = c.GetCellType();
        var cellname: string = c.GetData();
        var IsInputCell: boolean = c.IsInputCell();
        if(celltype === Program.celltypes.HEAD){
            ret = new DataTableCellColumn(c);
        } else if(celltype === Program.celltypes.BODY) {
            if(cellname === Program.celltypes.ROW_STATUS) {
                ret = new DataTableCellRowStatus(c);
            } else if(cellname === Program.celltypes.ROW_NUM) {
                ret = new DataTableCellRowNum(c);
            } else if(IsInputCell) {
                ret = new DataTableCellInput(c);
            } else {
                ret = new DataTableCellCustom(c);
            }
        }
        ret.SetRow(row);
        ret.Draw();
        return ret;
    }


    public static GetButtons(configs: Array<any>): Array<Button> {
        var ret: Array<Button> = new Array<Button>();
        for(var c of configs){
            var btn: Button = Factory.GetButton(c);
            ret.push(btn);
        }
        return ret;
    }

    public static GetButton(c: any): Button {
        var ret: Button = null;
        if(!Functions.IsNullOrEmpty(c)){
            var config: ConfigButton = new ConfigButton(c);
            var type: string = config.GetType();
            if(type === Program.buttontypes.ICON){
                ret = new IconButton(config);
            }
        }
        return ret;
    }

    public static GetIcon(icon?: string): HTMLElement {
        var ret: HTMLElement = document.createElement('i');
        if(!Functions.IsNullOrEmpty(icon)){
            ret.className = icon;
        }
        return ret;
    }

    public static TransformConfigDataTableToConfigForm(c1: ConfigDataTable, c2: ConfigForm ): void {
        
    }
    

    /* public static GetButton(config: Object): Button {
        var ret: Button = null;
        return ret;
    } */

    /* public static GetDataTable(config: Object): DataTable {
        var ret: DataTable = null;
        return ret;
    } */

    /* public static MakeConfigForm(config: Object): Config {
        var ret: ConfigForm = new ConfigForm(config);
        return ret;
    } */

    
    

    /* public static GetCell(config: Object, isHeader?: boolean): Cell {
        var ret: Cell = null;
        var c: ConfigCell = new ConfigCell(config);
        if(isHeader){
            ret = new DataTableCellColumn(c);
        } else {
            ret = new DataTableCell(c);
        }
        return ret;
    } */

    /* public static GetRows(rows: Array<any>): Array<Row> {
        var ret: Array<Row> = new Array<Row>();
        if(rows.length > 0){
            for(var i = 0; i < rows.length;  i++){
                var row: Row = Factory.GetRow(rows[i]);
                ret.push(row);
            }
        }
        return ret;
    } */

    /* public static GetRow(config: Object, IsHidden?: boolean, isSelected?: boolean): Row {
        var ret: Row = null;
        var ret: Row = null;
        var c: ConfigRow = new ConfigRow(config);
        var ret: Row = new DataTableRow(c);
        ret.Hide(IsHidden);
        if(isSelected){
            ret.Select();
        } else {
            ret.Deselect();
        }
        return ret;
    } */



    /* public GetOperationBarButton(c: any): Button {
        var ret: Button = null;
        var config: ConfigButton = null;
        if(Functions.IsString(c)){
            if(c === Program.defaults.buttons.ADD.type){
                config = new ConfigButton(Program.defaults.buttons.ADD);
            }
        } else {
            config = new ConfigButton(c);
        }  
        var type: string = config.GetType();
        if(type === Program.buttonTypes.ICON){
            ret = new IconButton(config);
        }

        return ret;
    } */

}