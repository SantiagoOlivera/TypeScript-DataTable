import { ConfigForm } from "../Config/ConfigForm";
import { ConfigInput } from "../Config/ConfigInput";
import { Functions } from "../Functions/Functions";
import { Input } from "../Input/Input";
import { InputFilter } from "../Input/InputFilter";
import { IInput } from "../Interfaces/IInput";
import { Form } from "./Form";
import { FormButton } from "../Buttons/FormButton";
import { ConfigButton } from "../Config/ConfigButton";
import { Button } from "../Buttons/Button";
import { IconButton } from "../Buttons/IconButton";
import { ConfigDataTable } from "../Config/ConfigDataTable";
import { InputPageChager } from "../Input/InputPageChanger";
import { isArray } from "jquery";
import { InputNumber } from "../Input/InputNumber";
import { Program } from "../Program/Program";
import { DataTable } from "../DataTable/DataTable";

export class FormEditable extends Form {

    private header: HTMLDivElement;
    private body: HTMLDivElement;
    private footer: HTMLDivElement;
    private containers: Array<HTMLDivElement> = new Array<HTMLDivElement>();

    constructor(config: ConfigForm){
        super(config);
        this.Draw();
    }

    public GetContainers(): Array<HTMLDivElement> {
        return this.containers;
    }

    public Draw(): void {
        this.DrawHeader();
        this.DrawBody();
        this.DrawFooter();
        this.SetFormData(null);
    }

    private DrawHeader() {

        var form: FormEditable = this;

        this.addEventListener('change', function(event: Event) {
            //event.stopPropagation();
            var e: Element = <Element>event.target;
            var input: IInput = <IInput><unknown>e;
            var inputs: Array<IInput> = this.GetInputs();
            var data: any = form.Data();
            var idx: number = form.GetIndex();
            var d: any = null;
            if(!Functions.IsNullOrEmpty(data)) { 
                if(Functions.IsObject(data)) {
                    d = data;
                } else if(Functions.IsArray(data)) {
                    d = data[idx];
                }
                for(var i of inputs){
                    var value: any = i.GetValue();
                    var name: string = i.GetConfig().GetName();
                    d[name] = value;
                    //console.log(input, name, data, value);
                }
            }
        });

        var cf: ConfigForm = <ConfigForm>this.GetConfig();
        var data: any = this.Data();

        //Header
        this.header = document.createElement('div');
        this.header.className = 'row';

        //Container title
        var container: HTMLDivElement = document.createElement('div');
        container.className = 'col-12 col-lg-6';

        var title: HTMLElement = this.GetTitle();
        container.appendChild(title);


        this.header.appendChild(container);

        var isArray: boolean = Functions.IsArray(data);
        if(isArray) {

            var cpc: HTMLDivElement = document.createElement('div');
            cpc.className = 'col-12 col-lg-6';

            var ipc: InputPageChager = new InputPageChager(new ConfigInput({
                type: 'form',
                value: data.length,
                width: '190px',
                align: 'right',
            }));

            ipc.addEventListener(Program.events.CHANGE_PAGE, function(event: Event){
                var input: InputNumber = <InputNumber>event.target;
                var value: number = input.GetValue();
                //console.log('Test change event', event);
                if(!Functions.IsNullOrEmpty(value)) {
                    var idx: number = value - 1;
                    //var data: Array<any> = (<ConfigForm>form.GetConfig()).GetData();
                    var data: any = form.Data();
                    var d: any = data[idx];
                    //console.log(data, d);
                    form.SetIndex(idx);
                    form.SetValue(d);
                }
            });

            cpc.appendChild(ipc);
            this.header.appendChild(cpc);
        }
        
        



        

        
        var filter: boolean = cf.GetFilter();
        
        //this.SetTransformFormToDataTable();
    
        var fi: ConfigInput = new ConfigInput({
            value: '',
            type: 'text',
            disabled: false,
            hidden: false,
            className: 'col-12 col-lg-6',
            placeholder: 'Filtro',
        });

        var inpF: InputFilter = new InputFilter(fi);
    
        if(filter){
            var input: Input = inpF.GetInput();
            input.addEventListener('keyup', function(event){
                
                var value: string = input.GetValue().toLowerCase();
                var containers: Array<HTMLDivElement> = form.GetContainers();

                for(var c of containers) {
                    c.classList.add(form.classes.INVISIBLE);
                    var data: string = c.getAttribute(form.props.DATA_INPUT).toLowerCase();
                    if(data.includes(value)){
                        c.classList.remove(form.classes.INVISIBLE);
                    }
                }
            });

            this.header.appendChild(inpF);
        }
        
        this.AppendChild(this.header);
    }



