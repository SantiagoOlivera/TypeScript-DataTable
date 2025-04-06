import { event } from "jquery";
import { Button } from "../Buttons/Button";
import { Cell } from "../Cell/Cell";
import { DataTableCell } from "../Cell/DataTableCell";
import { DataTableCellRowStatus } from "../Cell/DataTableCellRowStatus";
import { ConfigDataTable } from "../Config/ConfigDataTable";
import { ConfigPagination } from "../Config/ConfigPagination";
import { CellMoveDirection } from "../Enum/CellMoveDirection";
import { RowStatus } from "../Enum/RowStatus";
import { Factory } from "../Factory/Factory";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";
import { IInput } from "../Interfaces/IInput";
import { FormModal } from "../Modals/FormModal";
import { PopOver } from "../PopOver/PopOver";
import { Program } from "../Program/Program";
import { DataTableRow } from "../Row/DataTableRow";
import { DataTableRowHeader } from "../Row/DataTableRowHeader";
import { DataTableRowOperationBar } from "../Row/DataTableRowOperationBar";
import { DataTableRowPagination } from "../Row/DataTableRowPagination";
import { Row } from "../Row/Row";
import { Table } from "./Table";
import { ChangedValue } from "../Program/ChangedValue";


export class DataTable extends Table implements IDraw {


    readonly props = {
        DATA: 'data',
        TITLE: 'title',
        ROW_NUM: 'rowNum',
        COLUMNS: 'columns',
        ROWS: 'rows',
        type: 'type',
        ROW_STATUS: '___rowStatus___',
        HIDDEN: 'hidden',
        ROW_INDEX: '___rowIndex___',
    }

    
    public static readonly ROW_NUM_COLUMN: any = {
        data: 'rowNum',
        name: 'rowNum',
        title: '#',
        type: 'rowNum',
        disabled: false,
        editable: true,
        width: 50,
        className: Program.bootstrap.TEXT_CENTER,
        fixedColumn: true,
    };

    public static readonly ROW_STATUS_COLUMN: any = {
        data: 'rowStatus',
        name: 'rowStatus',
        title: 'Status',
        type: 'icon',
        className: 'text-center',
        editable: true,
        width: 55,
        fixedColumn: true,
    };

    public static readonly EMPTY_ARRAY: Array<any> = [];

    

    //private rowsdata: Array<any>;
    private bkp: Array<any>;
    private operationbar: DataTableRowOperationBar;
    private pagination: DataTableRowPagination;
    private quantityPages: number = 1;
    private currentPage: number = 0;
    private elementsPerPage: number = 0;
    private addFormModal: FormModal;


    constructor(config: ConfigDataTable){  
        super(config);
        this.AddStatusColumn();
        this.AddRowNumColumn();
        this.SetClassName();
        this.SetMoveEvent();
        this.SetClickEvent();
        this.SetPagination();
        this.SetChangeEvent();
        this.SetBkp();
        this.Draw();
        this.SetFixedCellsAllRows();
    }
    private AddStatusColumn(): void {
        var config: ConfigDataTable = <ConfigDataTable>this.GetConfig();
        if(config.GetRowStatus()){
            this.AddNewColumn(DataTable.ROW_STATUS_COLUMN, true);
        }
    }
    private AddRowNumColumn(): void {
        var config: ConfigDataTable = <ConfigDataTable>this.GetConfig();
        if(config.GetRowNum()){
            this.AddNewColumn(DataTable.ROW_NUM_COLUMN, true);
        }
    }
    private SetClassName(): void {
        this.className = 'table';
    }
    private SetBkp(): void {
        var data: Array<Object> = Functions.CloneObject(this.GetData());
        this.bkp = data;
    }
    public CreateRowsHead(): Array<Row> {
        var ret : Array<Row> = new Array<Row>();
        var data: Array<any> = this.GetData();
        var columns: Array<any> = this.GetColumns();
        var cells: Array<any> = Functions.CloneObject(columns);
        var operationbar: Row = this.GetOperationBar();
        for(var i=0;i<cells.length; i++) {
            cells[i].celltype = Program.celltypes.HEAD;
        }
        var rows: Array<Object> = [
            new Object({
                index: 0,
                rowNum: null,
                isSelectable: false,
                cells: cells,
                rowtype: Program.rowtypes.HEAD,
            }),
        ]
        ret = Factory.GetRows(rows, this);
        ret.unshift(operationbar);
        return ret;
    }
    public CreateRowsBody(): Array<Row> {
        var ret : Array<Row> = new Array<Row>();
        var data: Array<any> = this.GetData();
        var columns: Array<any> = this.GetColumns();
        var cells: Array<any> = Functions.CloneObject(columns);
        var cr: Object = null;
        var r: Row = null;
        for(var i=0;i<cells.length; i++) {
            cells[i].celltype = Program.celltypes.BODY;
        }
        if(data.length === 0){
            var cr: Object = new Object({
                index: 0,
                rowNum: i+1,
                isSelectable: true,
                cells: cells,
                rowtype: Program.rowtypes.EMPTY,
                colSpan: cells.length,
            });
            r = Factory.GetRow(cr, this);
            ret.push(r);
        } else {
            for(var i=0;i<data.length;i++) {
                var d = data[i];
                r = this.CreateRow(d, i, cells, RowStatus.NORMAL);
                ret.push(r);
            }
            var length: number = (<ConfigDataTable>this.GetConfig()).GetPagination().GetLength();
            var pagination: number = length - ( data.length % length );
            for(var i=data.length;i<(data.length+pagination); i++) {
                r = Factory.GetRow({
                    index: 0,
                    rowNum: i+1,
                    colSpan: cells.length,
                    isSelectable: false,
                    rowtype: Program.rowtypes.EMPTY,
                }, this);
                r.style = 'height:40px';
                ret.push(r);
            }
        }
        return ret;
    }

