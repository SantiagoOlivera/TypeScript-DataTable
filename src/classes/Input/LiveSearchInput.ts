import { Input } from "./Input";

export class LiveSearchOption{
    private id:string;
    private text: string;
    constructor(id:string, text:string){
        this.SetId(id);
        this.SetText(text);
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
}

export class LiveSearchOptionInputItem extends HTMLButtonElement{
    
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

    private readonly keys = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        SUPR: 46,
        ENTER: 13,
        DELETE: 8,
    }

    private readonly events = {
        CLICK: 'click',
        DOUBLE_CLICK: 'dblclick',
        FOCUSOUT: 'focusout',
        KEYDOWN: 'keydown'
    }

    constructor(opt: LiveSearchOption, input: LiveSearchInput, markStr?:string){
        super();
        this.SetOpt(opt);
        this.SetProps();
        this.SetClassName();
        this.MarkStr(markStr);

        this.addEventListener(this.events.CLICK, (event) => {
            input.SetInputValue(this.GetOpt());
            input.focus();
            input.open(false);
        });

        this.addEventListener(this.events.DOUBLE_CLICK, (event) => {
            event.stopPropagation();
        });

        this.addEventListener(this.events.FOCUSOUT, ( event: FocusEvent ) => {
            var isNextAnOption = event.relatedTarget instanceof LiveSearchOptionInputItem;
            if(!isNextAnOption){
                var value: LiveSearchOption = input.GetValue();
                if(!value){
                    input.SetInputValue(null);
                    input.filter('', false);
                }
                input.open(false);
            }
        });

        this.addEventListener(this.events.KEYDOWN, (event: KeyboardEvent) => {
            var keyCode: number = event.keyCode;
            //console.log("rwead", this, this.nextElementSibling, this.previousElementSibling);
            var isLiveSearchOptionInputItem: boolean = false;

            if(keyCode === this.keys.ARROW_DOWN){
                isLiveSearchOptionInputItem = ( this.nextElementSibling instanceof LiveSearchOptionInputItem );
                if(isLiveSearchOptionInputItem && !this.GetIsLastOption()){
                    var nextElement = <LiveSearchOptionInputItem>this.nextElementSibling;
                    nextElement.focus();
                }else{
                    input.focus();
                    input.open(false);
                }
                
                event.preventDefault();
            }else if(keyCode === this.keys.ARROW_UP){
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

    private SetProps(): void{
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

export class LiveSearchInput extends Input{
    
    private container: HTMLDivElement;
    private optionsContainer: HTMLDivElement;
    private options: Array<LiveSearchOption>;
    private val: LiveSearchOption;
    private readonly EMPTY_STRING: string = '';
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

    private readonly keys = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        SUPR: 46,
        ENTER: 13,
        DELETE: 8,
    }

    private static test: Array<LiveSearchOption> = [
        new LiveSearchOption('1','1 - Volkswagen'),
        new LiveSearchOption('2','2 - FIAT'),
        new LiveSearchOption('3','3 - Chevrolet'),
        new LiveSearchOption('4','4 - Ford'),
        new LiveSearchOption('5','5 - Volvo'),
        new LiveSearchOption('6','6 - Toyota'),
        new LiveSearchOption('7','7 - Peugeot'),
    ];

    constructor(
        value?: string, 
        url?:'', 
        options?: Array<LiveSearchOption>
    ) {
        super();
        this.SetClassName();
        this.Draw();
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
            this.CreateOptionsContainer();
        }

        this.SetIsOpen(show);

    }

    private CreateOptionsContainer():void{

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

        this.addEventListener(this.events.CLICK, (event: Event)=>{
            this.open(true);
            this.filter(this.EMPTY_STRING, false);
        });

        this.addEventListener(this.events.FOCUS, (event : FocusEvent)=>{
            var opt: LiveSearchOption = this.GetValue();
            if(!opt){
                this.open(true);
                this.filter(this.EMPTY_STRING, false);
            }
        });

        this.addEventListener(this.events.FOCUSOUT, (event: FocusEvent) => {
            var nextElement: HTMLElement = <HTMLElement>event.relatedTarget;
            var isLiveSearchOptionInputItem: boolean = nextElement instanceof LiveSearchOptionInputItem;
            //var isOptionsContainer: boolean =  nextElement.classList.contains(this.classes.LIVE_SEARCH_INPUT_OPTIONS_SUB_CONTAINER);
            //console.log(isLiveSearchOptionInputItem, isOptionsContainer, event.relatedTarget);
            if(!isLiveSearchOptionInputItem){
                var value: LiveSearchOption = this.GetValue();
                //console.log(value);
                if(!value){
                    this.SetInputValue(null);
                    this.filter(this.EMPTY_STRING, false);
                }
                this.open(false);
            }
        });

        this.addEventListener(this.events.INPUT, (event: InputEvent)=>{
            this.filter(this.value, false);
        });

        this.addEventListener(this.events.KEYDOWN, (event: KeyboardEvent) => {
            var keyCode:number = event.keyCode;
            var isOpen: boolean = this.GetIsOpen();
            if(keyCode === this.keys.ARROW_DOWN){
                if(isOpen){
                    if(!this.GetValue()){
                        this.filter(this.value, true);
                    }else{
                        this.filter(this.EMPTY_STRING, true);
                    }
                    event.stopPropagation();
                }
            }else if(keyCode === this.keys.ENTER){
                if(!isOpen){
                    this.open(true);
                }
            } else if (keyCode === this.keys.SUPR || keyCode === this.keys.DELETE){
                this.Supr();
            }
        });
    }

    public filter(value: string, focus: boolean):void{
        var val:string = value.toLocaleLowerCase();
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
        }else{
            this.deleteAll = true;
            this.SetValue(null);
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

    public SetValue(value: LiveSearchOption): void {
        this.TriggerChangeEvent(value);
        this.val = value;
    }

    private TriggerChangeEvent(value: LiveSearchOption): void {
        var v: LiveSearchOption = this.GetValue();
        if(v){
            if(value){
                if(v.GetId() !== value.GetId()){
                    //trigger change event
                    this.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        } else {
            if(value){
                this.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    }

    public GetValue(): LiveSearchOption {
        return this.val;
    }
    
    public GetHTMLElement(): HTMLElement {
        return this;
    }
    
    public SetInputValue(value:LiveSearchOption){
        this.SetValue(value);
        if(value){
            this.value = value.GetText();
        }else{
            this.value = '';
        }
    }

    public Supr(): void {
        var val: string = this.EMPTY_STRING;
        this.SetInputValue(null);     
        this.open(true);
        this.filter(val, false);
    }

    public IsFocusable(): boolean {
        return true;
    }

    public Focus(): void {
        this.focus();
    }

}

window.customElements.define('live-search-input', LiveSearchInput, { extends: 'input'});