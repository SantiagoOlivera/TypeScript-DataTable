import { Functions } from "../Functions/Functions";
import { Program } from "../Program/Program";

export class Config {
    
    private config: Object;

    private disabled: boolean;
    private hidden: boolean;
    private editable: boolean;

    private id: string;
    private type: string;
    private title: string;
    private className: string;
    private name: string;
    private tooltip: string;
    private innerHTML: string;
    private align: string;
    private prefix: string;
    private suffix: string;
    private text: string;

    private width: number;
    private height: number;
    private maxWidth: number;
    private minWidth: number;
    private minHeight: number;
    private maxHeight: number;
    private size: number;
    private length: number;
    private index: number;
    


    constructor(config: any) {

        var id: string = config.id;
        var type: string = config.type;
        var title: string = config.title;
        var disabled: boolean = config.disabled;
        var editable: boolean = config.editable;
        var hidden: boolean = config.hidden;
        var editable: boolean = config.editable;
        var className: string = config.className;
        var name: string = config.name;
        var tooltip: string = config.tooltip;
        var innerHTML: string = config.innerHTML;
        var maxWidth: number = config.maxWidth;
        var minWidth: number = config.minWidth;
        var maxHeight: number = config.maxHeight;
        var minHeight: number = config.minHeight;
        var align: string  = config.align;
        var prefix: string = config.prefix;
        var suffix: string = config.suffix;
        var width: number = config.width;
        var height: number = config.height;
        var text: string = config.text;
        var size: number = config.size;
        var length: number = config.length;
        var index: number = config.index;

        if(!Functions.IsNullOrEmpty(config)){
            this.SetConfig(config);
        }
        if(!Functions.IsNullOrEmpty(id)){
            this.SetId(id);
        }
        if(!Functions.IsNullOrEmpty(type)){
            this.SetType(type);
        }
        if(!Functions.IsNullOrEmpty(title)){
            this.SetTitle(title);
        }
        if(!Functions.IsNullOrEmpty(disabled)){
            this.SetDisabled(disabled);
        }
        if(!Functions.IsNullOrEmpty(hidden)){
            this.SetHidden(hidden);
        }
        if(!Functions.IsNullOrEmpty(editable)){
            this.SetEditable(editable);
        }
        if(!Functions.IsNullOrEmpty(className)){
            this.SetClassName(className);
        }
        if(!Functions.IsNullOrEmpty(name)){
            this.SetName(name);
        }
        if(!Functions.IsNullOrEmpty(tooltip)){
            this.SetTooltip(tooltip);
        }
        if(!Functions.IsNullOrEmpty(innerHTML)){
            this.SetInnerHTML(innerHTML);
        }
        if(!Functions.IsNullOrEmpty(maxWidth)){
            this.SetMaxWidth(maxWidth);
        }
        if(!Functions.IsNullOrEmpty(minWidth)){
            this.SetMinWidth(minWidth);
        }
        if(!Functions.IsNullOrEmpty(maxHeight)){
            this.SetMaxHeight(maxHeight);
        }
        if(!Functions.IsNullOrEmpty(minHeight)){
            this.SetMinHeight(minHeight);
        }
        if(!Functions.IsNullOrEmpty(align)){
            this.SetAlign(align);
        } else {
            this.SetAlign(Program.align.LEFT);
        }
        if(!Functions.IsNullOrEmpty(prefix)){
            this.SetPrefix(prefix);
        } else {
            this.SetPrefix('');
        }
        if(!Functions.IsNullOrEmpty(suffix)){
            this.SetSuffix(suffix);
        } else {
            this.SetSuffix('');
        }
        if(!Functions.IsNullOrEmpty(width)){
            this.SetWidth(width);
        } else {
            this.SetWidth(null);
        }
        if(!Functions.IsNullOrEmpty(height)){
            this.SetHeight(height);
        } else {
            this.SetHeight(null);
        }
        if(!Functions.IsNullOrEmpty(editable)){
            this.SetEditable(editable);
        } else {
            this.SetEditable(true);
        }
        if(!Functions.IsNullOrEmpty(text)){
            this.SetText(text);
        }else{
            this.SetText(null);
        }
        if(!Functions.IsNullOrEmpty(size)){
            this.SetSize(size);
        }else{
            this.SetSize(0);
        }
        if(!Functions.IsNullOrEmpty(length)){
            this.SetLength(length);
        }else{
            this.SetLength(0);
        }
        if(!Functions.IsNullOrEmpty(index)){
            this.SetIndex(index);
        }else{
            this.SetIndex(null);
        }
        
    }

    
    //Getters
    public GetConfig(): Object {
        return this.config;
    }
    public GetId(): string {
        return this.id;
    }
    public GetTitle(): string {
        return this.title;
    }
    public GetType(): string {
        return this.type;
    }
    public GetDisabled(): boolean {
        return this.disabled;
    }
    public GetHidden(): boolean {
        return this.disabled;
    }
    public GetClassName(): string {
        return this.className;
    }
    public GetName(): string {
        return this.name;
    }
    public GetTooltip(): string {
        return this.tooltip;
    }
    public GetInnerHTML(): string {
        return this.innerHTML;
    }
    public GetMaxWidth(): number {
        return this.maxWidth;
    }
    public GetMinWidth(): number {
        return this.minWidth;
    }
    public GetMaxHeight(): number {
        return this.maxHeight;
    }
    public GetMinHeight(): number {
        return this.minHeight;
    }
    public GetAlign(): string {
        return this.align;
    }
    public GetPrefix(): string {
        return this.prefix;
    }
    public GetSuffix(): string {
        return this.suffix;
    }
    public GetWidth(): number {
        return this.width;
    }
    public GetHeight(): number {
        return this.height;
    }
    public GetEditable(): boolean {
        return this.editable;
    }
    public GetText(): string {
        return this.text;
    }
    public GetSize(): number {
        return this.size;
    }
    public GetLength(): number {
        return this.length;
    }
    public GetIndex(): number {
        return this.index;
    }

