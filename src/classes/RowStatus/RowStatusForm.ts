import { RowStatus } from "../Enum/RowStatus";
import { Factory } from "../Factory/Factory";
import { Functions } from "../Functions/Functions";
import { Program } from "../Program/Program";

export class RowStatusForm extends HTMLDivElement {

    private icon: HTMLElement;
    private text: HTMLElement;
    private rowStatus: RowStatus;

    constructor() {
        super();
        this.Init();
    }

    private Init(): void {
        this.className = `col-12  ${Program.classes.ROW_STATUS}`;   
        this.icon = Factory.GetIcon();
        this.text = document.createElement('div');
    }

    public SetRowStatus(rs: RowStatus): void {
        if(rs === RowStatus.NEW) {
            this.SetIcon(Program.icons.NEW, 'Nuevo', `${Program.bootstrap.TEXT_SUCCESS} ${Program.bootstrap.FONT_WEIGHT_BOLD}`);
        } else if(rs === RowStatus.DELETE) {
            this.SetIcon(Program.icons.DELETE, 'Eliminar', `${Program.bootstrap.TEXT_DANGER} ${Program.bootstrap.FONT_WEIGHT_BOLD}`);
        } else if(rs === RowStatus.NORMAL) {
            this.SetIcon(Program.icons.NORMAL, 'Normal', `${Program.bootstrap.FONT_WEIGHT_BOLD}`);
        } else if(rs === RowStatus.UPDATED) {
            this.SetIcon(Program.icons.UPDATED, ' Modificado', `${Program.bootstrap.TEXT_UPDATE} ${Program.bootstrap.FONT_WEIGHT_BOLD}`);
        } else {
            this.SetIcon(Program.icons.NORMAL, 'Normal',`${Program.bootstrap.FONT_WEIGHT_BOLD}`);
        }
    }

    private SetIcon(icon: string, text?: string, className?: string): void {
        this.innerHTML = '';
        this.icon.className = icon;
        if(!Functions.IsNullOrEmpty(text)) {
            if(!Functions.IsNullOrEmpty(className)){
                this.text.className = className;
            }
            this.text.innerHTML = '';
            this.text.appendChild(this.icon);
            this.text.innerHTML += text;
            this.appendChild(this.text);
        } else {
            this.appendChild(this.icon);
        }
    }

}

window.customElements.define('row-status-form', RowStatusForm, { extends: 'div' });