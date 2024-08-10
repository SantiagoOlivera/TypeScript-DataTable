import 'bootstrap/dist/js/bootstrap';
import "jquery-ui/themes/base/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../index.css';
import { ConfigForm } from "./classes/Config/ConfigForm";
import { DataForm } from "./classes/Form/DataForm";
import { ConfigDataTable } from "./classes/Config/ConfigDataTable";
import { DataTable } from "./classes/DataTable/DataTable";



/* $(function(){
    $('#resizable').resizable();
}) */

export {
    DataForm,
    ConfigForm,
    ConfigDataTable,
    DataTable,
}