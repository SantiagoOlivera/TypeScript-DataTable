import { ConfigInput } from "../Config/ConfigInput";
import { Form } from "../Form/Form";
import { Functions } from "../Functions/Functions";
import { IComparable } from "../Interfaces/IComparable";
import { Program } from "../Program/Program";
import { Input } from "./Input";
import axios from 'axios';

export class LiveSearchOption implements IComparable {

    private id:string;
    private text: string;
    private disabled: boolean;
    private hidden: boolean;

    constructor( id: string, text: string ){
        this.SetId(id);
        this.SetText(text);
    }

    public Compare(val: any): boolean {
        var ret: boolean = false;
        if(val instanceof LiveSearchOption){
            ret = this.GetId() === (<LiveSearchOption>val).GetId();
        }
        return ret;
    }

    public GetId(): string{
        return this.id;
    }
    public GetText(): string{
        return this.text;
    }
    private SetId(id:string){
        this.id = id;
    }
    private SetText(text:string){
        this.text = text;
    }

    public static IsLiveSearchOption(val: any): boolean {
        var ret: boolean = false;
        if(val instanceof LiveSearchOption){
            ret = true;
        }
        return ret;
    }

    private static IsValidObject(val: any): boolean {
        var ret: boolean = false;
        if(!Functions.IsNullOrEmpty(val)){
            if(Functions.IsObject(val)){
                var keys: number = Object.keys(val).length;
                if(keys === 2){
                    if( val.hasOwnProperty('id') && val.hasOwnProperty('text')) {
                        ret = true;
                    }
                }
            }
        }
        return ret;
    }

    public static ConvertObjectToLiveSearchOption(val: any): LiveSearchOption {
        var ret: LiveSearchOption = null;
        if(LiveSearchOption.IsValidObject(val)){
            ret = new LiveSearchOption(val.id, val.text);
        }
        return ret;
    }
    
    public static ConvertArrayObjectToArrayLiveSearchOption(options: any): Array<LiveSearchOption> {
        var ret: Array<LiveSearchOption> = [];
        if(Functions.IsArray(options)){
            for(var o of options){
                var opt: LiveSearchOption = LiveSearchOption.ConvertObjectToLiveSearchOption(o);
                if(!Functions.IsNullOrEmpty(opt)) {
                    ret.push(opt);
                }
            }
        }
        return ret;
    }

}

export class LiveSearchOptionInputItem extends HTMLButtonElement {
    
    private opt: LiveSearchOption;
    private input: LiveSearchInput;
    private isFirstOption: boolean;
    private isLastOption: boolean;
    private markStr: string;
    
    private readonly classes = {
        LIVE_SEARCH_INPUT_BUTTON:'live-search-input-button',
        BTN: 'btn',
        BTN_LIGHT: 'btn-light',
        WIDTH_100: 'w-100',
        MARGIN_TOP_1: 'mt-1',
    };

    

    constructor(opt: LiveSearchOption, input: LiveSearchInput, markStr?:string){
        super();
        this.type = 'button';
        this.SetInput(input);
        this.SetOpt(opt);
        this.SetProps();
        this.SetClassName();
        this.MarkStr(markStr);

        this.addEventListener(Program.events.KEY_UP, (event: KeyboardEvent) => {
            var key: string = event.key;
            if(key.length === 1) {
                input.SetValue(null);
                input.Focus();
                var text: string = input.GetText();
                input.value = text + key;
                input.filter(input.value, true);
            }
        });

        this.addEventListener(Program.events.CLICK, (event) => {
            input.SetInputValue(this.GetOpt(), true);
            input.focus();
            input.open(false);
        });

        this.addEventListener(Program.events.DOUBLE_CLICK, (event) => {
            event.stopPropagation();
        });

        this.addEventListener(Program.events.FOCUSOUT, ( event: FocusEvent ) => {
            var isNextAnOption = event.relatedTarget instanceof LiveSearchOptionInputItem;
            if(!isNextAnOption){
                var value: LiveSearchOption = input.GetValue();
                if(Functions.IsNullOrEmpty(value)){
                    input.SetInputValue(null, true);
                    input.filter(Program.defaults.EMPTY_STRING, false);
                    input.EmptyInputText();
                }
                input.open(false);
            }
        });

        this.addEventListener(Program.events.KEYDOWN, (event: KeyboardEvent) => {
            var keyCode: number = event.keyCode;
            //console.log("rwead", this, this.nextElementSibling, this.previousElementSibling);
            var isLiveSearchOptionInputItem: boolean = false;

            if(keyCode === Program.keycodes.ARROW_DOWN){
                isLiveSearchOptionInputItem = ( this.nextElementSibling instanceof LiveSearchOptionInputItem );
                if(isLiveSearchOptionInputItem && !this.GetIsLastOption()){
                    var nextElement = <LiveSearchOptionInputItem>this.nextElementSibling;
                    nextElement.focus();
                }else{
                    input.focus();
                    input.open(false);
                }
                
                event.preventDefault();
            }else if(keyCode === Program.keycodes.ARROW_UP){
                isLiveSearchOptionInputItem = ( this.previousElementSibling instanceof LiveSearchOptionInputItem );
                if(isLiveSearchOptionInputItem){
                    var nextElement = <LiveSearchOptionInputItem>this.previousElementSibling;
                    nextElement.focus();
                }else if(this.GetIsFirstOption()){
                    input.focus();
                }
            }
            event.stopPropagation();
        });
    }

