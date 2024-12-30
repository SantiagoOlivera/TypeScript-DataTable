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
            container: element,
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