    private CreateRow(
        data: Object, 
        index: number, 
        cells: Array<any>,
        rowStatus: RowStatus
    ): Row {
        var ret: Row = null;
        var cr: Object = new Object({
            index: index,
            rowNum: index+1,
            isSelectable: true,
            cells: cells,
            rowtype: Program.rowtypes.BODY,
        });
        ret = Factory.GetRow(cr, this);
        (<DataTableRow>ret).SetValue(data);
        ret.SetIndexNode(index);
        this.SetRowNum((<DataTableRow>ret));
        this.SetRowStatus((<DataTableRow>ret), rowStatus);
        this.SetVisibleRow(ret);
        this.SetFixedCellsByRow(ret);
        return ret;
    }

    public SetRowNum(row: DataTableRow): void {
        var config: ConfigDataTable = (<ConfigDataTable>this.GetConfig());
        if(config.GetRowNum()){
            var cell: Cell = row.GetRowNumCell();
            cell.Draw();
        }
    }

    public SetRowStatus(row: DataTableRow, rs: RowStatus): void {
        var config: ConfigDataTable = (<ConfigDataTable>this.GetConfig());
        if(config.GetRowStatus()){
            var cell: Cell = row.GetRowStatusCell();
            var rowStatusIconCell = <DataTableCellRowStatus>cell;
            //Set update value
            rowStatusIconCell.SetValue(rs);
            //Re Render icon
            rowStatusIconCell.Draw();
        }
    }
    

    public CreateRowsFoot(): Array<Row> {
        var ret : Array<Row> = new Array<Row>();
        var data: Array<any> = this.GetData();
        var columns: Array<any> = this.GetColumns();
        var cr: Object = new Object({
            rowNum: null,
            cells: null,
            select: false,
            type: Program.rowtypes.PAGINATION,
            rowtype: Program.rowtypes.PAGINATION,
            colSpan: columns.length,
            length: this.quantityPages,
        });
        this.pagination = <DataTableRowPagination>Factory.GetRow(cr, this); 
        var buttons: Array<Button> = this.pagination.GetButtons();
        var dt: DataTable = this;
        this.addEventListener(Program.events.CHANGE_PAGE, function(event: Event){
            var idx: number = this.pagination.GetCurrent();
            dt.ChangePage(idx);
        });
        ret.push(this.pagination);
        return ret;
    }
    public ChangePage(idx: number): void {
        this.SetCurrentPage(idx);
        this.Refresh();
    }
    public SetCurrentPage( page: number ): void {
        this.currentPage = page;
    }
    public Refresh(): void {
        var rows: Array<Row> = this.GetBodyRows();
        for(var i=0;i<rows.length; i++){
            var row: Row = rows[i];
            row.SetIndexNode(i);
            this.SetVisibleRow(row);
        }
    }
    private SetVisibleRow(row: Row): void {
        var hiderow: boolean = true;
        var min: number = (this.currentPage * this.elementsPerPage);
        var max: number = min + this.elementsPerPage;
        var i: number = row.GetIndexNode();
        if(i>=min && i<max) {
            hiderow = false;
        }
        row.Hide(hiderow);
    }

