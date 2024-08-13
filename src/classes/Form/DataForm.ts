import { FormButton } from "../Buttons/FormButton";
import { IconButton } from "../Buttons/IconButton";
import { ConfigButton } from "../Config/ConfigButton";
import { ConfigForm } from "../Config/ConfigForm";
import { ConfigInput } from "../Config/ConfigInput";
import { Factory } from "../Factory/Factory";
import { Functions } from "../Functions/Functions";
import { Input } from "../Input/Input";
import { InputCheckbox } from "../Input/InputCheckbox";
import { InputFilter } from "../Input/InputFilter";
import { InputNumber } from "../Input/InputNumber";
import { InputPageChager } from "../Input/InputPageChanger";
import { InputText } from "../Input/InputText";
import { IForm } from "../Interfaces/IForm";
import { IInput } from "../Interfaces/IInput";
import { Program } from "../Program/Program";
import { Form } from "./Form";

export class DataForm extends Form implements IForm {

    private readonly props = {
        DISABLED: 'disabled',
        HIDDEN: 'hidden',
        DATA_INPUT: 'data-input',
    }
    
    private inputs: Array<IInput>;
    private data: any;
    private index: number;
    
    constructor(config: ConfigForm){
        super(config);
        this.Init();
        this.CreateInputs();
        this.SetIndex(0);
        this.Draw();
    }
    private Init(): void {
        this.inputs = new Array<IInput>();
        this.SetData(this.GetConfig().GetData());
        this.SetClassName(this.GetConfig().GetClassName());
    }
    public GetForm(): Form {
        throw new Error("Method not implemented.");
    }
    private SetData(data: any): void {
        this.data = data;
    }
    public Data(): any {
        return this.data;
    }
    public GetHTMLElement(): HTMLElement {
        return this;
    }
    public SetValue(value: any): void {
        if(!Functions.IsNullOrEmpty(value)){
            var inputs: Array<IInput> = this.GetInputs();
            for(var i of inputs){
                var name: string = i.GetConfig().GetName();
                var v: any = value[name];
                i.SetValue(v);
            }
        } else {
            this.Empty();
        }
    }
    public GetValue(): any {
        var ret: any = this.GetData();
        return ret;
    }
    public Supr(): void {
        throw new Error("Method not implemented.");
    }
    public IsFocusable(): boolean {
        throw new Error("Method not implemented.");
    }
    public Focus(): void {
        this.FocusFirstInputIncomplete();
    }
    public Disable(disabled: boolean): void {
        for(var i of this.inputs){
            i.Disable(disabled);
        }
    }
    public Hide(hidden: boolean): void {
        for(var i of this.inputs){
            i.Hide(hidden);
        }
    }
    public IsDisabled(): boolean {
        throw new Error("Method not implemented.");
    }
    public IsHidden(): boolean {
        throw new Error("Method not implemented.");
    }
    public IsEditable(): boolean {
        return false;
    }
    public GetText(): string {
        return this.GetConfig().GetTitle();
    }
    public Empty(): void {
        for(var i=0; i<this.inputs.length; i++){
            try{
                this.inputs[i].Empty();
            }catch {
            }
        }
    }
    
    public SetDefault(): void {
        var inputs: Array<IInput> = this.GetInputs();
        for(var inp of inputs){
            try{
                inp.SetDefault();
            } catch{

            }
        }
    }

    public GetData(): any {
        var ret: any = {};
        for(var i of this.inputs) {
            var data: string = i.GetConfig().GetName();
            var value: any = i.GetValue();
            ret[data] = value;
        }
        return ret;
    }
    public Draw(): void {
        this.DrawHeader();
        this.DrawBody();
        this.DrawFooter();
        this.SetFormData(null);
    }
    private SetClassName(className: string){
        this.className = className;
    }
    public SetIndex(index: number) {
        this.index = index;
    }
    public GetIndex(): number {
        return this.index;
    }
    public GetTitle(): HTMLElement {
        var ret: HTMLHeadingElement = document.createElement('h1');
        var t: string = this.GetConfig().GetTitle();
        if(!Functions.IsNullOrEmpty(t)){
            ret.innerHTML = t;
        }
        return ret;
    }

    public GetButtons(): Array<FormButton> {

        var ret: Array<FormButton> = new Array<FormButton>();
        var config: ConfigForm = this.GetConfig();
        var buttons: Array<any> = config.GetButtons(); 
        if(Array.isArray(buttons)){
            for(var b of buttons){
                var cb: ConfigButton = new ConfigButton(b);
                var button: FormButton = new FormButton(cb);
                var form = this;
                button.onclick = function(event){
                    var onclick =  cb.GetOnClick();
                    onclick(event, form);
                }
                ret.push(button);
            }
        }
        
        return ret;
    }

    public GetFilter(): HTMLElement {
        var ret: HTMLDivElement = document.createElement('div');
        var config: ConfigInput = new ConfigInput({
            type: 'text',
            disabled: false,
            value: '',
            placeholder: 'Filtrar',
        });
        var input: Input = new InputText(config);
        return ret;
    }

