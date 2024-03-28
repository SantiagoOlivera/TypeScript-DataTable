import { DataTableCell } from "../Cell/DataTableCell";
/* import { DataTableCellEditable } from "../Cell/DataTableCellEditable"; */
import { ConfigRow } from "../Config/ConfigRow";
import { IInput } from "../Interfaces/IInput";
import { ISelectable } from "../Interfaces/ISelectable";
import { DataTableRow } from "./DataTableRow";

/* export class DataTableRowEditable extends DataTableRow implements ISelectable {
    
    private value: string;
    private selected: boolean = false;
    private toggleSelect: boolean = false;
    private classSelected: string = 'selected';
    private readonly ROW_NUM = 'rowNum';

    private SetToggleSelect(toggleSelect: boolean){
        this.toggleSelect = toggleSelect;
    }

    public IsSelected(): boolean {
        return this.selected;
    }

    public Select(): void {
        console.log(this);
        if(this.IsSelected()){
            this.Deselect();
        }else{
            this.classList.add(this.classSelected);
            this.selected = true;
        }
    }
 
    public Deselect(): void {
        this.classList.remove(this.classSelected);
        this.selected = false;
    }

    constructor( config: ConfigRow ) {
        super(config);

        rowNum:number, 
        cells: Array<DataTableCell>, 
        select?:boolean, 
        toggleSelect?:boolean 
        //super(rowNum);
        
        
        if(cells){
            this.SetCells(cells);
        }else{
            this.SetCells(new Array<DataTableCellEditable>());
        }

        if(select){
            this.SetSelectEvent();
        }

        if(toggleSelect){
            this.SetToggleSelect(true);
        }

        this.Draw();
    }

    private SetSelectEvent(){
        this.addEventListener('dblclick', () => { this.Select() } );
        var cell: DataTableCellEditable = <DataTableCellEditable>this.GetRowNumCell();
        if(cell){
            var input: HTMLElement = cell.GetInput().GetHTMLElement();    
            input.addEventListener('click', (event) => { 
                event.stopPropagation();
                this.Select();
            });
            input.addEventListener('dblclick', (event) => { 
                event.stopPropagation();
            });
        }
    }

    public Draw(): void {
        var cells: Array<DataTableCell> = this.GetCells();
        for(var c of cells){
            this.appendChild(c);
        }
    }

    public GetRowStatusCell(): DataTableCellEditable {
        
        var cells: Array<DataTableCell> = this.GetCells();
        var cell: DataTableCell = cells.find( e => { 
            console.log(e.GetConfig().GetData());
            return e.GetConfig().GetData() === DataTableEditable.ROW_STATUS_COLUMN.data 
        });
        console.log(cells);
        var c: DataTableCellEditable = null;
        if(cell){
            c = <DataTableCellEditable>cell;
        }

        return c;
    }

}

window.customElements.define('data-table-row-editable', DataTableRowEditable, { extends: 'tr' }); */