    private SetClickEvent(): void {
        this.addEventListener(Program.events.CLICK, function(){
            PopOver.HideAll();
        })
    }

    private SetMoveEvent():void {
        var dt: DataTable = this;
        this.addEventListener(Program.events.KEYDOWN, function(e) {
            var event = <KeyboardEvent>e;
            var keyCode = event.keyCode;
            var altKey = event.altKey;
            var ctrlKey = event.ctrlKey;
            var shiftKey = event.shiftKey;
            var cell = (<DataTableCell>document.activeElement.closest('td'));
            var rowIdx: number = null;
            var cellIdx: number = null;
            var direction: CellMoveDirection = null;
            var row: Row = cell.GetRow();
            rowIdx = row.GetIndexNode();
            cellIdx = cell.GetIndex();
            console.log('Keydown', rowIdx, cellIdx);
            if(
                (!altKey && !shiftKey && !ctrlKey) 
                &&
                (
                    keyCode === Program.keycodes.ARROW_LEFT    || 
                    keyCode === Program.keycodes.ARROW_RIGHT   || 
                    keyCode === Program.keycodes.ARROW_UP      ||
                    keyCode === Program.keycodes.ARROW_DOWN 
                )
            ){
                switch(keyCode){
                    case Program.keycodes.ARROW_LEFT:
                        cellIdx-=1;
                        direction = CellMoveDirection.LEFT;
                        break;
                    case Program.keycodes.ARROW_RIGHT:
                        cellIdx+=1;
                        direction = CellMoveDirection.RIGHT;
                        break;
                    case Program.keycodes.ARROW_UP:
                        rowIdx-=1;
                        direction = CellMoveDirection.UP;
                        break;
                    case Program.keycodes.ARROW_DOWN:
                        rowIdx+=1;
                        direction = CellMoveDirection.DOWN;
                        break;
                }
                this.moveCell(rowIdx, cellIdx, direction);
                event.preventDefault();
            }else{
                switch(keyCode){
                    case Program.keycodes.ENTER:
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

    /* private Supr(x: number, y: number){
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
    } */

    private moveCell(
        rowIdx: number, 
        cellIdx: number, 
        dir: CellMoveDirection 
    ): void {
        var cell: Cell = this.GetCell(rowIdx, cellIdx);
        if(!Functions.IsNullOrEmpty(cell)) {
            try {
                var dtcell: DataTableCell = <DataTableCell>cell;
                if(dtcell.IsFocusable()) {
                    dtcell.Focus();
                } else {
                    //console.log("Jump cell:", cell, rowIdx, cellIdx, cell);
                    if(dir === CellMoveDirection.UP){
                        rowIdx--; 
                    } else if(dir === CellMoveDirection.DOWN){
                        rowIdx++;
                    } else if(dir === CellMoveDirection.LEFT){
                        cellIdx--;
                    } else if(dir === CellMoveDirection.RIGHT){
                        cellIdx++;
                    }
                    this.moveCell(rowIdx, cellIdx, dir);
                }
            } catch {
                
            }
        }            
    }


    private IsCellRowStatus(cell: Cell): boolean {
        var ret: boolean = false;
        if(cell.GetConfig().GetData() === DataTable.ROW_STATUS_COLUMN.data){
            ret = true;
        }
        return ret;
    }

    private IsCellRowNum(cell: Cell): boolean {
        var ret: boolean = false;
        if(cell.GetConfig().GetData() === DataTable.ROW_STATUS_COLUMN.data){
            ret = true;
        }
        return ret;
    }

    private SetPagination(): void {
        var rows: Array<Object> = this.GetData();
        var rowsLength = rows.length;
        var pagination: ConfigPagination = (<ConfigDataTable>this.GetConfig()).GetPagination();
        var elementsPerPage: number = rowsLength;
        var quantityPages: number = 1;
        if(!Functions.IsNullOrEmpty(pagination)) {
            var paginationLength: number = pagination.GetLength();
            if(!Functions.IsNullOrEmpty(paginationLength)) {
                quantityPages = 0;
                var d: number = rowsLength / paginationLength;
                var q1: number = rowsLength % paginationLength;
                var q2: number = d % 1;
                if( q1 === 0 ){
                    quantityPages = d;
                } else if( q2 < 0.5) {
                    quantityPages = Number((d+1).toFixed(0));
                } else {
                    quantityPages = Number((d).toFixed(0));
                }
                elementsPerPage = paginationLength;
            }
        }
        this.elementsPerPage = elementsPerPage;
        this.quantityPages = quantityPages;
        this.SetCurrentPage(0);
    }
    public GetElementsPerPage(): number {
        return this.elementsPerPage;
    }
    public GetQuantityPages(): number {
        return  this.quantityPages;
    }

    public SetValue(
        idx: number, 
        name: string, 
        value: any
    ): void {
        var data: Array<any> = this.GetData();
        data[idx][name] = value;
    }

    public AddChangesObjectToData(idx: number, change: ChangedValue): void {
        /* var data: Array<any> = this.GetData();
        var changes: Array<ChangedValue> = data[idx]['__changes__'];
        if(!Functions.IsNullOrEmpty(changes)) {
            var c: ChangedValue  = changes.find(e => { return e.GetName() === change.GetName(); });
            if( Functions.IsNullOrEmpty(c) ) {
                changes.push(change);
            } else {
                c.SetNewValue(change.GetNewValue());
            }
        } else {
            changes = new Array<ChangedValue>();
            changes.push(change);
        }
        data[idx]['__changes__'] = changes; */
    }

    public GetRowDataByIndex(idx: number): any {
        var ret: any = null;
        var data: Array<any> = this.GetData();
        if(idx < data.length){
            ret = data[idx];
        }
        return ret;
    }

    public GetRowDataBkpByIndex(idx: number): any{
        var ret: any = null;
        var data: Array<any> = this.GetData();
        if(idx < data.length){
            ret = this.bkp[idx];
        }
        return ret;
    }

    private SetChangeEvent():void {
        var dt: DataTable = this;
        this.addEventListener(Program.events.CHANGE, function(e: Event) {
            //Get config
            var config: ConfigDataTable = <ConfigDataTable>this.GetConfig();
            //Get if use row status
            var rowStatus: boolean = config.GetRowStatus();
            //Input
            var input = <IInput><unknown>e.target;
            //HTML Element Input
            var htmlElement: HTMLElement = input.GetHTMLElement();
            //Cell td
            var cell: DataTableCell = <DataTableCell>htmlElement.parentElement;
            //Row tr
            var row: DataTableRow = <DataTableRow>cell.parentElement;
            //Row Idx
            var rowIdx: number = row.GetIndex();
            //Index node row
            var indexNode: number = row.GetIndexNode();
            //Name
            var name: string = cell.GetColumnName();
            //Value
            var value: any = input.GetValue();
            dt.SetValue(rowIdx, name, value);
            if(rowStatus) {
                //Cell datatable editable
                cell = <DataTableCell>row.GetRowStatusCell();
                //Row status icon cell
                var rowStatusIconCell = <DataTableCellRowStatus>cell;
                var oldVal: any = this.GetRowDataBkpByIndex(rowIdx);
                var newVal: any = this.GetRowDataByIndex(rowIdx);
                var rs: RowStatus = RowStatus.UPDATED;
                var isModifided: boolean = false;
                if(rowStatusIconCell.GetValue() === RowStatus.NEW ) {
                    rs = RowStatus.NEW;
                } else {
                    isModifided = Functions.IsObjectModifided(oldVal, newVal);
                    if(!isModifided){
                        rs = RowStatus.NORMAL;
                    } else {
                        rs = RowStatus.UPDATED;
                        var change: ChangedValue = new ChangedValue(name, oldVal[name], newVal[name]);
                        rowStatusIconCell.AddChange(change);
                    }
                }
                this.SetRowStatus(row, rs);
            }
            var changeFunction: Function = config.GetOnChange();
            if(!Functions.IsNullOrEmpty(changeFunction)){
                changeFunction(event, dt);
            }
        });
    }

    public GetColumnForDataTable(): Array<any> {
        var cols: Array<any> = Functions.CloneObject(this.GetColumns());
        var config: ConfigDataTable = (<ConfigDataTable>this.GetConfig())
        if(config.GetRowStatus()){
        }
        var ret = cols;
        return ret;
    }

    public AddData(object: any): void {
        var data: Array<Object> = this.GetData();
        var cells: Array<any> = Functions.CloneObject(this.GetColumns());
        for(var i=0;i<cells.length; i++) {
            cells[i].celltype = Program.celltypes.BODY;
        }
        if(!Functions.IsNullOrEmpty(object)) {
            if(Functions.IsArray(object)){
                for(var i=0; i<object.length; i++){
                    var o: Object = object[i];
                    if(Functions.IsObject(o)) {
                        var length: number = data.length;
                        var row: Row = this.CreateRow(o, length, cells, RowStatus.NEW);
                        data.unshift(o);
                        this.AddNewBodyRow(row);
                    }
                }
                this.Refresh();
            }else{
                var length: number = data.length;
                var row: Row = this.CreateRow(object, length, cells, RowStatus.NEW);
                data.unshift(object);
                this.AddNewBodyRow(row);
                this.Refresh();
            }
        }
        
    }

    
    private GetOperationBar(): Row {
        var ret: Row = null;
        var columns: Array<any> = this.GetColumns();
        var c: any = {
            colSpan: columns.length,
            rowtype: 'operationbar',
            buttons: (<ConfigDataTable>this.GetConfig()).GetButtons(),
        };
        ret = Factory.GetRow(c, this);
        return ret;
    }

    /* private SetOperationBar() : void {
        this.SetAddFormModal();
        var cr: ConfigRow = new ConfigRow({
            colSpan: this.GetColSpan(),
            buttons: this.GetConfig().GetButtons(),
        });
        this.operationbar = new DataTableRowOperationBar(cr);
        var modal: FormModal = this.addFormModal;
        var buttons: Array<Button> = this.operationbar.GetButtons();
        for(var b of buttons){
            b.addEventListener(Program.events.CLICK, function(e: Event){
                var btn = <Button>e.currentTarget;
                if(btn.GetConfig().GetId() === 'btnAdd'){
                    modal.Open();
                    modal.GetForm().Empty();
                }
            });
        }
        this.thead.appendChild(this.operationbar);
    } */

    /* public CloseAllDropdownOptions(): void {
        var rows: Array<Row> = this.GetBodyRows();
        for(var r of rows){
            var dtr: DataTableRow = <DataTableRow>r;
            dtr.CloseDropdownOptions();
        }
    } */


    public SetFixedCellsByRow(row: Row): void {
        DataTable.SetFixedColumn(row.GetCells());
    }

    public SetFixedCellsAllRows(): Array<Cell>{
        var ret: Array<Cell>= new Array<Cell>();
        for(var h of this.GetHeadRows()){
            if(h instanceof DataTableRowHeader){
                this.SetFixedCellsByRow(h);
            }
        }
        for(var b of this.GetBodyRows()){
            this.SetFixedCellsByRow(b);
        }
        return ret;
    }


    public static SetFixedColumn(cells: Array<Cell>): void {
        cells = cells.filter( e => { return e.GetConfig().GetFixedColumn(); });
        if(cells.length > 0) {
            for(var i = 0; i < cells.length; i++) {
                var previous: Cell = null;
                var cell: Cell = cells[i];
                if(cell.GetConfig().GetFixedColumn()) {
                    if( i > 0 ){
                        previous = cells[i-1];
                        var left: string = Functions.AddSizes(previous.style.left, previous.style.width) + 'px';
                        cell.style.left = left;
                    } else {
                        cell.style.left = '0px';
                    }
                }
            }
        }
    }

    
    public Data(): Array<any> {
        var ret: Array<any> = new Array<any>();
        for(var r of this.GetBodyRows()){
            var dr: DataTableRow = (<DataTableRow>r);
            var d = dr.GetData();
            d['__changes__'] =  (<DataTableCellRowStatus>dr.GetRowStatusCell()).GetChanges();
            ret.push(d);
        }
        return ret;
    }

}

window.customElements.define('data-table', DataTable, { extends: 'table' });