    private CreateInputs(): void {
        var fields: Array<any> = this.GetConfig().GetFields();
        var ret: Array<IInput> = [];
        this.inputs = new Array<IInput>();
        var form: Form = this;
        if(Array.isArray(fields)) {
            for(var f of fields) {
                var input: IInput = Factory.GetInput(f, false);
                if(!Functions.IsNullOrEmpty(input)){
                    if(!input.GetConfig().GetEditable()) {
                        input.Disable(true);
                    }
                    ret.push(input);
                    input.GetForm = function(): Form {
                        return form;
                    }
                }
            }
        }
        this.inputs = ret;
    }
    public GetInputs(): Array<IInput> {
        return this.inputs;
    }
    public SetFormData(idx: number): void {
        //var cf: ConfigForm = <ConfigForm>this.GetConfig();
        //var data: any = cf.GetData();
        var data: any = this.Data();
        if(!Functions.IsNullOrEmpty(data)){
            var inputs: Array<IInput> = this.GetInputs();
            if(Functions.IsObject(data)) {
                for(var i of inputs){
                    var name: string = i.GetConfig().GetName();
                    var val: any = data[name];
                    i.SetValue(val);
                }
            }else if(Array.isArray(data)){
                if(data.length > 0){
                    if(!Functions.IsNumber(idx)){
                        idx = 0;
                    }
                    var d: any = data[idx];
                    for(var i of inputs){
                        var name: string = i.GetConfig().GetName();
                        var val: any = d[name];
                        i.SetValue(val);
                    }
                }                
            }
        }
    }

    public AddData(d: any): void {
        var data: Array<any> = this.Data();
        data.push(d);
    }

    private DrawHeader() {

        var form: DataForm = this;

        this.addEventListener(Program.events.CHANGE, function(event: Event) {
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
        container.className = 'col-12';

        var title: HTMLElement = this.GetTitle();
        container.appendChild(title);


        this.header.appendChild(container);

        var isArray: boolean = Functions.IsArray(data);
        if(isArray) {

            var cpc: HTMLDivElement = document.createElement('div');
            cpc.className = 'col-12';

            var ipc: InputPageChager = new InputPageChager(new ConfigInput({
                type: 'form',
                value: data.length,
                width: 190,
                align: 'right',
            }));

            ipc.addEventListener(Program.events.CHANGE_PAGE, function(event: Event) {
                debugger;
                var input: InputNumber = <InputNumber>event.target;
                var value: number = input.GetValue();
                if(!Functions.IsNullOrEmpty(value)) {
                    var idx: number = value - 1;
                    var data: any = form.Data();
                    var d: any = data[idx];
                    form.SetIndex(idx);
                    form.SetValue(d);
                }
            });

            var allowAddElements: boolean = cf.GetAddElements();
            if(allowAddElements){
                var btns: HTMLDivElement = document.createElement('div');
                btns.className = 'col-12';
                var btnAdd: IconButton = new IconButton(new ConfigButton({
                    id: 'btnAdd',
                    title: '',
                    name: 'add',
                    data: 'add',
                    icon: Program.icons.ADD,
                    width: 45,
                    height: 45,
                    className: Program.bootstrap.BUTTON_SUCCESS_SMALL,
                    default: true,
                    onclick: function() {
                        var data: any = form.Data();
                        form.AddData({});
                        ipc.AddNewPage();
                        var length: number = data.length;
                        ipc.ChangePage(length, true);
                        form.SetDefault();
                        form.FocusFirstInputIncomplete();
                    }
                }));
                btns.appendChild(btnAdd);
                cpc.appendChild(btns);    
            }

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
            input.addEventListener(Program.events.KEY_UP, function(event){
                
                var value: string = input.GetValue().toLowerCase();
                var containers: Array<HTMLDivElement> = form.GetContainers();

                for(var c of containers) {
                    c.classList.add(Program.bootstrap.INVISIBLE);
                    var data: string = c.getAttribute(this.DATA_INPUT).toLowerCase();
                    if(data.includes(value)){
                        c.classList.remove(Program.bootstrap.INVISIBLE);
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
        if(Functions.IsArray(inputs)){
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
    }

    private DrawFooter(): void {
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
        inp.name = ci.GetData();
        inp.placeholder = ci.GetPlaceHolder();
        
        ret.className = className;
        ret.setAttribute(this.props.DATA_INPUT, ci.GetTitle());

        if(!Functions.IsNullOrEmpty(l)){
            label.append(l);
            label.setAttribute('for', ci.GetData());
        }

        var cf: ConfigForm = <ConfigForm>this.GetConfig();

        if(cf.GetFloatingForm() ){
            container.className = Program.bootstrap.FORM_FLOATING;
            container.appendChild(inp);
            if(!(input instanceof InputCheckbox)){
                container.appendChild(label);
            }
            ret.appendChild(container);
        } else {
            if(!(input instanceof InputCheckbox)){
                ret.appendChild(label);
            }
            ret.appendChild(inp);
        }
        
        return ret;
    }

    private SetTransformFormToDataTable(): void {
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
                /* onclick: function(event: Event){
                    console.log(event);
                    var config: ConfigDataTable = cf.ToConfigDataTable();
                    var dt = new DataTable(config);
                    console.log(dt);
                } */
            });

            var btnTT: IconButton = new IconButton(cb);
            con.className = 'col-12 col-lg-6 p-2';
            con.appendChild(btnTT);
            this.header.appendChild(con);
        }
    }
   
    public GetContainers(): Array<HTMLDivElement> {
        return this.containers;
    }

    public FocusFirstInput(): void {
        if(this.inputs.length > 0){
            this.inputs[0].Focus();
        }
    }

    public FocusFirstInputIncomplete(): void {
        if(this.inputs.length > 0) {
            var i = 0;
            var exit: boolean = false;
            while(i < this.inputs.length && !exit){
                var inp: IInput = this.inputs[i];
                if(Functions.IsNullOrEmpty(inp.GetValue()) && !inp.IsDisabled()){
                    inp.Focus();
                    exit=true;
                }
                i++;
            }

        }
    }
    
}
window.customElements.define('data-form', DataForm, { extends: 'form' });