    //Setters
    private SetConfig(config: Object){
        this.config = config;
    }
    private SetId(id: string): void {
        this.id = id;
    }
    private SetTitle(title: string): void {
        this.title = title;
    }
    public SetType(type: string): void {
        this.type = type;
    }
    private SetDisabled(disabled: boolean): void {
        this.disabled = disabled;
    }
    private SetHidden(hidden: boolean): void {
        this.hidden = hidden;
    }
    private SetEditable(editable: boolean): void {
        this.editable = editable;
    }
    private SetClassName(className: string): void {
        this.className = className;
    }
    private SetName(name: string): void {
        this.name = name;
    }
    private SetTooltip(tooltip: string): void {
        this.tooltip = tooltip;
    }
    public SetInnerHTML(innerHTML: string): void {
        this.innerHTML = innerHTML;
    }
    private SetMaxWidth(maxWidth: number): void {
        this.maxWidth = maxWidth;
    }
    private SetMinWidth(minWidth: number): void {
        this.minWidth = minWidth;
    }
    private SetMaxHeight(maxHeight: number): void {
        this.maxHeight = maxHeight;
    }
    private SetMinHeight(minHeight: number): void {
        this.minHeight = minHeight;
    }
    private SetAlign(align: string): void {
        this.align = align;
    }
    private SetPrefix(prefix: string): void {
        this.prefix = prefix;
    }
    private SetSuffix(suffix: string): void {
        this.suffix = suffix;
    }
    private SetWidth(width: number): void {
        this.width = width;
    }
    private SetHeight(height: number): void {
        this.height = height;
    }
    private SetText(text: string): void {
        this.text = text;
    }
    private SetSize(size: number): void {
        this.size = size;
    }
    private SetLength(length: number): void {
        this.length = length;
    }
    private SetIndex(index: number): void {
        this.index = index;
    }
    
}