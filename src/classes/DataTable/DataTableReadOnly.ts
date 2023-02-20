import { ConfigDataTableReadOnly } from '../Config/ConfigDataTable';
import { DataTable } from './DataTable';
import { DataTableCellColumn } from '../Cell/DataTableCellColumn';
import { DataTableRowHeader } from '../Row/DataTableRowHeader';
import { DataTableRowReadOnly } from '../Row/DataTableRowReadOnly';
import { DataTableCellReadOnly } from '../Cell/DataTableCellReadOnly';

export class DataTableReadOnly extends DataTable{
    
    constructor(config: ConfigDataTableReadOnly){
        super(config);
        this.Draw();
    }

    public Draw(): void {

        this.Destroy();
        
        var rowNum: boolean = this.GetConfigRowNum();
        var rows = this.GetConfigRows();
        var columns = this.GetConfigColumns();
        
        console.log("Cols",columns);
        var cols: Array<DataTableCellColumn> = [];

        if(rowNum){
            columns.unshift(DataTableReadOnly.ROW_NUM_COLUMN);
        }

        for(var c of columns){
            cols.push(new DataTableCellColumn(c.data, c.title));
        }

        var tr:DataTableRowHeader = new DataTableRowHeader(cols);

        this.AppendChildHead(tr);

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
}

window.customElements.define('data-table-read-only', DataTableReadOnly, { extends: 'table' });
