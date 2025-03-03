
import * as $ from "jquery";
import IMask from 'imask';
import { Input } from "./Input";
import { ConfigInput } from '../Config/ConfigInput';
import { Functions } from '../Functions/Functions';
import { Form } from '../Form/Form';
import { Program } from '../Program/Program';
import { IInput } from '../Interfaces/IInput';

export class InputDate extends Input {
    
    private date: Date;
    private mask: any;
    
    private readonly sep = '  /  ';

    constructor(config: ConfigInput){
        super(config);
        var value: Date = config.GetValue();
        if(!Functions.IsNullOrEmpty(value)){
            this.SetValue(value);
        }else {
            this.SetValue(null);
        }
        this.Draw();
        this.SetChangeEvent();
        this.InitDatepicker();
    }

    public InitDatepicker(): void {
        $(this).datepicker({
            dateFormat: 'dd  /  mm  /  yy',
            showButtonPanel: true,
            gotoCurrent: true,
            showOn: 'button',
            onSelect: function(datetext: string, config: any) {
                var day = config.selectedDay;
                var month = config.selectedMonth;
                var year = config.selectedYear;
                var date = new Date(year, month, day)
                this.SetValue(date);
                this.dispatchEvent(new Event(Program.events.CHANGE, { bubbles: true }));
            },
        });
        this.addEventListener(Program.events.KEYDOWN, function(event: KeyboardEvent){
            var keyCode = event.keyCode;
            if(keyCode === Program.keycodes.SPACE) { 
                $(this).datepicker('show');
                event.preventDefault();
            }
        });
        this.addEventListener(Program.events.CLICK, function(event: Event) {
            $(this).datepicker('show');
        });
        this.addEventListener(Program.events.FOCUSOUT, function(event: FocusEvent){
            try{
                if(!Functions.IsNullOrEmpty(event.relatedTarget)){
                    (<IInput><unknown>event.relatedTarget);
                    $(this).datepicker('hide');
                }
            } catch {
            }
        }); 
    }
    

    private SetFormat(format: string): void{
        //this.format = format;
    }

    private GetFormat(): string{
        //return this.format;
        return '';
    }

    public Focus(): void {
        this.focus();
    }

    public IsFocusable(): boolean {
        return true;
    }

    public GetHTMLElement(): HTMLElement {
        return this;
    }

    public SetValue(value: Date): void {
        this.date = value;
        this.UpdateValue();
    }

    public GetValue(): Date {
        return this.date;
    }

    public GetSep(): string {
        return this.sep;
    }

    public Draw(): void {
        this.initDateMask();
    }

    private GetEmptyFormatDate(): string {
        var sep = this.GetSep();
        return `__${sep}__${sep}____`;
    }

    private initDateMask(): void {

        const sep = this.GetSep();
        const format = function(date: Date): string {
            //console.log(date);
            var ret: string = `__${sep}__${sep}____`;
            if(!Functions.IsNullOrEmpty(date)){
                var day: any = date.getDate();
                var month: any = date.getMonth() + 1;
                var year: any = date.getFullYear();
                if (day < 10) day = '0' + day;
                if (month < 10) month = '0' + month;
                ret = [day, month, year].join(sep);
            }
            return ret;
        }
        const parse = function(str: string): Date {
            //console.log(str);
            var ret: Date = null;
            if(!Functions.IsNullOrEmpty(str)){
                var yearMonthDay: Array<string> = str.split(sep);
                var y: number = Number.parseInt(yearMonthDay[2]);
                var m: number = Number.parseInt(yearMonthDay[1]) - 1;
                var d: number = Number.parseInt(yearMonthDay[0]);
                ret = new Date(y, m, d);
            }
            return ret;
        }
        const options = {
            mask: Date, 
            pattern: `d${sep}m${sep}Y`,
            blocks: {
                d: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 31,
                    maxLength: 2,
                },
                m: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 12,
                    maxLength: 2,
                },
                Y: {
                    mask: IMask.MaskedRange,
                    from: 1900,
                    to: 9999,
                }  
            },
            format: format,
            parse: parse,
            lazy: false,
        };

        this.mask = IMask(this, options);

        this.UpdateValue();
        
    }
    

    private UpdateValue(): void {
        var val: Date = this.GetValue();
        if(!Functions.IsNullOrEmpty(this.mask)) {
            this.value = this.mask.masked.format(val);
            this.mask.updateValue();
        }
    }

    public Supr(): void {
        this.value = this.GetEmptyFormatDate();
        this.SetValue(null);
    }

    public GetMask(){
        return this.mask;
    }
    
    private SetChangeEvent():void{
        this.addEventListener('change', function(e) {
            var input = <InputDate>this;
            var mask: any = input.GetMask();
            var value: Date = mask.masked.date;
            if(Functions.IsNullOrEmpty(value)) {
                input.Supr();
            } else {
                input.SetValue(value);
            }
            //console.log(this,this.value, value);
        });
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
    public Empty(): void {
        this.SetValue(null);
    }

    public GetForm(): Form {
        throw new Error('Method not implemented.');
    }
    public GetText(): string {
        //var ret: string = Functions.ToStringDate(this.GetValue(), 'dd/MM/yyyy');
        var ret: string = '';
        if(!Functions.IsNullOrEmpty(this.date)){
            ret = this.value;
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

window.customElements.define('input-date', InputDate, { extends: 'input'});