    private SetInput(input: LiveSearchInput): void {
        this.input = input;
    }
    
    private MarkStr(str: string):void{
        var opt: LiveSearchOption = this.GetOpt();
        if(str) {
            var regEx = new RegExp(str, 'gi');
            var optStr: string = opt.GetText();
            var ret: string = '';
            var i: number = 0;
            var start: number = 0;
            var end: number = null;
            var m = null;
            var matchs = optStr.match(regEx);
            while (i < matchs.length) {

                m = regEx.exec(optStr);

                if(i === 0){
                    start = 0;
                    end = m.index - 1;
                } else {
                    start = end + matchs[i].length + 1;
                    end = m.index;
                }

                console.log(start, end, optStr.substring(start, end));
                if(i === 0){
                    ret += optStr.substring(
                        start, 
                        (end + 1)
                    );
                }else{
                    ret += optStr.substring(
                        start, 
                        end
                    );
                }

                
                ret +=  `<span>${matchs[i]}</span>`;
                
                if(i === (matchs.length - 1)){
                    if(i === 0){
                        ret += optStr.substring(( end + matchs[i].length + 1), optStr.length)
                    }else{
                        ret += optStr.substring(( end + matchs[i].length), optStr.length)
                    }
                }

                i++;
            }

            this.innerHTML = ret;

        }
    }


    public SetIsFirstOption(isFirsOption: boolean):void{
        this.isFirstOption = isFirsOption;
    }

    public GetIsFirstOption(): boolean{
        return this.isFirstOption;
    }

    public SetIsLastOption(isLastOption: boolean) {
        this.isLastOption = isLastOption;
    }

    public GetIsLastOption(): boolean{
        return this.isLastOption;
    }

    private SetClassName():void{
        this.classList.add(this.classes.BTN);
        this.classList.add(this.classes.BTN_LIGHT);
        this.classList.add(this.classes.WIDTH_100);
        this.classList.add(this.classes.MARGIN_TOP_1);
        this.classList.add(this.classes.LIVE_SEARCH_INPUT_BUTTON);
    }

    private SetProps(): void {
        var opt: LiveSearchOption = this.GetOpt();
        this.setAttribute( 'value', opt.GetId() );
        this.innerHTML = opt.GetText();
    }

    private SetOpt(opt: LiveSearchOption):void{
        this.opt = opt;
    }

    public GetOpt(): LiveSearchOption {
        return this.opt;
    }
}

window.customElements.define('live-search-option-input-item', LiveSearchOptionInputItem, { extends: 'button'});


class LiveSearchOptionsUrl {

    private id: string;
    private url: string;
    private options: Array<LiveSearchOption>;

    constructor(id:string, url: string) {
        this.id = id;
        this.url = url;
        this.options = new Array<LiveSearchOption>();
        //this.Load();
    }

    public GetId(): string {
        return this.id;
    }

    public GetUrl(): string {
        return this.url;
    }

    public GetOptions(): Array<LiveSearchOption> {
        return this.options;
    }

