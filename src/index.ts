
import * as $ from "jquery";
import 'bootstrap/dist/js/bootstrap';
import "jquery-ui/dist/jquery-ui";
import "jquery-ui/themes/base/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../index.css';
import { Form } from "./classes/Form/Form";
import { FormEditable } from "./classes/Form/FormEditable";
import { ConfigForm } from "./classes/Config/ConfigForm";
import { ConfigDataTable } from "./classes/Config/ConfigDataTable";
import { DataTable } from "./classes/DataTable/DataTable";


$(function(){
    $('#resizable').resizable();
})

export {
    DataTable,
    ConfigDataTable,
    FormEditable,
    ConfigForm,
}