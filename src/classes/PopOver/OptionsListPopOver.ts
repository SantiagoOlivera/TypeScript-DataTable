import { Button } from "../Buttons/Button";
import { IconButton } from "../Buttons/IconButton";
import { ConfigButton } from "../Config/ConfigButton";
import { Functions } from "../Functions/Functions";
import { List } from "../List/List";
import { ListButtons } from "../List/ListButtons";
import { Program } from "../Program/Program";
import { PopOver } from "./PopOver";

export class OptionsListPopOver extends PopOver {

    private options: ListButtons;

    constructor( element: HTMLElement, options: ListButtons ) {
        var config: any = {
            container: 'body',
            content: options,
            placement: 'left',
            html: true,
            sanitize: false,
            trigger: 'click',
            delay: 0,
        }
        super(element, config);
        this.SetListButtons(options);
        this.SetEvents();
    }


    private SetListButtons(options: ListButtons): void {
        this.options = options;
    }
    
    public GetListButtons(): ListButtons {
        return this.options;
    }   

    private SetEvents(): void {
        var options: ListButtons = this.options;
        this.GetElement().addEventListener('show.bs.popover', function() {
            PopOver.HideAll();
        });
        this.GetElement().addEventListener('shown.bs.popover', function() {
            var btns: Array<Button> = options.GetButtons();
            if(btns.length > 0){
                btns[0].focus();
            }
        });
        this.GetElement().addEventListener('hidden.bs.popover', function() {
        });
    }

}


/* document.createElement('div').innerHTML = `
                <ul class="list-group">
                    <button class="list-group-item list-group-item-action" href="#"><i class="bi bi-check2-square"></i> Seleccionar</button>   
                    <button href="#" class="list-group-item list-group-item-action " aria-current="true"><i class="bi bi-trash3"></i> Eliminar</button>
                    <button href="#" class="list-group-item list-group-item-action " aria-current="true"><i class="bi bi-eye"></i> Ver cambios</button>
                    <button href="#" class="list-group-item list-group-item-action disabled" tabindex="-1" aria-disabled="true">A disabled link item</button> 
                </ul>
            `, */
            /* <button href="#" class="list-group-item list-group-item-action " aria-current="true"><i class="bi bi-trash3"></i> Eliminar</button>
                    <button href="#" class="list-group-item list-group-item-action " aria-current="true"><i class="bi bi-eye"></i> Ver cambios</button>
                    <button href="#" class="list-group-item list-group-item-action disabled" tabindex="-1" aria-disabled="true">A disabled link item</button> */
            /* content: new IconButton(new ConfigButton({
                id: 'btnDelete',
                icon: 'bi bi-trash3',
                className: 'list-group-item list-group-item-action',
                onclick: function(){
                    debugger;
                }
            })), */