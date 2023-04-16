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
import { LiveSearchInput, LiveSearchOption } from "../Input/LiveSearchInput";
import { CellMoveDirection } from "../Enum/CellMoveDirection";
import { DataTableOperationBar } from "../DataTableOperationBar/DataTableOperationBar";
import { InputDate } from "../Input/InputDate";

export class DataTableEditable extends DataTable {

    public static DEFAULT_DECIMALS_SEPARATOR: string = ',';
    public static DEFAULT_THOUSAND_SEPARATOR: string = '.';

    public readonly colType = {
        NUMBER: 'number',
        ICON: 'icon',
        ROW_NUM: 'rowNum',
        SELECT: 'select',
        LIVE_SEARCH: 'livesearch',
        DATE: 'date',
    }

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
        this.SetChangeDtEvent();
        this.AddDataTableClassName();
    }

    

    private AddDataTableClassName():void{
        this.className += ` DataTableEditable`;
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
        
        var newTr = <DataTableRow>document.createElement('tr');
        var newTd = <DataTableCellEditable>document.createElement('td');
        newTr.appendChild(newTd);
        newTd.colSpan = tr.children.length;

        //this.GetConfig()
        var opBar: DataTableOperationBar = new DataTableOperationBar( this );
        newTd.appendChild(opBar); 

        this.AppendChildHead(newTr);

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
                    

                    if(type === this.colType.NUMBER){
                        var decimalsSeparator: string = column.decimalsSeparator;
                        var thousandSeparator: string = column.thousandSeparator;

                        if(!decimalsSeparator){
                            decimalsSeparator = '';
                        }
                        if(!thousandSeparator){
                            thousandSeparator = '';
                        }

                        input = new InputNumber(
                            value, 
                            decimals, 
                            decimalsSeparator,
                            thousandSeparator
                        );
                    }else if(type === this.colType.ICON){
                        input =  new IconCellRowStatus(RowStatus.NORMAL);
                    } else if(type === this.colType.ROW_NUM){
                        input =  new InputButton(undefined, value);
                    } else if(type === this.colType.SELECT){
                        for(var o of options){
                            opts.push(new OptionSelect(o.id, o.text))
                        }
                        //console.log(value, opts);
                        input = new InputSelect(value, opts);
                    } else if(type === this.colType.LIVE_SEARCH){
                        var val: LiveSearchOption = null;
                        if(value){
                            val = new LiveSearchOption(value['id'], value['text']);
                        }
                        input = new LiveSearchInput(val);
                    } else if (type === this.colType.DATE){
                        input =  new InputDate(value);
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


    public GetData(): Array<object>{
        var data: Array<any> = new Array<any>();
        var config: ConfigDataTableEditable = <ConfigDataTableEditable>this.GetConfig();
        var rows: Array<DataTableRowEditable> = <Array<DataTableRowEditable>>this.GetRows();
        for(var r of rows) {
            var d: any = r.GetData();
            data.push(d);
        }

        return data;
    }

    private SetChangeDtEvent():void {

        this.addEventListener(this.events.CHANGE, function(e: Event){
            
            //Get config
            var config: ConfigDataTableEditable = <ConfigDataTableEditable>this.GetConfig();
            //Get if use row status
            var rowStatus: boolean = config.GetRowStatus();
            
            if(rowStatus){

                //Input
                var input = <IInput><unknown>e.target;
                //HTML Element Input
                var htmlElement: HTMLElement = <HTMLElement><unknown>input;
                //Cell td
                var td: DataTableCellEditable = <DataTableCellEditable>htmlElement.parentElement;
                //Row tr
                var tr: DataTableRowEditable = <DataTableRowEditable>td.parentElement;
                //Row Idx
                var rowIdx: number = tr.GetRowNum();
                //Value
                var value = input.GetValue();
                //Row datatable editable
                var row: DataTableRowEditable = <DataTableRowEditable>this.GetRow(rowIdx);
                //Cell datatable editable
                var cell: DataTableCellEditable = row.GetRowStatusCell();
                //Row status icon cell
                var rowStatusIconCell = <IconCellRowStatus>cell.GetInput();
                
                //console.log(row, cell, rowStatusIconCell);

                //Set update value
                rowStatusIconCell.SetValue(RowStatus.UPDATED);
                //Re Render icon
                rowStatusIconCell.Render();
                
            }
            //console.log(value, config, e.target, rowIdx, config.GetRows());
        });

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
            var direction: CellMoveDirection = null;
            
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
                        direction = CellMoveDirection.LEFT;
                        break;
                    case this.keys.ARROW_RIGHT:
                        x+=1;
                        direction = CellMoveDirection.RIGHT;
                        break;
                    case this.keys.ARROW_UP:
                        y-=1;
                        direction = CellMoveDirection.UP;
                        break;
                    case this.keys.ARROW_DOWN:
                        y+=1;
                        direction = CellMoveDirection.DOWN;
                        break;
                }

                this.moveCell(x,y, direction);
                event.preventDefault();
            }else{
                switch(keyCode){
                    case this.keys.ENTER:
                        break;
                    /* case this.keys.SUPR:
                        this.Supr(x, y);
                    case this.keys.DELETE:
                        this.Supr(x, y);
                        break; */
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
                input = <IInput>cell.GetInput();
                input.Supr();
            }
        }  
    }

    private moveCell(
        x: number, 
        y: number, 
        dir: CellMoveDirection
    ):void {

        var row: DataTableRow = this.GetRow(y);
        var cell: DataTableCellEditable = null;

        if(row){
            console.log("Move cell:", cell, y, x);
            cell = <DataTableCellEditable>row.GetCell(x);
            if(cell){
                var input: IInput = cell.GetInput();
                if(input.IsFocusable()){
                    input.Focus();
                }else{
                    console.log("Jump cell:", cell, y, x, input);
                    switch(dir){
                        case CellMoveDirection.UP:
                            y++; 
                            break;
                        case CellMoveDirection.DOWN:
                            y--;
                            break;
                        case CellMoveDirection.LEFT:
                            x--;
                            break;
                        case CellMoveDirection.RIGHT:
                            x++;
                            break;
                    }

                    this.moveCell(x, y, dir);
                }

            }
        }     
    }

}

window.customElements.define('data-table-editable', DataTableEditable, { extends: 'table' });