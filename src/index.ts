import * as $ from "jquery";
import "jquery-ui/dist/jquery-ui";
import "jquery-ui/themes/base/all.css";
import { ConfigDataTableReadOnly, ConfigDataTableEditable } from "./classes/Config/ConfigDataTable";
import { DataTableReadOnly } from "./classes/DataTable/DataTableReadOnly";
import { DataTableEditable } from "./classes/DataTable/DataTableEditable";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../index.css';

$(function(){
    $('#resizable').resizable();
})

export {
    DataTableReadOnly,
    DataTableEditable,
    ConfigDataTableReadOnly,
    ConfigDataTableEditable,
}