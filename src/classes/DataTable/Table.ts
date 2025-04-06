import { Cell } from "../Cell/Cell";
import { ConfigTable } from "../Config/ConfigTable";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";
import { Row } from "../Row/Row";

export abstract class Table extends HTMLTableElement implements IDraw {

    private readonly tags = {
        THEAD: 'thead',
        TBODY: 'tbody',
        TFOOT: 'tfoot',
    }

    private thead: HTMLElement;
    private tbody: HTMLElement;
    private tfoot: HTMLElement;
    private columns: Array<any>;
    private data: Array<any>;
    private rowsHead: Array<Row>;
    private rowsBody: Array<Row>;
    private rowsFoot: Array<Row>;
    private config: ConfigTable;



    constructor(config: ConfigTable){
        super();
        this.SetConfig(config);
        this.Init();
    }

    //Setters
    private SetConfig(config: ConfigTable): void {
        this.config = config;
    }
    private SetData(data: Array<any>): void {
        this.data = data;
    }
    private SetColumns(columns: Array<any>): void {
        this.columns = columns;
        this.SetFixIndexColumns();
    }
    
    //Getters
    public GetColumns(){
        return this.columns;
    }
    public GetConfig(): ConfigTable {
        return this.config;
    }
    public GetHeadRows(): Array<Row> {
        return this.rowsHead;
    }
    public GetBodyRows(): Array<Row> {
        return this.rowsBody;
    }
    public GetFootRows(): Array<Row> {
        return this.rowsFoot;
    }

    public AddNewColumn(c: Object, addAtTop: boolean): void {
        if(addAtTop){
            this.columns.unshift(c);
        } else {
            this.columns.push(c);
        }
        this.SetFixIndexColumns();
    }

    private SetFixIndexColumns(): void {
        //Reacomoda los indices de la configuracion de las columnas en caso de agregar nueva o en la primera inicalizacion
        for(var i=0;i<this.columns.length; i++) {
            this.columns[i].index = i;
        }
    }


    private Init(): void {
        var data = this.GetConfig().GetRows();
        this.SetData(data);
        var columns = this.GetConfig().GetColumns();
        this.SetColumns(columns);
        this.thead = document.createElement(this.tags.THEAD);
        this.tbody = document.createElement(this.tags.TBODY);
        this.tfoot = document.createElement(this.tags.TFOOT);
        this.appendChild(this.thead);
        this.appendChild(this.tbody);
        this.appendChild(this.tfoot);
        this.rowsHead = new Array<Row>();
        this.rowsBody  = new Array<Row>();
        this.rowsFoot = new Array<Row>();
    }

    public Load(): void {
        this.rowsHead = this.CreateRowsHead();
        this.rowsBody = this.CreateRowsBody();
        this.rowsFoot = this.CreateRowsFoot();
        for(var i=0; i<this.rowsHead.length;i++) {
            var row: Row = this.rowsHead[i];
            this.AddHeadRow(row);
        }
        for(var i=0;i<this.rowsBody.length;i++) {
            var row: Row = this.rowsBody[i];
            row.SetIndexNode(i);
            this.AddBodyRow(row);
        }
        for(var i=0;i<this.rowsFoot.length;i++){
            this.AddFootRow(this.rowsFoot[i]);
        }
    }
    private AddHeadRow(row: Row): void {
        this.thead.appendChild(row);
    }
    private AddBodyRow(row: Row): void {
        this.tbody.appendChild(row);
    }
    private AddFootRow(row: Row): void {
        this.tfoot.appendChild(row);
    }
    public AddNewBodyRow(row: Row): void {
        if(this.rowsBody.length === 0) {
            this.tbody.insertBefore(row, null);
        } else{
            this.tbody.insertBefore(row, this.rowsBody[0]);
        }
        this.rowsBody.unshift(row);
    }
    public GetData(): Array<Object> {
        return this.data;
    }
    public Draw(): void {
        this.Load();
        this.Refresh();
    }
    public GetRow( idx: number ): any {
        var ret: Row = null;
        var rows: Array<Row> = this.GetBodyRows();
        if(idx < rows.length) {
            ret = rows[idx];
        }
        return ret;
    }
    public GetCell(rowIdx: number, cellIdx: number): Cell {
        var ret: Cell = null;
        var row: Row = this.GetRow(rowIdx);
        if(!Functions.IsNullOrEmpty(row)){
            var cells: Array<Cell> = row.GetCells();
            if(cellIdx < cells.length) {
                ret = cells[cellIdx];
            }
        }
        return ret;
    }

    public Empty(): void {
        this.thead.innerHTML = "";
        this.tbody.innerHTML = "";
        this.tfoot.innerHTML = "";
    }


    

    public abstract CreateRowsHead(): Array<Row>;
    public abstract CreateRowsBody(): Array<Row>;
    public abstract CreateRowsFoot(): Array<Row>;
    public abstract Refresh(): void;
    public abstract Data(): Array<any>;
    


}