    private DrawBody(){
        this.body = document.createElement('div');
        this.body.className = 'row';
        var container: HTMLDivElement = null;
        var inputs: Array<IInput> = this.GetInputs();
        
        for(var i of inputs) {
            if(i instanceof Form){
                container = this.GetFormContainer(i);
            } else {
                container = this.GetInputContainer(i);
            }

            this.containers.push(container);
            this.body.appendChild(container);
        }
        this.AppendChild(this.body);
    }

    private DrawFooter(){
        this.footer = document.createElement('div');
        this.footer.className = 'w-100';

        var btns: Array<FormButton> = this.GetButtons();
        for(var b of btns){
            console.log(b);
            this.footer.appendChild(b);
        }

        this.AppendChild(this.footer);
    }

    
    private GetFormContainer(form: Form): HTMLDivElement {
        
        var ret: HTMLDivElement = document.createElement('div');
        var container: HTMLDivElement = document.createElement('div');
        var label: HTMLLabelElement = document.createElement('label');

        var cf: ConfigForm = <ConfigForm>form.GetConfig();
        //var l: string = cf.GetLabel();

        var className: string = cf.GetClassName();
        //inp.id = ci.GetData();
        //inp.placeholder = ci.GetPlaceHolder();
        
        ret.className = className;
        ret.setAttribute(this.props.DATA_INPUT, cf.GetTitle());
        ret.appendChild(form);

        /* if(!Functions.IsNullOrEmpty(l)){
            label.append(l);
            label.setAttribute('for', ci.GetData());
        } */

        //var cf: ConfigForm = <ConfigForm>this.GetConfig();

        /* if(cf.GetFloatingForm()){
            container.className = this.classes.FORM_FLOATING;
            container.appendChild(inp);
            container.appendChild(label);
            ret.appendChild(container);
        } else {
            ret.appendChild(label);
            ret.appendChild(inp);
        } */


        
        return ret;

    }

    private GetInputContainer(input: IInput): HTMLDivElement {

        var ret: HTMLDivElement = document.createElement('div');
        var container: HTMLDivElement = document.createElement('div');
        var label: HTMLLabelElement = document.createElement('label');
        
        var ci: ConfigInput = <ConfigInput>input.GetConfig();
        var l: string = ci.GetLabel();

        var className: string = ci.GetClassName();
        var inp: any = <any>input;
        inp.id = ci.GetData();
        inp.placeholder = ci.GetPlaceHolder();
        
        ret.className = className;
        ret.setAttribute(this.props.DATA_INPUT, ci.GetTitle());

        if(!Functions.IsNullOrEmpty(l)){
            label.append(l);
            label.setAttribute('for', ci.GetData());
        }

        var cf: ConfigForm = <ConfigForm>this.GetConfig();

        if(cf.GetFloatingForm()){
            container.className = this.classes.FORM_FLOATING;
            container.appendChild(inp);
            container.appendChild(label);
            ret.appendChild(container);
        } else {
            ret.appendChild(label);
            ret.appendChild(inp);
        }
        
        return ret;
    }

    private Filter(event: Event) {

        
        
    }
    


    private SetTransformFormToDataTable(){
        var cf: ConfigForm = <ConfigForm>this.GetConfig();
        var transformTable: boolean = cf.GetTransformTable();

        if(transformTable){
            var con: HTMLDivElement = document.createElement('div');
            var cb: ConfigButton = new ConfigButton({
                type: 'button',
                title: '',
                icon: 'bi bi-table',
                className: 'btn btn-success float-end',
                width: '50px',
                onclick: function(event: Event){
                    console.log(event);
                    var config: ConfigDataTable = cf.ToConfigDataTable();
                    var dt = new DataTable(config);
                    console.log(dt);
                }
            });

            var btnTT: IconButton = new IconButton(cb);
            con.className = 'col-12 col-lg-6 p-2';
            con.appendChild(btnTT);
            this.header.appendChild(con);
        }
    }

    private TransformDataTable(): void {
        
    }

}

window.customElements.define('form-editable', FormEditable, { extends: 'form' });