    public Load(): void {
        var lsou: LiveSearchOptionsUrl = this;
        axios.get(this.GetUrl()).then(function (response) {
          // handle success
          console.log(response);
          lsou.SetOptions(response.data);
        }).catch(function (error) {
          // handle error
          console.log(error);
        }).finally(function () {
          // always executed
        });
    }

    public SetOptions(data: any): void {
        if(Array.isArray(data)){
            for(var d of data) { 
                var exists = this.options.some(e => { return e.GetId() === d.id });
                if(!exists){
                    var opt: LiveSearchOption = new LiveSearchOption(d.id, d.text);
                    this.options.push(opt);
                }
                this.options.sort(function(a,b) {
                    var ret: number = 0;
                    if(
                        !isNaN(parseInt(a.GetId())) && 
                        !isNaN(parseInt(b.GetId()))
                    ) {
                        ret = parseInt(a.GetId()) - parseInt(b.GetId());
                    }
                    return  ret;
                });
            }
        }
    }

    public AddOption(d: any): void {
        if(!Functions.IsNullOrEmpty(d)){
            var exists = this.options.some(e => { return e.GetId() === d.id });
            if(LiveSearchOption.IsLiveSearchOption(d)) {
                if(!exists){
                    var opt: LiveSearchOption = new LiveSearchOption(d.id, d.text);
                    this.options.push(opt);
                }
            }
        }
    }


}

class LiveSearchOptionsGetter {
    
    private options: any = null;

    constructor() {
        this.options = {};
    }

    public SetOption(id: string, url: string): void {
        var opt: any = this.options[id];
        if(Functions.IsNullOrEmpty(opt)){
            this.options[id] = new LiveSearchOptionsUrl(id, url);
        }
    }

    public GetOption(id: string): LiveSearchOptionsUrl {
        return this.options[id];
    }

    public AddOption(id: string, o: LiveSearchOption): void {
        var opts: Array<LiveSearchOption> = this.options[id];
        if(opts && !Functions.IsNullOrEmpty(o)) {
            this.options[id].AddOption(o);
        }
    }

}


export class LiveSearchInput extends Input {

    public static getter: LiveSearchOptionsGetter = new LiveSearchOptionsGetter();
    
    
    private container: HTMLDivElement;
    private optionsContainer: HTMLDivElement;
    private options: Array<LiveSearchOption>;
    private val: LiveSearchOption;
    private previusValue: LiveSearchOption;
    private deleteAll: boolean = true;
    private isOpen: boolean;

    private readonly HTMLElements = {
        DIV: 'div',
    }

    private readonly events = {
        CLICK: 'click',
        INPUT: 'input',
        KEYDOWN: 'keydown',
        FOCUS: 'focus',
        FOCUSOUT: 'focusout',
    }

    private readonly classes = {
        LIVE_SEARCH_INPUT: 'live-search-input',
        LIVE_SEARCH_INPUT_OPTIONS: 'live-search-input-options',
        LIVE_SEARCH_INPUT_OPTIONS_CONTAINER: 'live-search-input-options-container',
        LIVE_SEARCH_INPUT_OPTIONS_SUB_CONTAINER: 'live-search-input-options-sub-container',
        BORDER: 'border',
        POSITION_RELATIVE: 'position-relative',
        POSITION_ABSOLUTE: 'position-absolute',
        WIDTH_100: 'w-100',
        HEIGHT_0: 'h-0',
        BACKGROUND_PRIMARY: 'bg-primary',
        BACKGROUND_LIGHT: 'bg-light',
        PADDING_1: 'p-1',
        //OVERFLOW_AUTO: 'overflow-auto',
    }

    
    private static test: Array<LiveSearchOption> = [
        new LiveSearchOption('1','1 - Volkswagen'),
        new LiveSearchOption('2','2 - FIAT'),
        new LiveSearchOption('3','3 - Chevrolet'),
        new LiveSearchOption('4','4 - Ford'),
        new LiveSearchOption('5','5 - Volvo'),
        new LiveSearchOption('6','6 - Toyota'),
        new LiveSearchOption('7','7 - Peugeot'),
        new LiveSearchOption('15','15 - Descripcion muy muy muy larga'),
    ];

