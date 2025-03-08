import { Cell } from "../Cell/Cell";
import { ConfigRow } from "../Config/ConfigRow";
import { IDraw } from "../Interfaces/IDraw";
import { Row } from "./Row";
import { DataTableCell } from "../Cell/DataTableCell";
import { ISelectable } from "../Interfaces/ISelectable";
import { Program } from "../Program/Program";
import { ConfigCell } from "../Config/ConfigCell";
import { Factory } from "../Factory/Factory";
import { DataTable } from "../DataTable/DataTable";
import bootstrap, { Popover } from "bootstrap";
import { RowStatus } from "../Enum/RowStatus";


export class DataTableRow extends Row implements IDraw, ISelectable {
    
    public selected: boolean;
    public toggleSelect: boolean;
    private dropdownOptions: Popover;

    constructor(config: ConfigRow){
        super(config);
        this.SetCells();
        this.SetEventSelect();
        this.SetDropdownOptions();
    }

    private SetCells(): void {
        var cellsconfig: Array<Object> = this.GetConfig().GetCells();
        var cells: Array<Cell> = Factory.GetCells(cellsconfig, this);
        for(var i=0;i<cells.length;i++) {
            this.AddCell(cells[i]);
        }
    }

    private SetEventSelect(): void {
        var isSelectable: boolean = this.GetConfig().GetIsSelectable();
        if(isSelectable){
            var r: DataTableRow = this;
            this.addEventListener(Program.events.DOUBLE_CLICK, function(event: Event) {
                event.stopPropagation();
                r.Select();
            });
        }
    }
    
    public IsSelected(): boolean {
        throw new Error("Method not implemented.");
    }
    public Select(): void {
        //throw new Error("Method not implemented.");
    }
    public Deselect(): void {
        throw new Error("Method not implemented.");
    }

    public SetValue(data: any): void {
        var cells: Array<Cell> = this.GetCells();
        for(var i=0;i<cells.length; i++){
            var cell: Cell = cells[i];
            var cellname: string = cell.GetColumnName();
            var value: any = data[cellname];
            cell.SetValue(value);
        }
    }

    public GetRowStatusCell(): Cell {
        var rsc: any = DataTable.ROW_STATUS_COLUMN;
        var name: string = rsc.data;
        var ret: Cell = this.GetCellByColumnName(name);
        return ret;
    }
    public GetRowNumCell(): Cell {
        var rsc: any = DataTable.ROW_NUM_COLUMN;
        var name: string = rsc.data;
        var ret: Cell = this.GetCellByColumnName(name);
        return ret;
    }

    private SetDropdownOptions(): void {
        /* this.dropdownOptions = new Popover(this, {
            container: 'body',
            content: `<div class="w-100">
                <button class="btn btn-danger btn-sm"><i class="${Program.icons.DELETE}"></i></button>
                <button class="btn btn-info btn-sm"><i class="${Program.icons.INFO}"></i></button>
            </div>`,
            placement: 'left',
            html: true,
            sanitize: false,
            trigger: 'manual',
        });
        let x = 0;
        let y = 0;
        this.addEventListener(Program.events.RIGHT_CLICK, function(event: any) {
            event.preventDefault();
            var row: DataTableRow = <DataTableRow>event.currentTarget;
            var dt: DataTable = <DataTable>row.GetTable();
            dt.CloseAllDropdownOptions();
            x = event.clientX;
            row.OpenDropdownOptions();
        }, false);
        this.addEventListener('inserted.bs.popover', function(event: Event){
            var popover: any = Popover.getInstance(this);
            var html: HTMLDivElement = <HTMLDivElement>popover.tip;
            html.style.display = 'none';
        });
        this.addEventListener('shown.bs.popover', function(event: Event){
            var popover: any = Popover.getInstance(this);
            var html: HTMLDivElement = <HTMLDivElement>popover.tip;
            var translate: string = html.style.transform.replace('translate', '').replace('px', '').replace('px', '').replace('(', '').replace(')', '');
            var split: Array<string> = translate.split(',');
            y = Number(split[1]);
            y = y + 25;
            html.style.transform = `translate(${x}px, ${y}px)`;
            html.style.display = 'block';
        }); */
    }

    public OpenDropdownOptions(): void {
        this.dropdownOptions.toggle();   
    }

    public CloseDropdownOptions(): void {
        this.dropdownOptions.hide();
    }


    public Delete(): void {
        var statusCell: Cell = this.GetRowStatusCell();
        statusCell.SetValue(RowStatus.DELETE);
        this.ToggleClassToCells('text-danger', true);
        this.ToggleClassToCells('text-decoration-line-through', true);
        statusCell.Draw();
    }

    public Undo(): void {
        var statusCell: Cell = this.GetRowStatusCell();
        if(statusCell.GetValue() === RowStatus.DELETE){
            statusCell.SetValue(RowStatus.NORMAL);
            this.ToggleClassToCells('text-danger', false);
            this.ToggleClassToCells('text-decoration-line-through', false);
        }
        statusCell.Draw();
    }

}

window.customElements.define('data-table-row', DataTableRow, { extends: 'tr' });

