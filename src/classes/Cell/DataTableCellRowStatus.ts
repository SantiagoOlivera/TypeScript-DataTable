import { ConfigCell } from "../Config/ConfigCell";
import { ConfigModal } from "../Config/ConfigModal";
import { RowStatus } from "../Enum/RowStatus";
import { FormModal } from "../Modals/FormModal";
import { Program } from "../Program/Program";
import { Cell } from "./Cell";
import { DataTableCell } from "./DataTableCell";
import { IconButton } from "../Buttons/IconButton";
import { ConfigButton } from "../Config/ConfigButton";
import { Button } from "../Buttons/Button";
import { DataTableCellInput } from "./DataTableCellInput";
import { Factory } from "../Factory/Factory";
import { Functions } from "../Functions/Functions";
import { ChangedValue } from "../Program/ChangedValue";

export class DataTableCellRowStatus extends DataTableCell {
    
    private status: RowStatus;
    private modalChanges: FormModal;
    private button: Button;
    private changes: Array<ChangedValue>;
    
    constructor(config: ConfigCell) {
        super(config);
        this.Init();
    }

    private Init(): void {
        this.changes = new Array<ChangedValue>();
    }
    

    public Draw(): void {
        this.button = null;
        var val: string = '';
        var className: string = '';
        if(this.status === RowStatus.NEW){
            val = Program.icons.NEW;
            className = Program.bootstrap.BUTTON_SUCCESS_SMALL;
        } else if(this.status === RowStatus.UPDATED) {
            val = Program.icons.UPDATED;
            className = Program.bootstrap.BUTTON_INFO_SMALL;
        } else if(this.status === RowStatus.ERROR) {
            val = Program.icons.ERROR;
            className = Program.bootstrap.BUTTON_DANGER_SMALL;
        } else if(this.status === RowStatus.DELETE){
            val = Program.icons.DELETE;
            className = Program.bootstrap.BUTTON_DANGER_SMALL;
        }
        this.innerHTML = '';
        if(!Functions.IsNullOrEmpty(this.status)){
            if(this.status !== RowStatus.NORMAL) {
                this.button = new IconButton(new ConfigButton({
                    icon: val,
                    className: className,
                    onclick: function(){
        
                    }
                }));
                this.appendChild(this.button);
            }
        }
       /* this.innerHTML = `
            <div class="">
                <div class="">
                    <div class="dropdown dropend">
                        <button class="btn btn-success btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `; */
    }

    public IsFocusable(): boolean {
        var ret: boolean = false;
        if(!Functions.IsNullOrEmpty(this.button)){
            ret = true;
        }
        return ret;
    }

    public Focus(): void {
        this.button.focus();
    }

    public GetValue(): RowStatus {
        return this.status;
    }
    public SetValue(value: RowStatus): void {
        this.status = value;
    }
    private SetModalChanges(): void {
        this.modalChanges = new FormModal(new ConfigModal({
        }));
    }
    public Disable(disabled: boolean): void {
        //throw new Error("Method not implemented.");
    }
    public Editable(editable: boolean): void {
        throw new Error("Method not implemented.");
    }



    public GetChanges(): Array<ChangedValue> {
        return this.changes;
    }

    public AddChange(change: ChangedValue){
        if(!Functions.IsNullOrEmpty(change)){
            var c: ChangedValue  = this.changes.find(e => { return e.GetName() === change.GetName(); });
            if( Functions.IsNullOrEmpty(c) ) {
                this.changes.push(change);
            } else {
                c.SetNewValue(change.GetNewValue());
            }
        }
    }

}

window.customElements.define('data-table-cell-row-status', DataTableCellRowStatus, { extends: 'td' });