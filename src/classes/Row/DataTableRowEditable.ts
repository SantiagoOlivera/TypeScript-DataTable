import { DataTableCell } from "../Cell/DataTableCell";
import { DataTableCellEditable } from "../Cell/DataTableCellEditable";
import { IInput } from "../Interfaces/IInput";
import { ISelectable } from "../Interfaces/ISelectable";
import { DataTableRow } from "./DataTableRow";

export class DataTableRowEditable extends DataTableRow implements ISelectable {
    
    private value: string
    selected: boolean = false;
    toggleSelect: boolean = false;
    classSelected: string = 'selected';
    private readonly ROW_NUM = 'rowNum';

    SetToggleSelect(toggleSelect: boolean){
        this.toggleSelect = toggleSelect;
    }

    IsSelected(): boolean {
        return this.selected;
    }

    Select(): void {
        console.log(this);
        if(this.IsSelected()){
            this.Deselect();
        }else{
            this.classList.add(this.classSelected);
            this.selected = true;
        }
    }
 
    Deselect(): void {
        this.classList.remove(this.classSelected);
        this.selected = false;
    }

    constructor(
        rowNum:number, 
        cells: Array<DataTableCell>, 
        select?:boolean, 
        toggleSelect?:boolean
    ){
        super(rowNum);
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
            input.addEventListener('click', () => { this.Select() });
        }
        //console.log(cell.GetInput());
        //var input: HTMLElement = cell.GetInput().GetHTMLElement();
        //input.addEventListener('click', ()=>{this.Select()});
        /* this.addEventListener('dblclick', () => { this.Select() } );
        var cells: Array<DataTableCellEditable> = <Array<DataTableCellEditable>>this.GetCells();
        var ele: HTMLElement = <HTMLElement>GetInput();
        ele.addEventListener('click', () => { this.Select() } ); */
    }

    

    public Draw(): void {
        var cells: Array<DataTableCell> = this.GetCells();
        for(var c of cells){
            this.appendChild(c);
        }
    }

    
}

window.customElements.define('data-table-row-editable', DataTableRowEditable, { extends: 'tr' });