    constructor(config: ConfigInput) {
        super(config);

        LiveSearchInput.getter.SetOption('marcas_autos', 'https://my.api.mockaroo.com/marcas_autos?key=407a6990');

        var value: any = config.GetValue();
        var val: LiveSearchOption = null;
        if(!Functions.IsNullOrEmpty(value)) {
            val = new LiveSearchOption(value['id'], value['text']);
        } else {
            val = null;
        }
        var url: string = config.GetApiUrl();
        //var options: Array<any> = config.GetOptions();
        //this.SetOptions(LiveSearchOption.ConvertArrayObjectToArrayLiveSearchOption(LiveSearchInput.test));
        this.SetClassName();
        this.SetInputValue(val, false);
        this.SetPreviousValue(val);
        this.Draw();
    }

    public GetOptions(): Array<LiveSearchOption> {
        //return this.options;
        return LiveSearchInput.getter.GetOption(this.GetConfig().GetDataType()).GetOptions();
    }

    /* private SetOptions(options: Array<LiveSearchOption>): void {
        this.options = options;
    } */

    private SetPreviousValue(value: LiveSearchOption): void {
        this.previusValue = null;
        if(!Functions.IsNullOrEmpty(value)){
            this.previusValue = value;
        } 
    }

    public GetPreviusValue(): LiveSearchOption {
        return this.previusValue;
    }

    private SetClassName():void{
        this.classList.add(this.classes.LIVE_SEARCH_INPUT);
    }

    private GetIsOpen(): boolean{
        return this.isOpen;
    }

    private SetIsOpen(isOpen: boolean):void {
        this.isOpen = isOpen;
    }

    public open(show:boolean){

        if(this.optionsContainer){
            this.ShowOptionsContainer(show);
        }else{
            if(show){
                this.CreateOptionsContainer();
            }
        }

        this.SetIsOpen(show);

    }

    private CreateOptionsContainer(): void {

        var div1: HTMLDivElement = <HTMLDivElement>document.createElement(this.HTMLElements.DIV);
        var div2: HTMLDivElement = <HTMLDivElement>document.createElement(this.HTMLElements.DIV);
        var div3: HTMLDivElement = <HTMLDivElement>document.createElement(this.HTMLElements.DIV);
        
        //div1.className = `live-search-input-options bg-primary position-relative w-100 h-0`;
        div1.classList.add(this.classes.LIVE_SEARCH_INPUT_OPTIONS);
        div1.classList.add(this.classes.BACKGROUND_PRIMARY);
        div1.classList.add(this.classes.POSITION_RELATIVE);
        div1.classList.add(this.classes.WIDTH_100);
        div1.classList.add(this.classes.HEIGHT_0);

        //div2.className = `live-search-input-options-container position-absolute w-100`;
        div2.classList.add(this.classes.LIVE_SEARCH_INPUT_OPTIONS_CONTAINER);
        div2.classList.add(this.classes.WIDTH_100);
        div2.classList.add(this.classes.POSITION_ABSOLUTE);
        div2.style.zIndex = '10000';

        //div3.className = `live-search-input-options-sub-container bg-light p-1 mt-1 border`;
        div3.classList.add(this.classes.LIVE_SEARCH_INPUT_OPTIONS_SUB_CONTAINER);
        div3.classList.add(this.classes.BACKGROUND_LIGHT);
        div3.classList.add(this.classes.PADDING_1);
        div3.classList.add(this.classes.BORDER);
        //div3.classList.add(this.classes.OVERFLOW_AUTO);
        div3.tabIndex = -1;

        div2.appendChild(div3);
        div1.appendChild(div2);
        this.after(div1);
        this.SetOptionsContainer(div3);
        this.SetOptionsInContainer(LiveSearchInput.test);
        //this.SetOptionsInContainer(this.GetOptions());
        this.SetContainer(div1);
    }

    private SetContainer(container: HTMLDivElement){
        this.container = container;
    }

    private GetContainer():HTMLDivElement{
        return this.container;
    }

    private SetOptionsInContainer(options: Array<LiveSearchOption>){
        this.LoadOptions(options);
    }

    private LoadOptions(options: Array<LiveSearchOption>){
        this.options = options;
        this.DrawOptions(this.options, false);
    }

    
    private ShowOptionsContainer(show:boolean){
        
        if(show){
            this.container.classList.add(this.bootrapClasses.DISPLAY_BLOCK);                
            this.container.classList.remove(this.bootrapClasses.DISPLAY_NONE);
        }else{
            this.container.classList.remove(this.bootrapClasses.DISPLAY_BLOCK);                
            this.container.classList.add(this.bootrapClasses.DISPLAY_NONE);
        }
    }


    

