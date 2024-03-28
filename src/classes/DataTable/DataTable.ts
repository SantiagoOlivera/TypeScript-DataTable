import { Button } from "../Buttons/Button";
import { Cell } from "../Cell/Cell";
import { DataTableCell } from "../Cell/DataTableCell";
import { DataTableCellColumn } from "../Cell/DataTableCellColumn";
import { Config } from "../Config/Config";
import { ConfigCell } from "../Config/ConfigCell";
import { ConfigDataTable } from "../Config/ConfigDataTable";
import { ConfigForm } from "../Config/ConfigForm";
import { ConfigInput } from "../Config/ConfigInput";
import { ConfigModal } from "../Config/ConfigModal";
import { ConfigPagination } from "../Config/ConfigPagination";
import { ConfigRow } from "../Config/ConfigRow";
import { DataTableOperationBar } from "../DataTableOperationBar/DataTableOperationBar";
import { CellMoveDirection } from "../Enum/CellMoveDirection";
import { RowStatus } from "../Enum/RowStatus";
import { FormEditable } from "../Form/FormEditable";
import { Functions } from "../Functions/Functions";
import { IconCellRowStatus } from "../Input/IconCellRowStatus";
import { Input } from "../Input/Input";
import { InputButtonRowNumber } from "../Input/InputButtonRowNumber";
import { InputDate } from "../Input/InputDate";
import { InputFormButton } from "../Input/InputFormButton";
import { InputNumber } from "../Input/InputNumber";
import { InputSelect } from "../Input/InputSelect";
import { InputText } from "../Input/InputText";
import { LiveSearchInput } from "../Input/LiveSearchInput";
import { OptionSelect } from "../Input/OptionSelect";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { ISelectable } from "../Interfaces/ISelectable";
import { FormModal } from "../Modals/FormModal";
import { Program } from "../Program/Program";
import { DataTableRow } from "../Row/DataTableRow";
import { DataTableRowEmpty } from "../Row/DataTableRowEmpty";
import { DataTableRowHeader } from "../Row/DataTableRowHeader";
import { DataTableRowOperationBar } from "../Row/DataTableRowOperationBar";
import { DataTableRowPagination } from "../Row/DataTableRowPagination";


export class DataTable extends HTMLTableElement implements IDraw {

    public static readonly MSG_ERROR_CONSTRUCTOR_CONFIG_REQUIRED = "Error: DataTable config is required to create table";

    public readonly colType = {
        NUMBER: 'number',
        ICON: 'icon',
        ROW_NUM: 'rowNum',
        SELECT: 'select',
        LIVE_SEARCH: 'livesearch',
        DATE: 'date',
        FORM: 'form',
    }
    
    public static readonly ROW_NUM_COLUMN = {
        data: 'rowNum',
        name: 'rowNum',
        title: '#',
        type: 'rowNum',
        innerHTML: '',
    };

    public static readonly ROW_STATUS_COLUMN = {
        data: 'rowStatus',
        name: 'rowStatus',
        title: '',
        type: 'icon',
        className: 'text-center',
    };

    public static readonly EMPTY_ARRAY: Array<any> = [];

    readonly events = {
        KEYDOWN: 'keydown',
        CLICK:'click',
        CHANGE: 'change',
        DOUBLE_CLICK: 'dblclick',
    }

