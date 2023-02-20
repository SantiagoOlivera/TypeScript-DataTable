import { DataTableCell } from "../Cell/DataTableCell";
import { DataTableCellColumn } from "../Cell/DataTableCellColumn";
import { DataTableCellEditable } from "../Cell/DataTableCellEditable";
import { ConfigDataTableEditable } from "../Config/ConfigDataTable";
import { RowStatus } from "../Enum/RowStatus";
import { InputButton } from "../Input/InputButton";
import { Input } from "../Input/Input";
import { InputNumber } from "../Input/InputNumber";
import { InputText } from "../Input/InputText";
import { DataTableRow } from "../Row/DataTableRow";
import { DataTableRowEditable } from "../Row/DataTableRowEditable";
import { DataTableRowHeader } from "../Row/DataTableRowHeader";
import { DataTable } from "./DataTable";
import { DataTableRowEmpty } from "../Row/DataTableRowEmpty";
import { ISelectable } from "../Interfaces/ISelectable";
import { IconCell } from "../Input/IconCell";
import { IconCellRowStatus } from "../Input/IconCellRowStatus";
import { IInput } from "../Interfaces/IInput";
import { InputSelect } from "../Input/InputSelect";
import { OptionSelect } from "../Input/OptionSelect";
import { LiveSearchInput } from "../Input/LiveSearchInput";

export class DataTableEditable extends DataTable {

    public static DEFAULT_DECIMALS_SEPARATOR: string = ',';

    public static readonly ROW_STATUS_COLUMN = {
        data: 'rowStatus',
        title: 'row status',
        type: 'icon',
        className: 'text-center h2',
    };

    constructor(config: ConfigDataTableEditable){
        super(config);
        this.Draw();
        this.SetMoveDtEvent();
    }

    private SetHead(config: ConfigDataTableEditable):void{
        
        var rowNum: boolean = config.GetRowNum();
        var rowStatus: boolean = config.GetRowStatus();
        var columns = config.GetColumns();
        var cols: Array<DataTableCellColumn> = [];
        
        if(rowStatus){
            columns.unshift(DataTableEditable.ROW_STATUS_COLUMN);
        }

        if(rowNum){
            columns.unshift(DataTableEditable.ROW_NUM_COLUMN);
        }

        

        for(var c of columns){
            cols.push(
                new DataTableCellColumn(
                    c[this.props.DATA], 
                    c[this.props.TITLE]
                )
            );
        }

        var tr:DataTableRowHeader = new DataTableRowHeader(cols);

        this.AppendChildHead(tr);


    }

    private SetBody(config: ConfigDataTableEditable):void{
        
        var rowNum: boolean = config.GetRowNum();
        var rowStatus: boolean = config.GetRowStatus();
        var rows = config.GetRows();
        var columns = config.GetColumns();

        var rowsLength = rows.length;
        var colsLength = columns.length;
        
        if(rowsLength === 0){
            this.AppendChildBody(new DataTableRowEmpty(colsLength));
        }else{
            //ROWS
            for(var i=0; i<rowsLength; i++){
                
                var r = rows[i];
                var row: DataTableRowEditable = null;
                var column = null;
                var value = null;
                var input: IInput = null;
                var type: string = null;
                var decimals: number = null;
                var cell: DataTableCell = null;
                var cells: Array<DataTableCell> = new Array<DataTableCell>();
                var className: string = null;
                var columnName: string = null;
                var options: Array<any>= null;
                var opts: Array<OptionSelect> = new Array<OptionSelect>();

                if(rowNum){
                    r[this.props.ROW_NUM] = (i+1);
                }
                
                if(rowStatus){
                    r[this.props.ROW_STATUS] = RowStatus.NORMAL.toString();
                }

                //COLS
                for(var x=0; x<colsLength; x++){
                    
                    column = columns[x];
                    value = r[column.data];
                    type = column.type;
                    columnName = column.data ? column.data : '';
                    decimals = column.decimals;
                    className = column.className ? column.className : '';
                    options = column.options;
                    

                    if(type === 'number'){
                        input = new InputNumber(
                            value, 
                            decimals, 
                            DataTableEditable.DEFAULT_DECIMALS_SEPARATOR
                        );
                    }else if(type === 'icon'){
                        input =  new IconCellRowStatus(RowStatus.UPDATED);
                    } else if(type === 'rowNum'){
                        input =  new InputButton(undefined, value);
                    } else if(type === 'select'){

                        for(var o of options){
                            opts.push(new OptionSelect(o.id, o.text))
                        }

                        console.log(value, opts);
                        input = new InputSelect(value, opts);

                    } else if(type === 'livesearch'){
                        
                        input = new LiveSearchInput(value)

                    } else {
                        input = new InputText(value);
                    }

                    cell = new DataTableCellEditable(columnName, i, x, input, className);

                    cells.push(cell);
                    
                }

                row = new DataTableRowEditable(i, cells, true, true);

                row.Draw();

                this.AddRow(row);

                this.AppendChildBody(row);

            }

        }

    }

