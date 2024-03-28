import { Button } from "../Buttons/Button";
import { PaginationButton } from "../Buttons/PaginationButton";
import { ConfigButton } from "../Config/ConfigButton";
import { ConfigRow } from "../Config/ConfigRow";
import { Functions } from "../Functions/Functions";
import { Program } from "../Program/Program";
import { DataTableRow } from "./DataTableRow";
import { Row } from "./Row";

export class DataTableRowPagination extends DataTableRow {

    private buttons: Array<Button>;
    private current: number = 0;

    constructor(config: ConfigRow){
        super(config);
        this.SetButtons();
        this.Draw();
    }

    private SetButtons(): void { 

        this.buttons = new Array<Button>();
        var className: string = 'page-link';
        const ID_PAGINATION_FIRST_BUTTON: string = 'pagination-first';
        const ID_PAGINATION_LAST_BUTTON: string = 'pagination-last';
        const ID_PAGINATION_PREVIOUS_BUTTON: string = 'pagination-previous';
        const ID_PAGINATION_NEXT_BUTTON: string = 'pagination-next';

        var btnFirst: Button = new PaginationButton(new ConfigButton({ 
            id: ID_PAGINATION_FIRST_BUTTON,
            text: 'Primera', 
            className: className,
        }));

        var btnPrev: Button = new PaginationButton(new ConfigButton({ 
            id: ID_PAGINATION_PREVIOUS_BUTTON,
            text: 'Anterior', 
            className: className,
        }));

        this.buttons.push(btnFirst);
        this.buttons.push(btnPrev);
        
        var length: number = this.GetConfig().GetLength();

        for(var i=0; i<length; i++) {

            var n: number = i+1;
            var active: string = '';
            
            if(n === 1){
                active = ' active';
            }
            
            var config: any = {
                index: i,
                id: `pagination-${n}`,
                text: `${n}`,
                className: className + active,
            };

            var c: ConfigButton = new ConfigButton(config)

            var button: Button = new PaginationButton(c);
            
            this.buttons.push(button);
        }


        var btnNext: Button = new PaginationButton(new ConfigButton({ 
            id: ID_PAGINATION_NEXT_BUTTON,
            text: 'Siguiente', 
            className: className,
        }));

        var btnLast: Button = new PaginationButton(new ConfigButton({ 
            id: ID_PAGINATION_LAST_BUTTON,
            text: 'Última', 
            className: className,
        }));

        this.buttons.push(btnNext);
        this.buttons.push(btnLast);


        var row: DataTableRowPagination = this;
        for(var b of this.buttons){
            var btns = this.buttons;
            b.addEventListener('click', function(event: Event) {
                
                var button = <Button>event.target;
                var index = button.GetConfig().GetIndex();

                if(!Functions.IsNullOrEmpty(index)) {
                    row.SetCurrent(index);
                } 


                if(button.id === ID_PAGINATION_FIRST_BUTTON) {
                    row.First();
                } else if(button.id === ID_PAGINATION_LAST_BUTTON){
                    row.Last();
                } else if(button.id === ID_PAGINATION_NEXT_BUTTON) {
                    row.Next();
                } else if(button.id === ID_PAGINATION_PREVIOUS_BUTTON){
                    row.Previous();
                } else {
                    button.classList.add('active');    
                }


                var index = row.GetCurrent();

                for(var b of btns) {
                    if(b.GetConfig().GetIndex() !== index){
                        b.classList.remove('active');    
                    } else {
                        b.classList.add('active');
                    }
                }

                this.dispatchEvent(new Event(Program.events.CHANGE_PAGE, event) );

            });
        }

    }

    public First(): void {
        this.SetCurrent(0);
    }

    public Last(): void {
        var length: number = this.GetConfig().GetLength()-1;
        this.SetCurrent(length);
    }

    public Previous(): void {
        var current: number = this.GetCurrent();
        if(current > 0){
            this.SetCurrent(current-1);
        } else {
            this.SetCurrent(current);
        }
    }

    public Next(): void {
        var current: number = this.GetCurrent();
        var length: number = this.GetConfig().GetLength()-1;
        if(current < length){
            this.SetCurrent(current+1);
        } else {
            this.SetCurrent(current);
        }
    }

    public GetCurrent(): number {
        return this.current;
    }

    public SetCurrent(current: number){
        this.current = current;
        this.dispatchEvent(new Event(Program.events.CHANGE_PAGE) );
    }

    public GetButtons(): Array<Button> {
        return this.buttons;
    }

    public Draw(): void {

        var colSpan: number = this.GetConfig().GetColSpan();
        var buttons: Array<Button> = this.GetButtons();
        
        var td: HTMLTableCellElement = document.createElement('td');
        var nav: Element = document.createElement('nav');
        var ul: HTMLUListElement = document.createElement('ul');

        td.colSpan = colSpan;
        nav.className = 'float-end';
        ul.className = 'pagination';

        if(!Functions.IsNullOrEmpty(buttons)){
            for(var b of buttons){
                var li: ListElement = new ListElement();
                li.appendChild(b);
                ul.appendChild(li);
            }
        }
        
        nav.appendChild(ul);
        td.appendChild(nav);
        this.innerHTML = '';
        this.appendChild(td);
    }
} 

window.customElements.define('data-table-row-pagination', DataTableRowPagination, { extends: 'tr' });

class ListElement extends HTMLLIElement {
    constructor(){
        super();
        this.className = 'page-item';
    }
}

window.customElements.define('list-element', ListElement, { extends: 'li' });