    readonly keys = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        SUPR: 46,
        ENTER: 13,
        DELETE: 8,
    }

    readonly props = {
        DATA: 'data',
        TITLE: 'title',
        ROW_NUM: 'rowNum',
        COLUMNS: 'columns',
        ROWS: 'rows',
        type: 'type',
        ROW_STATUS: 'rowStatus',
        HIDDEN: 'hidden',
    }

    readonly tags = {
        THEAD: 'thead',
        TBODY: 'tbody',
        TFOOT: 'tfoot',
    }
    
    private thead: HTMLElement;
    private tbody: HTMLElement;
    private tfoot: HTMLElement;
    private config: ConfigDataTable;
    private rowsdata: Array<any>;
    private rowsList: Array<DataTableRow>;
    private operationbar: DataTableRowOperationBar;
    private pagination: DataTableRowPagination;
    private quantityPages: number = 1;
    private currentPage: number = 0;
    private elementsPerPage: number = 0;
    private addFormModal: FormModal;
    

    constructor(config: ConfigDataTable){  
        super();
        this.Init();
        if(!Functions.IsNullOrEmpty(config)){
            this.SetTags();
            this.SetConfig(config);
            var data: Array<any> = config.GetRows();
            this.SetRowsData(data);
        }else{
            throw new Error(DataTable.MSG_ERROR_CONSTRUCTOR_CONFIG_REQUIRED);
        }

        this.className = 'table';
        this.Draw();
    }

    private Init(): void {
        this.rowsList = new Array<DataTableRow>();
    }

    
    private Load(): void {

        var config: ConfigDataTable = <ConfigDataTable>this.GetConfig();
        
        //var rows = config.GetRows();
        var rows: Array<any> = this.GetRowsData();
        var columns = config.GetColumns();
        var isSelectable = true;
        var rowsLength = rows.length;
        var colsLength = columns.length;
        var pagination: ConfigPagination = this.GetConfig().GetPagination();
        var elementsPerPage: number = rowsLength;
        var quantityPages: number = 1;
        
        if(!Functions.IsNullOrEmpty(pagination)) {
            var paginationLength: number = pagination.GetLength();
            if(!Functions.IsNullOrEmpty(paginationLength)) {
                quantityPages = Number((rowsLength / paginationLength).toFixed(0));
                elementsPerPage = paginationLength;
            }
        }
        
        this.elementsPerPage = elementsPerPage;
        this.quantityPages = quantityPages;
        

        if(rowsLength === 0){
            this.AppendChildBody(new DataTableRowEmpty(colsLength));
        } else {
            //ROWS
            var data: Array<any> = this.GetRowsData();
            for(var i=0; i<data.length; i++) {

                var r: any = rows[i];
                var row: DataTableRow = null;
                var cells: Array<DataTableCell> = new Array<DataTableCell>();
                var hiderow: boolean = true;
                var isSelected: boolean = false;

                if( 
                    i>this.GetFirstPageIndex() - 1 && 
                    i<=this.GetLastPageIndex() - 1
                ) {
                    hiderow = false;
                }
                
               /*  if(rowNum){
                    r[this.props.ROW_NUM] = (i+1);
                }
                if(rowStatus){
                    r[this.props.ROW_STATUS] = RowStatus.NORMAL.toString();
                } */

                //COLS
                cells = this.CreateCells(r, i);
                row = this.CreateRow(
                    i,
                    cells,
                    isSelected,
                    RowStatus.NORMAL,
                    hiderow
                );
                    
                this.AddRow(row);
                this.AppendChildBody(row);

            }
        }
    }

    private CreateRow(
        idx: number, 
        cells: Array<DataTableCell>, 
        isSelected: boolean,
        rowStatus: RowStatus,
        IsHidden: boolean
    ) : DataTableRow {
        
        var ret: DataTableRow = null;
        var isSelectable: boolean = true;

        var cr: ConfigRow = new ConfigRow({ 
            rowNum: idx, 
            cells: cells,
            isSelectable: isSelectable,
            rowStatus: rowStatus,
            datatable: this,
        });

        var row: DataTableRow = new DataTableRow(cr);
        for(var c of cells){
            c.SetRow(row);
        }
        /* var btnNum: InputButtonRowNumber = <InputButtonRowNumber>((<DataTableCell>row.GetRowNumberCell()).GetInput());
        btnNum.SetRow(row); */
        if(isSelected){
            row.Select();
        } else {
            row.Deselect();
        }

        row.Hide(IsHidden);

        if(rowStatus === RowStatus.NEW){
            var cell: Cell = row.GetRowStatusCell();
            var rowStatusIconCell = <IconCellRowStatus>cell.GetConfig().GetInput();
            rowStatusIconCell.SetValue(rowStatus);
            rowStatusIconCell.Render();
        }

        row.SetIdx(idx);

        ret = row;

        return ret;
    }

    private CreateCells(r: any, i: number): Array<DataTableCell> {

        var ret: Array<DataTableCell> = null;

        var columns: Array<any> = this.GetConfigColumns();
        var colsLength: number = columns.length;
        
        var column: any = null;
        var value: any = null;
        var input: IInput = null;
        var type: string = null;
        var decimals: number = null;
        var cell: DataTableCell = null;
        var cells: Array<DataTableCell> = new Array<DataTableCell>();
        var className: string = null;
        var columnName: string = null;
        var options: Array<any>= null;
        var opts: Array<OptionSelect> = new Array<OptionSelect>();
        var disabled: boolean = false;
        var hidden: boolean = false;
        var decimalsSeparator: string = null;
        var thousandSeparator: string = null;


        for(var x=0; x<colsLength; x++){
                    
            column = columns[x];
            value = r[column.data];
            column.value = value;

            var ci: ConfigInput = new ConfigInput(column);
            type = ci.GetType();
            columnName = ci.GetData();
            decimals = ci.GetDecimals();
            className = ci.GetClassName();
            options = ci.GetOptions();
            disabled = ci.GetDisabled();
            hidden = column.hidden;
            decimalsSeparator = ci.GetDecimalsSeparator();
            thousandSeparator = ci.GetThousandSeparator();

            if(type === this.colType.NUMBER) {
                input = new InputNumber(ci);
            }else if(type === this.colType.ICON){
                input = new IconCellRowStatus(RowStatus.NORMAL);
            } else if (type === this.colType.ROW_NUM) {
                ci.SetInnerHTML((i+1).toString());
                input = new InputButtonRowNumber(ci);
            } else if(type === this.colType.SELECT){
                input = new InputSelect(ci);
            } else if(type === this.colType.LIVE_SEARCH){
                input = new LiveSearchInput(ci);
            } else if (type === this.colType.DATE){
                input = new InputDate(ci);
            } else if (type === this.colType.FORM) {
                ci.SetInnerHTML(ci.GetTitle());
                input = new InputFormButton(ci);
            } else {
                input = new InputText(ci);
            }
            
            if(input != null){
                input.Disable(disabled);
                input.Hide(hidden);
            }

            column.data = columnName;
            column.columnName = columnName;
            column.row = i;
            column.col = x;
            column.input = input;
            column.editable = true;


            var cc: ConfigCell = new ConfigCell(column);
            cell = new DataTableCell(cc);

            console.log('config cell', cell.GetConfig(), cell);
            cells.push(cell);
            
        }

        ret = cells;

        return ret;
    }
    


    private SetRowsData(data: Array<any>): void {
        this.rowsdata = data;
    }
    private AddRowData(data: any): void {
        this.rowsdata.push(data);
    }

    private GetRowsData(): Array<any> {
        return this.rowsdata;
    }

    public AddData(data: any): void {
        var rowStatus: RowStatus = RowStatus.NEW;
        var IsHidden: boolean = false;
        var isSelectable: boolean = false;

        if(Functions.IsArray(data)){
            for(var d of data){
                this.AddRowData(d);
            }
        } else if(Functions.IsObject(data)) {

            var idx: number = this.GetRowsData().length-1;
            var cells: Array<DataTableCell> = this.CreateCells(data, this.GetRowsData().length);
            
            var row: DataTableRow = this.CreateRow(
                idx, 
                cells, 
                isSelectable, 
                rowStatus, 
                IsHidden
            );

            this.AddRowData(data);
            this.AppendChildBody(row);
            this.AddRow(row);

            this.Refresh();
        }
    }

    private GetDataRow(): DataTableRow {
        var ret: DataTableRow = null;
        
        return ret;
    }

    public AddRow(row: DataTableRow) : void {
        var rowStatus: RowStatus = row.GetRowStatus();
        if(rowStatus === RowStatus.NEW) {
            //this.newrows.push(row);
            //row.SetIdx(-1*this.newrows.length);
            this.rowsList.unshift(row);
        } else {

            this.rowsList.push(row);
            //row.SetIdx(this.rowsList.length);
            //this.rowsList.push(row);
        }
    }
    

    public Draw(): void {
        //var config: ConfigDataTable = this.GetConfig();
        this.setAttribute('border', '0');
        this.Destroy();
        this.SetHead();
        this.SetBody();
        this.SetFoot();
        this.SetMoveDtEvent();
        this.SetChangeDtEvent();
    }

    private SetBody(): void {
        this.Load();
    }

    private SetTags(): void {
        this.thead = document.createElement(this.tags.THEAD);
        this.tbody = document.createElement(this.tags.TBODY);
        this.tfoot = document.createElement(this.tags.TFOOT);
        this.appendChild(this.thead);
        this.appendChild(this.tbody);
        this.appendChild(this.tfoot);
    }

    private SetConfig(config: ConfigDataTable){
        this.config = config;
    }

    

    public GetRow( idx: number ): any{
        var row: DataTableRow = null;
        if(idx < this.rowsList.length){
            row = this.rowsList[idx];
        }
        /* if(idx < this.rowsList.length && idx >= 0) {
            row = this.rowsList[idx];
        } else if(idx < 0) {
            idx = idx*(-1);
            row = this.newrows[idx];
        } */
        return row;
    }

    public GetRows(): Array<DataTableRow> {
        return this.rowsList;
    }

    private GetFirstPageIndex(): number {
        var ret: number = 0;
        ret = ( this.currentPage * this.elementsPerPage );
        return ret;
    }

    private GetLastPageIndex(): number {
        var ret: number = 0;
        var length: number = this.GetRowsData().length;
        ret = ( this.currentPage * this.elementsPerPage ) + this.elementsPerPage;
        if(ret > length){
            ret = length;
        }
        return ret;
    }

    public Destroy() {
        this.thead.innerHTML = null;
        this.Empty();
        this.tfoot.innerHTML = null;
    }

    public Empty(): void {
        this.rowsList = new Array<DataTableRow>();
        this.tbody.innerHTML = null;
    }

    public Refresh(): void {
        var hiderow: boolean = true;
        var min: number = (this.currentPage * this.elementsPerPage);
        var max: number = min + this.elementsPerPage;
        for(var i=0; i<this.rowsList.length; i++){
            hiderow = true;
            if( i>=min && i<max) {
                hiderow = false;
            }
            this.rowsList[i].Hide(hiderow);
            this.rowsList[i].SetIdx(i);
        }
    }

    //Create table methods
    public AppendChildBody(row: DataTableRow){
        if(row.GetRowStatus() === RowStatus.NEW) {
            this.tbody.insertBefore(row, this.tbody.firstChild);
        } else {
            this.tbody.appendChild(row);
        }
    }

    public AppendChildHead(row: DataTableRow){
        this.thead.appendChild(row);
    }

    public AppendChildFoot(row: DataTableRow){
        this.tfoot.appendChild(row);
    }


    public GetPaginationSize(): number {
        return 0;
    }

    //Configs
    public GetConfig(): ConfigDataTable {
        return this.config;
    }

    public GetConfigRows(){
        return this.config.GetRows();
    }

    public GetConfigColumns(){
        return this.config.GetColumns();
    }

    public GetConfigRowNum(): boolean {
        return this.config.GetRowNum();
    }  
    


    private SetSelectEvent(): void {
        
    }


    private SetHead(): void {

        var config: ConfigDataTable = <ConfigDataTable>this.GetConfig();
        var rowNum: boolean = config.GetRowNum();
        var rowStatus: boolean = config.GetRowStatus();
        var columns = config.GetColumns();
        var cols: Array<DataTableCellColumn> = [];
        
        if(rowStatus){
            columns.unshift(DataTable.ROW_STATUS_COLUMN);
        }

        /* if(rowNum){
            columns.unshift(DataTable.ROW_NUM_COLUMN);
        } */

        for(var c of columns){
            var cc: ConfigCell = new ConfigCell(c);
            var dtcc: DataTableCellColumn = new DataTableCellColumn(cc);
            cols.push(dtcc);
        }

        var cr: ConfigRow = new ConfigRow({
            rowNum: rowNum,
            cells: cols,
        });
        var tr :DataTableRowHeader = new DataTableRowHeader(cr);
        //Set Header text
        var trHdText = <DataTableRow>document.createElement('tr');
        var tdHdText = <DataTableCell>document.createElement('td');
        tdHdText.colSpan = tr.children.length;
        tdHdText.innerText = config.GetHeaderText();
        trHdText.appendChild(tdHdText);

        //Set Operation Bar
        this.SetOperationBar();

        /* var opBar: DataTableOperationBar = new DataTableOperationBar( this );
        var trOpBar = <DataTableRow>document.createElement('tr');
        var tdOpBar = <DataTableCell>document.createElement('td');
        tdOpBar.colSpan = tr.children.length;
        trOpBar.appendChild(tdOpBar);
        tdOpBar.appendChild(opBar); 

        this.AppendChildHead(trHdText);
        this.AppendChildHead(trOpBar);
        this.AppendChildHead(tr); */

        this.AppendChildHead(tr);

    }

    private SetAddFormModal(): void {

        var columns: Array<any> = this.GetConfig().GetColumns();
        var fields: Array<any> = Functions.CloneObject(columns);

        /* for(var f of fields){
            f.className = ''
        } */


        var cf: ConfigForm = new ConfigForm({
            title: '',
            id: 'addForm',
            className: '',
            filter: false,
            floatingForm: false,
            transformTable: true,
            fields: fields,
        });

        var form: FormEditable = new FormEditable(cf);

        var cm: ConfigModal = new ConfigModal({
            id: 'addFormModal',
            title: 'Agregar',
            form: form,
            buttons: [
                {
                    id: 'btnModalAdd',
                    title: 'Agregar',
                    icon: 'bi bi-plus',
                    width: 125,
                    disabled: false,
                    hidden: false,
                    onclick: null,
                    type: 'button',
                    className: 'btn btn-success',
                },
            ]
        });

        var formModal: FormModal = new FormModal(cm);

        var buttons: Array<Button> = formModal.GetButtons();
        var dt: DataTable = this;
        for(var b of buttons){
            b.addEventListener('click', function(e:Event) {
                var data: any = formModal.GetForm().GetValue();
                dt.AddData(data);
                formModal.Close();
            });
        }

        this.addFormModal = formModal;
    }

    private SetOperationBar() : void {

        this.SetAddFormModal();

        var cr: ConfigRow = new ConfigRow({
            colSpan: this.GetColSpan(),
            buttons: this.GetConfig().GetButtons(),
        });

        this.operationbar = new DataTableRowOperationBar(cr);

        var modal: FormModal = this.addFormModal;

        var buttons: Array<Button> = this.operationbar.GetButtons();

        for(var b of buttons){
            b.addEventListener('click', function(e: Event){
                var btn = <Button>e.currentTarget;
                if(btn.GetConfig().GetId() === 'btnAdd'){
                    modal.Open();
                    modal.GetForm().Empty();
                }
            });
        }

        this.thead.appendChild(this.operationbar);

    }


    private GetColSpan(): number {
        var ret: number = 0;
        ret = this.GetConfig().GetColumns().length;
        return ret;
    }

    private SetFoot(): void {
        
        var cr: ConfigRow = new ConfigRow({
            rowNum: null,
            cells: null,
            select: false,
            type: 'pagination',
            colSpan: this.GetColSpan(),
            length: this.quantityPages,
        });
        
        this.pagination = new DataTableRowPagination(cr);
        
        var buttons: Array<Button> = this.pagination.GetButtons();
        
        var dt: DataTable = this;
        this.addEventListener(Program.events.CHANGE_PAGE, function(event: Event){
            var idx: number = this.pagination.GetCurrent();
            dt.ChangePage(idx);
        });
        
        this.AppendChildFoot(this.pagination);
    }

    public ChangePage(idx: number): void {
        this.SetCurrentPage(idx);
        this.Refresh();
    }


    public GetData(): Array<object>{
        var data: Array<any> = new Array<any>();
        var config: ConfigDataTable = <ConfigDataTable>this.GetConfig();
        var rows: Array<DataTableRow> = this.GetRows();
        for(var r of rows) {
            var d: any = r.GetData();
            data.push(d);
        }
        return data;
    }

    private SetChangeDtEvent():void {

        var dt: DataTable = this;

        this.addEventListener(this.events.CHANGE, function(e: Event) {
            //Get config
            var config: ConfigDataTable = <ConfigDataTable>this.GetConfig();
            //Get if use row status
            var rowStatus: boolean = config.GetRowStatus();

            //Input
            var input = <IInput><unknown>e.target;
            //HTML Element Input
            var htmlElement: HTMLElement = <HTMLElement><unknown>input;
            //Cell td
            var td: DataTableCell = <DataTableCell>htmlElement.parentElement;
            //Row tr
            debugger;
            var tr: DataTableRow = <DataTableRow>td.parentElement;
            //Row Idx
            var rowIdx: number = tr.GetIdx();
            //Name
            var name: string = td.GetConfig().GetName();
            //Value
            var value: any = input.GetValue();
            //Row datatable editable
            var row: DataTableRow = <DataTableRow>dt.GetRow(rowIdx);

            
            dt.SetValue(rowIdx, name, value);
            
            if(rowStatus) {
                //Cell datatable editable
                var cell: Cell = row.GetRowStatusCell();
                //Row status icon cell
                var rowStatusIconCell = <IconCellRowStatus>cell.GetConfig().GetInput();
                var rs: RowStatus = rowStatusIconCell.GetValue();
                if(rs === RowStatus.NORMAL){
                    //Set update value
                    rowStatusIconCell.SetValue(RowStatus.UPDATED);
                    //Re Render icon
                    rowStatusIconCell.Render();
                }
            }
        });
    }

    public SetValue(
        idx: number, 
        name: string, 
        value: any
    ): void {
        this.rowsdata[idx][name] = value;
    }

    public IndexOf(row: DataTableRow): number {
        var ret: number = this.rowsList.indexOf(row);
        return ret;
    }

    private SetMoveDtEvent():void {
        
        var dt: DataTable = this;
        this.addEventListener(this.events.KEYDOWN, function(e) {
            
            var event = <KeyboardEvent>e;
            var keyCode = event.keyCode;
            var altKey = event.altKey;
            var ctrlKey = event.ctrlKey;
            var shiftKey = event.shiftKey;
            var ele = <Input>event.target;

            var cell = <DataTableCell>ele.parentElement;
            var x: number = null;
            var y: number = null;
            var direction: CellMoveDirection = null;
            
            var row: DataTableRow = cell.GetRow();

            y = dt.IndexOf(row);
            x = cell.GetCol();

            console.log('Keydown', x, y);
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

                this.moveCell(x, y, direction);
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
        var cell: DataTableCell = null;
        var input: IInput = null;
        if(row){
            cell = <DataTableCell>row.GetCell(x);
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
    ): void {
        var row: DataTableRow = this.GetRow(y);
        console.log(row, y);
        var cell: DataTableCell = null;
        if(!Functions.IsNullOrEmpty(row)){
            cell = <DataTableCell>row.GetCell(x);
            console.log("Move cell:", cell, y, x);
            if(cell){
                var input: IInput = cell.GetInput();
                if(input.IsFocusable() && !input.IsDisabled() ){
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

    public SetCurrentPage( page: number ): void {
        this.currentPage = page;
    }

}

window.customElements.define('data-table', DataTable, { extends: 'table' });