    public Draw(): void {
        this.setAttribute('border', '0');
        var config: ConfigDataTableEditable = <ConfigDataTableEditable>this.GetConfig();
        this.Destroy();
        this.SetHead(config);
        this.SetBody(config);
    }

    private SetMoveDtEvent():void {

        this.addEventListener(this.events.KEYDOWN, function(e){
            
            var event = <KeyboardEvent>e;
            var keyCode = event.keyCode;
            
            var altKey = event.altKey;
            var ctrlKey = event.ctrlKey;
            var shiftKey = event.shiftKey;
            var ele = <Input>event.target;

            var parent = <DataTableCellEditable>ele.parentElement;
            var x: number = null;
            var y: number = null;

            console.log(
                "Test event", 
                "Evento:", event, 
                "KeyCode:", keyCode, 
                "Element:",ele,
                "TD:" , parent, 
                "IDX ROW:" , parent.GetRow(), 
                "IDX COL:" , parent.GetCol(),
                "INPUT ELEMENT:" , parent.GetInput()
            );

            
            y = parent.GetRow();
            x =  parent.GetCol();
 
            if(
                (!altKey && !shiftKey && !ctrlKey) 
                &&
                (
                    keyCode === this.keys.ARROW_LEFT    || 
                    keyCode === this.keys.ARROW_RIGHT   || 
                    keyCode === this.keys.ARROW_UP      ||
                    keyCode === this.keys.ARROW_DOWN 
                )
            ){
                
                switch(keyCode){
                    case this.keys.ARROW_LEFT:
                        x-=1;
                        break;
                    case this.keys.ARROW_RIGHT:
                        x+=1;
                        break;
                    case this.keys.ARROW_UP:
                        y-=1;
                        break;
                    case this.keys.ARROW_DOWN:
                        y+=1;
                        break;
                }

                this.moveCell(x,y);
                event.preventDefault();
            }else{
                switch(keyCode){
                    case this.keys.ENTER:
                        break;
                    case this.keys.SUPR:
                        this.Supr(x, y);
                    case this.keys.DELETE:
                        this.Supr(x, y);
                        break;
                }
            }
        });

        
    }

    private Supr(x: number, y: number){
        var row: DataTableRow = this.GetRow(y);
        var cell: DataTableCellEditable = null;
        var input: IInput = null;
        if(row){
            cell = <DataTableCellEditable>row.GetCell(x);
            if(cell){
                console.log(cell, y, x);
                input = <IInput>cell.GetInput();
                input.Supr();
            }
        }  
    }

    private moveCell(x: number, y: number):void{
        var row: DataTableRow = this.GetRow(y);
        var cell: DataTableCellEditable = null;
        if(row){
            cell = <DataTableCellEditable>row.GetCell(x);
            if(cell){
                cell.Focus();
            }
        }     
    }

}

window.customElements.define('data-table-editable', DataTableEditable, { extends: 'table' });