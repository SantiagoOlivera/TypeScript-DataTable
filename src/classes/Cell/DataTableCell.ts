import * as $ from "jquery";
import "jquery-ui/dist/jquery-ui";
import { ConfigCell } from "../Config/ConfigCell";
import { Cell } from "./Cell";
import { IInput } from "../Interfaces/IInput";
import { Functions } from "../Functions/Functions";
import { DataTableRow } from "../Row/DataTableRow";
import { DataTable } from "../DataTable/DataTable";
import { IconCellRowStatus } from "../Input/IconCellRowStatus";
import { Row } from "../Row/Row";
import { RowStatus } from "../Enum/RowStatus";
import { Table } from "../DataTable/Table";
import { IFocusable } from "../Interfaces/IFocusable";

export abstract class DataTableCell extends Cell implements IFocusable {
    constructor(config: ConfigCell) {
        super(config);
    }
    
    public abstract GetValue(): any;
    public abstract SetValue(value: any): void;
    public abstract Draw(): void;
    public abstract IsFocusable(): boolean 
    public abstract Focus(): void 
}


