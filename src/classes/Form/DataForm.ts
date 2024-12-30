import { Button } from "../Buttons/Button";
import { FormButton } from "../Buttons/FormButton";
import { IconButton } from "../Buttons/IconButton";
import { ConfigButton } from "../Config/ConfigButton";
import { ConfigForm } from "../Config/ConfigForm";
import { ConfigInput } from "../Config/ConfigInput";
import { ConfigModal } from "../Config/ConfigModal";
import { RowStatus } from "../Enum/RowStatus";
import { Factory } from "../Factory/Factory";
import { Functions } from "../Functions/Functions";
import { Input } from "../Input/Input";
import { InputCheckbox } from "../Input/InputCheckbox";
import { InputFilter } from "../Input/InputFilter";
import { InputNumber } from "../Input/InputNumber";
import { InputPageChager } from "../Input/InputPageChanger";
import { InputText } from "../Input/InputText";
import { Filter, IFilterable } from "../Interfaces/IFilterable";
import { IForm } from "../Interfaces/IForm";
import { IInput } from "../Interfaces/IInput";
import { FormModal } from "../Modals/FormModal";
import { Program } from "../Program/Program";
import { RowStatusForm } from "../RowStatus/RowStatusForm";
import { Form } from "./Form";

export class DataForm extends Form implements IForm, IFilterable {

    private readonly props = {
        DISABLED: 'disabled',
        HIDDEN: 'hidden',
        DATA_INPUT: 'data-input',
    }
    
    private inputs: Array<IInput>;
    private data: any;
    private bkp: any;
    private filteredData: any;
    private index: number;
    private buttons: Array<Button>;
    private inputPageChager: InputPageChager;
    
    constructor(config: ConfigForm){
        super(config);
        this.Init();
        this.CreateInputs();
        this.SetIndex(0);
        this.SetEvents();
        this.Draw();
    }

    public Filter(filters: Array<Filter>): any {
        var data: any = this.Data();
        var ret: any = data;
        if(!Functions.IsNullOrEmpty(filters)){
            if(filters.length > 0) {
                ret = Filter.FilterData(data, filters);
                var ipc: InputPageChager = this.GetPager();
                ipc.SetNumberOfElements(ret.length);
            }
        }
        return ret;
    }

    public GetFilters(): Array<Filter> {
        throw new Error("Method not implemented.");
    }

    public IsFiltered(): boolean {
        var ret: boolean = false;
        if(!Functions.IsNullOrEmpty(this.filteredData)){
            ret = true;
        }
        return ret;
    }

    public AddButton(button: Button): void {
        this.buttons.push(button);
    }

    public DisableButton(id: string, disabled: boolean){
        var btn: Button = this.buttons.find( e=> { return e.GetConfig().GetId() === id; });
        if(!Functions.IsNullOrEmpty(btn)){
            btn.Disable(disabled);
        }
    }

    private Init(): void {
        this.inputs = new Array<IInput>();
        this.buttons = new Array<Button>();
        this.SetData(this.GetConfig().GetData());
        this.SetBkp(this.GetConfig().GetData());
        this.SetClassName(this.GetConfig().GetClassName());
    }
    public GetForm(): Form {
        throw new Error("Method not implemented.");
    }
    private SetData(data: any): void {
        this.data = data;
    }
    private SetBkp(data: any): void {
        this.bkp = Functions.CloneObject(data);
    }

    public Data(): any {
        return this.data;
    }

