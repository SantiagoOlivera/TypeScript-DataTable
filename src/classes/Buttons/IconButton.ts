import { Button } from "./Button";

export class IconButton extends Button {

    private icon: string;
    private sTitle: string;

    constructor(
        icon: string, 
        title: string
    ) {
        super();
        this.type = 'button';
        this.className = 'btn btn-success';
        this.style.width = '125px';
        this.SetIcon(icon);
        this.SetTitle(title);
        //this.clickCallback = clickCallback;
        //this.SetOnClick();
        this.Draw();
    }

    /* private SetOnClick(){
        this.addEventListener('click', (event) => {
            this.clickCallback();
        });
    } */

    private SetTitle(title: string){
        this.sTitle = title;
    }

    public GetTitle(): string{
        return this.sTitle;
    }

    private SetIcon(icon:string){
        this.icon = icon;
    }

    private GetIcon(): string {
        return this.icon;
    }

    public Draw(): void {
        this.innerHTML = `<i class="${this.GetIcon()}"></i> ${this.GetTitle()}`;
    }

}

window.customElements.define('icon-button', IconButton, { extends: 'button' });