    public Draw(): void {
        this.SetEvents();
    }

    private SetEvents(): void {

        this.addEventListener(Program.events.CLICK, (event: Event) => {
            this.open(true);
            this.filter(Program.defaults.EMPTY_STRING, false);
        });

        this.addEventListener(Program.events.FOCUS, (event : FocusEvent) => {
            var opt: LiveSearchOption = this.GetValue();
            if(Functions.IsNullOrEmpty(opt)){
                this.open(true);
                this.filter(Program.defaults.EMPTY_STRING, false);
            }
        });

        this.addEventListener(Program.events.FOCUSOUT, (event: FocusEvent) => {
            var nextElement: HTMLElement = <HTMLElement>event.relatedTarget;
            var isLiveSearchOptionInputItem: boolean = nextElement instanceof LiveSearchOptionInputItem;
            //var isOptionsContainer: boolean =  nextElement.classList.contains(this.classes.LIVE_SEARCH_INPUT_OPTIONS_SUB_CONTAINER);
            //console.log(isLiveSearchOptionInputItem, isOptionsContainer, event.relatedTarget);
            var value: LiveSearchOption = this.GetValue();
            if(!isLiveSearchOptionInputItem) {
                if(Functions.IsNullOrEmpty(value)){
                    this.SetInputValue(null, true);
                    this.filter(Program.defaults.EMPTY_STRING, false);
                    this.EmptyInputText();
                }
                this.open(false);
            }
        });

        this.addEventListener(Program.events.INPUT, (event: InputEvent) => {
            var val: LiveSearchOption = this.GetValue();
            if(Functions.IsNullOrEmpty(val)){
                //Solo filtrar si no esta seleccionado
                this.filter(this.value, false);
            } else {
                this.value = val.GetText();
            }
        });

        this.addEventListener(Program.events.KEYDOWN, (event: KeyboardEvent) => {
            var keyCode:number = event.keyCode;
            var isOpen: boolean = this.GetIsOpen();
            if(keyCode === Program.keycodes.ARROW_DOWN){
                if(isOpen){
                    if(!this.GetValue()){
                        this.filter(this.value, true);
                    }else{
                        this.filter(Program.defaults.EMPTY_STRING, true);
                    }
                    event.stopPropagation();
                }
            }else if(keyCode === Program.keycodes.ENTER){
                if(!isOpen){
                    this.open(true);
                }
            } else if (keyCode === Program.keycodes.SUPR || keyCode === Program.keycodes.DELETE){
                this.Supr();
            } else if(keyCode === Program.keycodes.ARROW_UP){
                this.open(false);
            }
        });
    }

    public filter(value: string, focus: boolean): void {
        var val: string = value.toLocaleLowerCase();
        var options = this.options.filter(
            e => { 
                return ( 
                    e.GetId().toLowerCase().includes(val) 
                    || 
                    e.GetText().toLowerCase().includes(val)
                );
            }
        );

        if(options.length > 0){
            this.deleteAll = false;
        } else {
            this.deleteAll = true;
            //this.SetValue(null);
        }
        this.DrawOptions(options, focus, val);
    }



    private DrawOptions(options: Array<LiveSearchOption>, focus: boolean, markStr?: string ):void{
        this.optionsContainer.innerHTML = null;
        if(options.length === 0){
            var button: LiveSearchOptionInputItem = new LiveSearchOptionInputItem(new LiveSearchOption('', 'No data'), this);
            button.disabled = true;
            this.optionsContainer.appendChild(button);
        }else{
            var firstOpt: LiveSearchOptionInputItem = null; 
            for(var i=0;i<options.length; i++){
                var o = options[i];
                var button: LiveSearchOptionInputItem = new LiveSearchOptionInputItem(o, this, markStr);
                if(i === 0){
                    firstOpt = button;
                    button.SetIsFirstOption(true);
                }else if(i === options.length){
                    button.SetIsLastOption(true);
                } else {
                    button.SetIsFirstOption(false);
                }

                this.optionsContainer.appendChild(button);
            }

            if(focus){
                this.optionsContainer.style.overflowY = 'hidden';
                firstOpt.focus();
                this.optionsContainer.style.overflowY = null;
            }
            
        }
    }
    
