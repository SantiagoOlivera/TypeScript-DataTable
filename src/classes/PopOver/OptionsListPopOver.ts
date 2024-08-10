import { IconButton } from "../Buttons/IconButton";
import { ConfigButton } from "../Config/ConfigButton";
import { List } from "../List/List";
import { PopOver } from "./PopOver";

export class OptionsListPopOver extends PopOver {

    constructor( element: HTMLElement, options: List ) {
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
        this.SetEvents();
    }

    

    private SetEvents(): void {

        this.GetElement().addEventListener('show.bs.popover', function() {
            PopOver.HideAll();
        });
        this.GetElement().addEventListener('hidden.bs.popover', function() {
            debugger;
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