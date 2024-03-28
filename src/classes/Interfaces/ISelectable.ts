export interface ISelectable{
    selected: boolean
    toggleSelect: boolean;
    //classSelected: string;
    //SetToggleSelect(toggleSelect:boolean):void;
    IsSelected(): boolean
    Select():void;
    Deselect():void;
}