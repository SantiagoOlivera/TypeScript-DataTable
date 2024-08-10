import bootstrap, { Popover } from "bootstrap";

export abstract class PopOver {

    private element: HTMLElement;
    private popover: Popover;
    private isOpen: boolean;

    constructor(element: HTMLElement, config: any) {
        this.element = element;
        this.isOpen = false;
        this.popover = new Popover(element, config);

        this.SetEventsOpenAndClose();
    }

    private SetEventsOpenAndClose(): void {
    }

    public Show(): void {
        this.isOpen = true;
        this.popover.show();
    }

    public Hide(): void {
        this.popover.hide();
    }

    public GetElement(): HTMLElement {
        return this.element;
    }

    public GetPopover(): Popover {
        return this.popover;
    }

    public IsOpen(): boolean {
        return this.isOpen;
    }


    public static HideAll(): void {
        var popovers = document.querySelectorAll('.popover');
        for(var p of popovers) {
            /* var element: HTMLElement = <HTMLElement>p;
            element.classList.remove('show'); */
            /* var element: HTMLElement = <HTMLElement>p;
            element.setAttribute('style', '');
            element.classList.remove('show'); */
            var element: HTMLElement = <HTMLElement>p;
            element.setAttribute('style', '');
            element.classList.remove('show'); 
            element.classList.add('d-none');
            //var popover: Popover = Popover.getOrCreateInstance(p);
            //popover.hide();
        }
    }

}