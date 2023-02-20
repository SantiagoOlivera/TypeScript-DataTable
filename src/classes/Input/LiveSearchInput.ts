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
    private opt: LiveSearchOption
    private input: LiveSearchInput
    private isLastOption: boolean
    constructor(opt: LiveSearchOption, input: LiveSearchInput){
        super();
        this.SetOpt(opt);
        this.SetProps();
        this.SetClassName();
        this.addEventListener('click', (event) => {
            //console.log('click', <LiveSearchOptionInputItem>button, button);
            console.log(this.GetOpt());
            input.value = this.GetOpt().GetText();
            input.focus();
            input.open(false);
        });
        this.addEventListener('dblclick', (event) => {
            event.stopPropagation();
        });
        this.addEventListener('focusout', (event)=>{
            var isNextAnOption = event.relatedTarget instanceof LiveSearchOptionInputItem
            if(!isNextAnOption){
                input.open(false);
            }
        });

    }

    private SetClassName():void{
        this.className = `btn btn-light w-100 mt-1`;
        this.style.fontSize = '10px';
        this.style.height = '25px';
        this.style.border = '0';
        console.log(this);
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
        this.Draw();
        this.className += ` live-search-input`;
    }

    public open(show:boolean){
        if(this.optionsContainer){
            this.ShowOptionsContainer(show);
        }else{
            var div1: HTMLDivElement = document.createElement('div');
            var div2: HTMLDivElement = document.createElement('div');
            var div3: HTMLDivElement = document.createElement('div');
            div1.className = `live-search-input-options bg-primary position-relative w-100 h-0`;
            //div1.style.height = '0px';
           // div1.style.margin = '2px auto';
            //div1.style.border = '1px solid black';
            div2.className = `live-search-input-options-container position-absolute w-100`;
            //div2.style.border = '1px solid black';
            //div2.style.margin = '2px auto';
            div3.className = `live-search-input-options-sub-container bg-light p-1 mt-1`;

            div2.appendChild(div3);
            div1.appendChild(div2);
            this.after(div1);
            this.SetOptionsContainer(div3);
            this.SetOptionsInContainer(LiveSearchInput.test);
            this.SetContainer(div1);
        }
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
        this.DrawOptions(this.options);
    }

    /* private AddOption(opt: LiveSearchOptionInputItem){
        this.options.push(opt);
    }

    private SetOptions(options:Array<LiveSearchOptionInputItem>): void {
        this.options = options;
    }

    private GetOptions(): Array<LiveSearchOptionInputItem>{
        return this.options;
    } */

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
        this.addEventListener('focus', (event)=>{
            this.open(true);
        });
        this.addEventListener('focusout', (event)=>{
            var isOptionSelected = event.relatedTarget instanceof LiveSearchOptionInputItem;
            if(!isOptionSelected){
                this.open(false);
            }
        });
        this.addEventListener('input', ()=>{
            this.filter(this.value);
        });
    }

    private filter(value: string):void{
        var val:string = value.toLocaleLowerCase();
        var options = this.options.filter(
            e => { 
                return ( 
                    e.GetId().toLowerCase().includes(val) 
                    || 
                    e.GetText().toLowerCase().includes(val)
                )
            }
        );
        this.DrawOptions(options);
    }



    private DrawOptions(options: Array<LiveSearchOption>):void{
        this.optionsContainer.innerHTML = null;
        if(options.length === 0){
            var button: LiveSearchOptionInputItem = new LiveSearchOptionInputItem(new LiveSearchOption('', 'No data'), this);
            button.disabled = true;
            this.optionsContainer.appendChild(button);
        }else{
            for(var i=0;i<options.length; i++){
                var o = options[i];
                var button: LiveSearchOptionInputItem = new LiveSearchOptionInputItem(o, this);
                this.optionsContainer.appendChild(button);
            }
        }
    }
    
    private SetOptionsContainer(divContainer: HTMLDivElement):void{
        this.optionsContainer = divContainer;
    }

    public SetValue(value: LiveSearchOption): void {
        this.val = value;
    }

    public GetValue(): LiveSearchOption {
        return this.val;
    }
    
    public GetHTMLElement(): HTMLElement {
        return this;
    }
    
    public Supr(): void {
        console.log("Borrar Live search input");
    }

}

window.customElements.define('live-search-input', LiveSearchInput, { extends: 'input'});