    public GetBkp(idx?: number): any {
        var ret: any = null;
        if(Array.isArray(this.bkp)){
            if(Functions.IsNullOrEmpty(idx)){
               idx = 0; 
            }
            ret = Functions.CloneObject(this.bkp[idx]);    
        } else {
            ret = Functions.CloneObject(this.bkp);
        }
        return ret; 
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
        var rowStatus: boolean = this.GetConfig().GetRowStatus();
        var data: any = this.Data();
        var inputs: Array<IInput> = this.GetInputs();
        if(!Functions.IsNullOrEmpty(data)) {
            if(Functions.IsObject(data)) {
                for(var i of inputs) {
                    var name: string = i.GetConfig().GetName();
                    var val: any = data[name];
                    i.SetValue(val);
                }
            } else if (Array.isArray(data)) {
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
        } else {
            for(var i of inputs){
                i.SetValue(null);
                i.Disable(true);
            }
        }
    }

    public ReplaceData(newdata: any, idx?: number): void {
        if(!Functions.IsNullOrEmpty(this.data)) {
            if(Functions.IsObject(this.data)) {

            } else if(Array.isArray(this.data)){
                if(this.data.length > 0) {
                    if(!Functions.IsNumber(idx)){
                        idx = 0;
                    }
                    this.data[idx] = newdata;
                }
            }
        }
    }

    public AddData(d: any): void {
        var data: Array<any> = this.Data();
        if(!Functions.IsNullOrEmpty(data)){
            data.push(d);
        } else if(Array.isArray(data)){
            data.push(d);
        } else {
            data = new Array<any>();
            data.push(d);
        }
    }

    public RemoveData(idx: number){
        var data: Array<any> = this.Data();
        data.splice(idx, 1);
    }


    private SetEvents(): void {
        this.SetEventChange();
    }

    private SetEventChange(): void {
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
            
            if(form.GetConfig().GetRowStatus()) {
                var status: RowStatus = d[Program.props.ROW_STATUS];
                if(Functions.IsNullOrEmpty(status) || status === RowStatus.NORMAL) {
                    var status: RowStatus = RowStatus.UPDATED;
                    d[Program.props.ROW_STATUS] = status;
                    form.GetRowStatusForm().SetRowStatus(status);
                    form.DisableButton('btnUndo', false);
                    form.DisableButton('btnDelete', true);
                }
            }
        });
    }

    private SetHeader(): void {
        //Header
        this.header = document.createElement('div');
        this.header.className = 'row';
    }

    private SetTitle(): void {
        //Container title
        var container: HTMLDivElement = document.createElement('div');
        container.className = 'col-12';
        var title: HTMLElement = this.GetTitle();
        container.appendChild(title);
        this.header.appendChild(container);
    }

    private SetInputPageChager(): void {

        var form: Form = this;
        var data: any = form.Data();

        var cpc: HTMLDivElement = document.createElement('div');
        cpc.className = 'col-12';

        var isArray: boolean = Functions.IsArray(data);

        if(isArray) {
            
            var ipc: InputPageChager = new InputPageChager(new ConfigInput({
                type: 'form',
                value: data.length,
                width: 190,
                align: 'right',
            }));
    
            ipc.addEventListener(Program.events.CHANGE_PAGE, function(event: Event) {
                var input: InputNumber = <InputNumber>event.target;
                var value: number = input.GetValue();
                if(!Functions.IsNullOrEmpty(value)) {
                    var idx: number = value - 1;
                    var data: any = form.Data();
                    var d: any = data[idx];
                    var status: RowStatus = d[Program.props.ROW_STATUS];
                    form.SetIndex(idx);
                    form.SetValue(d);
                    form.GetRowStatusForm().SetRowStatus(status);
                    if(status === RowStatus.DELETE) {
                        form.Disable(true);
                        form.DisableButton('btnUndo', false);
                        form.DisableButton('btnDelete', true);
                    } else if(status === RowStatus.UPDATED) {
                        form.Disable(false);
                        form.DisableButton('btnUndo', false);
                        form.DisableButton('btnDelete', true);
                    } else {
                        form.Disable(false);
                        form.DisableButton('btnUndo', true);
                        form.DisableButton('btnDelete', false);
                    }
                }
            });

            this.inputPageChager = ipc;
            cpc.appendChild(ipc);
        }

        this.header.appendChild(cpc);

    }

    private SetButtons(): void {

        var form: DataForm = this;
        var data: any = form.Data();
        var cf: ConfigForm = <ConfigForm>this.GetConfig();
        var allowAddElements: boolean = cf.GetAddElements();

        var btns: HTMLDivElement = document.createElement('div');
        btns.className = 'col-12';

        if(allowAddElements) {

            var btnAdd: IconButton = new IconButton(new ConfigButton({
                id: 'btnAdd',
                title: '',
                name: 'add',
                data: 'add',
                icon: Program.icons.ADD,
                width: 45,
                height: 45,
                className: Program.bootstrap.BUTTON_SUCCESS_SMALL  + ' m-1',
                default: true,
                onclick: function() {
                    var data: any = form.Data();
                    var length: number = 1;
                    if(data.length > 0){
                        length = data.length+1;
                    }
                    var ipc: InputPageChager = form.GetPager();
                    var newdata: any = {};
                    var status: RowStatus = RowStatus.NEW;
                    newdata[Program.props.ROW_STATUS] = status;
                    if(form.GetConfig().GetRowStatus()) { 
                        form.GetRowStatusForm().SetRowStatus(status);
                    }
                    form.AddData(newdata);
                    ipc.AddNewPage();
                    ipc.ChangePage(length, true);
                    form.SetDefault();
                    form.FocusFirstInputIncomplete();
                    form.Disable(false);
                }
            }));

            form.AddButton(btnAdd);
            btns.appendChild(btnAdd);

            var btnDelete: IconButton = new IconButton(new ConfigButton({
                id: 'btnDelete',
                title: '',
                name: 'delete',
                data: 'delete',
                icon: Program.icons.DELETE,
                width: 45,
                height: 45,
                className: Program.bootstrap.BUTTON_DANGER_SMALL + ' m-1',
                default: true,
                onclick: function() {
                    var data: any = form.Data();
                    var idx: number = form.GetIndex();
                    var ipc: InputPageChager = form.GetPager();
                    var d: any = data[idx];
                    var length: number = data.length;
                    var rowStatus: RowStatus = d[Program.props.ROW_STATUS];
                    if(rowStatus === RowStatus.NEW) {
                        form.RemoveData(idx);
                        ipc.ChangePage(length-1, true);
                        ipc.RemovePage();
                        if(ipc.GetNumberOfElements() === 0){
                            form.Empty();
                            form.Disable(true);
                        }
                    } else {
                        var status: RowStatus = RowStatus.DELETE;
                        d[Program.props.ROW_STATUS] = status;
                        if(form.GetConfig().GetRowStatus()) { 
                            form.GetRowStatusForm().SetRowStatus(status);
                        }
                        form.Disable(true);
                        form.DisableButton('btnDelete', true);
                        form.DisableButton('btnUndo', false);
                    }
                }
            }));

            form.AddButton(btnDelete);
            btns.appendChild(btnDelete);

            var btnUndo: IconButton = new IconButton(new ConfigButton({
                id: 'btnUndo',
                title: '',
                name: 'undo',
                data: 'undo',
                icon: Program.icons.UNDO,
                width: 45,
                height: 45,
                className: Program.bootstrap.BUTTON_DARK_SMALL + ' m-1',
                default: true,
                onclick: function() {
                    var data: any = form.Data();
                    var idx: number = form.GetIndex();
                    var d: any = data[idx];
                    var rowStatus: RowStatus = d[Program.props.ROW_STATUS];
                    var status: RowStatus = RowStatus.NORMAL;
                    if(rowStatus === RowStatus.DELETE){
                        d[Program.props.ROW_STATUS] = RowStatus.NORMAL;
                        form.Disable(false);
                    } else if(rowStatus === RowStatus.UPDATED){
                        var bkp: any = form.GetBkp(idx);
                        form.ReplaceData(bkp, idx);
                        form.SetFormData(idx);
                    }
                    if(form.GetConfig().GetRowStatus()) { 
                        form.GetRowStatusForm().SetRowStatus(status);
                    }
                    form.DisableButton('btnDelete', false);
                    form.DisableButton('btnUndo', true);
                }
            }));

            form.AddButton(btnUndo);
            btns.appendChild(btnUndo);
            form.DisableButton('btnUndo', true);

            var filterForm: DataForm = new DataForm(new ConfigForm({
                title: '',
                id: 'formFilterModal',
                className: '',
                filter: false,
                floatingForm: false,
                transformTable: true,
                fields: function() {
                    var fields: any = Functions.CloneObject(form.GetConfig().GetFields());
                    for(var f of fields){
                        if(f.type === Program.inputTypes.CHECKBOX || 
                            f.type === Program.inputTypes.CHECKBOX_SWITCH
                        ){
                            f.type = Program.inputTypes.SELECT_BOOLEAN;
                        } else if(f.type === Program.inputTypes.SELECT) {
                            f.allowEmpty = true;
                        } else if(f.type === Program.inputTypes.FORM) {
                            f.floatingForm = false;
                        }
                        f.defaultValue = null;
                        f.placeholder = '';
                        f.value = null;
                    }
                    return fields;
                }(),
            }));
            filterForm.Disable(false);
            var btnFilter: IconButton = new IconButton(new ConfigButton({
                id: 'btnFilter',
                title: '',
                name: 'filter',
                data: 'filter',
                icon: Program.icons.FILTER,
                width: 45,
                height: 45,
                className: Program.bootstrap.BUTTON_LIGHT_SMALL + ' m-1',
                default: true,
                onclick: function() {
                    var modal: FormModal = new FormModal(new ConfigModal({
                        id: 'modalFilter',
                        title: 'Filtro',
                        form: filterForm,
                        buttons: [
                            {
                                id: 'btnFilter',
                                title: 'Filtrar',
                                width: 90,
                                type: 'icon',
                                icon: Program.icons.FILTER,
                                className: 'btn btn-dark',
                                onclick: function() {
                                    var data: any = filterForm.GetData();
                                    var filters: Array<Filter> = Filter.ObjectToFiltersArray(data);
                                    form.Filter(filters);
                                    modal.Close();
                                },
                            }
                        ],
                    }));
                    modal.Open();
                }
            }));

            form.AddButton(btnFilter);
            btns.appendChild(btnFilter);

            
            
        }

        this.header.appendChild(btns);

    }

    public GetPager(): InputPageChager {
        return this.inputPageChager;
    }

    private DrawRowStatus(): void {
        var rs: boolean = this.GetConfig().GetRowStatus();
        if (rs) {
            this.rowStatusForm = new RowStatusForm();
            var status: RowStatus = RowStatus.NORMAL;
            this.rowStatusForm.SetRowStatus(status);
            this.header.appendChild(this.rowStatusForm);
        }
    }

    private DrawHeader() {

        this.SetHeader();   
        this.SetTitle();
        this.SetInputPageChager();
        this.SetButtons();
        
        /* var filter: boolean = cf.GetFilter();
        
        //this.SetTransformFormToDataTable();
    
        var fi: ConfigInput = new ConfigInput({
            value: '',
            type: 'text',
            disabled: false,
            hidden: false,
            className: 'col-12 col-lg-6',
            placeholder: 'Filtro',
        }); */

        /* var inpF: InputFilter = new InputFilter(fi);
    
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
        } */
        
        this.AppendChild(this.header);
        this.DrawRowStatus();
    }

    

    public GetRowStatusForm(): RowStatusForm {
        return this.rowStatusForm;
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
                var value: any = inp.GetValue();
                if(Functions.IsBoolean(value) && !inp.IsDisabled() && !inp.IsHidden()) {
                    inp.Focus();
                    exit=true;
                } else if(Functions.IsNullOrEmpty(value) && !inp.IsDisabled() && !inp.IsHidden()){
                    inp.Focus();
                    exit=true;
                }
                i++;
            }

        }
    }
    
}
window.customElements.define('data-form', DataForm, { extends: 'form' });