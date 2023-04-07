import { ConfigDataTableReadOnly } from '../Config/ConfigDataTable';
import { DataTable } from './DataTable';
import { DataTableCellColumn } from '../Cell/DataTableCellColumn';
import { DataTableRowHeader } from '../Row/DataTableRowHeader';
import { DataTableRowReadOnly } from '../Row/DataTableRowReadOnly';
import { DataTableCellReadOnly } from '../Cell/DataTableCellReadOnly';
import * as $ from 'jquery';
import "jquery-ui/dist/jquery-ui";

export class DataTableReadOnly extends DataTable{
    
    constructor(config: ConfigDataTableReadOnly){
        super(config);
        this.Draw();
    }

    private SetHead():void{
        var config: ConfigDataTableReadOnly = this.GetConfig();
        var rowNum: boolean = config.GetRowNum();
        var columns = config.GetColumns();
        var resizableColumns: boolean = config.GetResizableColumns();
        //console.log("Cols",columns);
        var cols: Array<DataTableCellColumn> = [];
        if(rowNum){
            columns.unshift(DataTableReadOnly.ROW_NUM_COLUMN);
        }

        for(var c of columns){
            cols.push(new DataTableCellColumn(c.data, c.title, resizableColumns));
        }

        var tr:DataTableRowHeader = new DataTableRowHeader(cols);

        this.AppendChildHead(tr);
    }

    private SetBody():void{
        var rowNum: boolean = this.GetConfigRowNum();
        var columns = this.GetConfigColumns();
        var rows = this.GetConfigRows();
        for(var i=0; i<rows.length; i++){
            
            var r = rows[i];
            var value = null;
            var cell: DataTableCellReadOnly = null;
            var cells: Array<DataTableCellReadOnly> = new Array<DataTableCellReadOnly>();

            if(rowNum){
                r[this.props.ROW_NUM] = (i+1).toString();
            }
            
            for(var x=0; x<columns.length; x++){
                var column = columns[x];
                value = r[column.data];

                cell = new DataTableCellReadOnly(column.data, value);
                cells.push(cell);
            }

            var row = new DataTableRowReadOnly(cells);

            this.AppendChildBody(row);

        }
    }

    private SetFoot():void{

    }

    private InitResizableColumns(): void{
        $(this).find('th').resizable({
            //alsoResize: '',
            handles: 'e, w',
        });
    }

    public Draw(): void {
        this.Destroy();
        this.SetHead();
        this.SetBody();
        this.SetFoot();
        //this.InitResizableColumns();
    } 

    public GetData(): void {
        throw new Error('Method not implemented.');
    }
}

window.customElements.define('data-table-read-only', DataTableReadOnly, { extends: 'table' });