    private SetOptionsContainer(divContainer: HTMLDivElement):void{
        this.optionsContainer = divContainer;
    }

    public SetValue(value: any): void {
        var opt: LiveSearchOption = null;
        var text: string = '';
        if(!Functions.IsNullOrEmpty(value)){
            if(value instanceof LiveSearchOption){
                opt = value;
                text = value.GetText();
            } else {
                opt = LiveSearchOption.ConvertObjectToLiveSearchOption(value);
                if(!Functions.IsNullOrEmpty(opt)) {
                    text = opt.GetText();
                    this.AddOption(opt);
                }
            }
        }
        this.val = opt;
        this.value = text;
    }

    private AddOption(opt: LiveSearchOption): void {
        /* if(!this.ExistOption(opt.GetId())){
            this.options.push(opt);
        } */
       LiveSearchInput.getter.AddOption(this.GetConfig().GetDataType(), opt);
    }

    /* private ExistOption(id: string): boolean {
        var ret: boolean = false;
        if(!Functions.IsNullOrEmpty(this.options)){
            ret = this.options.some( e => { return e.GetId() === id; });
        }
        return ret;
    } */

    public Empty(): void {
        this.EmptyInputText();
        this.SetInputValue(null, false);  
    }

    public EmptyInputText(): void {
        this.value = Program.defaults.EMPTY_STRING;
    }

    public GetForm(): Form {
        throw new Error("Method not implemented.");
    }



    
    private TriggerChangeEvent(): void {
        var v: LiveSearchOption = this.GetValue();
        var pv: LiveSearchOption = this.GetPreviusValue();
        if(!Functions.IsNullOrEmpty(v) && !Functions.IsNullOrEmpty(pv)) {
            if(v.GetId() !== pv.GetId()){
                //trigger change event
                this.dispatchEvent(new Event(Program.events.CHANGE, { bubbles: true }));
            }
        } else if(!Functions.IsNullOrEmpty(v) && Functions.IsNullOrEmpty(pv)) {
            this.dispatchEvent(new Event(Program.events.CHANGE, { bubbles: true }));
           /*  if(!Functions.IsNullOrEmpty(value)){
                this.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
                this.Empty();
            } */
        } else if(!Functions.IsNullOrEmpty(pv) && Functions.IsNullOrEmpty(v) ) {
            this.dispatchEvent(new Event(Program.events.CHANGE, { bubbles: true }));
        }
    }

    public GetValue(): LiveSearchOption {
        return this.val;
    }
    
    public GetHTMLElement(): HTMLElement {
        return this;
    }
    
    public SetInputValue( value: LiveSearchOption, dispatchChange: boolean ) {
        var v: LiveSearchOption = null;
        var pv: LiveSearchOption = this.GetValue();
        this.SetPreviousValue(pv);

        if(!Functions.IsNullOrEmpty(value)){
            if(Functions.IsLiveSearchOption(value)) {
                v = value;
            }
        }

        this.SetValue(v);
        if(dispatchChange){
            this.TriggerChangeEvent();
        }
    }

    public Supr(): void {
        this.EmptyInputText();
        this.SetInputValue(null, true);     
        this.open(true);
        this.filter(Program.defaults.EMPTY_STRING, false);
    }

    public IsFocusable(): boolean {
        return true;
    }

    public Focus(): void {
        this.focus();
    }
    
    public Disable(disabled: boolean): void {
        this.disabled = disabled;
    }
    public Hide(hidden: boolean): void {
       this.hidden = hidden;
    }
    public IsDisabled(): boolean {
        return this.disabled;
    }
    public IsHidden(): boolean {
        return this.hidden;
    }
    public GetText(): string {
        var ret: string = '';
        if(Functions.IsNullOrEmpty(this.val)){
            ret = this.val.GetText();
        }
        return ret;
    }
    public IsEditable(): boolean {
        return this.GetConfig().GetEditable();
    }
    public SetDefault(): void {
        this.SetValue(null);
    }
}

window.customElements.define('live-search-input', LiveSearchInput, { extends: 'input'});