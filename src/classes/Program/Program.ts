import { Config } from "../Config/Config"
import { IInput } from "../Interfaces/IInput"

export class Program {

    public static readonly types = {
        STRING: 'string',
        NUMBER: 'number',
        OBJECT: 'object',
        BOOLEAN: 'boolean',
    }

    public static readonly defaults: any = {
        EMPTY_STRING: '',
        NOT_FOUND: -1,
        massiveUpdate: {
            YES: {
                enable: true,
                onchange: null,
            },
            NO:{
                enable: false,
                onchange: null,
            }
        },
        /* buttons: {
            ADD: {
                id: 'btnAdd',
                title: '',
                name: 'add',
                data: 'add',
                icon: 'bi bi-plus',
                width: 45,
                height: 45,
                className: 'btn btn-success btn-sm',
                default: true,
                type: 'icon',
            },
            EXCEL: {
                type: 'excel',
            }, 
        } */
    }

    public static buttons = {
        ADD: 'add',
    }


    public static readonly align = {
        LEFT: 'left',
        RIGHT: 'right',
        CENTER: 'center',
    }

    public static readonly keycodes = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        SUPR: 46,
        ENTER: 13,
        DELETE: 8,
        KEY_UP: 38,
        KEY_DOWN: 40,
        SPACE: 32,

    }

    public static events = {
        CLICK: 'click',
        CHANGE: 'change',
        CHANGE_PAGE: 'change.page',
        KEY_UP: 'keyup',
        FOCUS: 'focus',
        FOCUSOUT: 'focusout',
        DOUBLE_CLICK: 'dblclick',
        KEYDOWN: 'keydown',
        INPUT: 'input',
        BEFORE_SHOW_MODAL: 'show.bs.modal',
        AFTER_SHOW_MODAL: 'shown.bs.modal',
        BEFORE_CLOSE_MODAL: 'hide.bs.modal',
        AFTER_CLOSE_MODAL: 'hidden.bs.modal',
        RIGHT_CLICK: 'contextmenu',
    }

    public static bootstrap = {
        INPUT_GROUP: 'input-group',
        SMALL_INPUT_GROUP: 'input-group-sm',
        FLOAT_RIGHT: 'float-end',
        BUTTON_SUCCESS_SMALL: 'btn btn-success btn-sm',
        BUTTON_DANGER_SMALL: 'btn btn-danger btn-sm',
        BUTTON_INFO_SMALL: 'btn btn-info btn-sm',
        BUTTON_LIGHT_SMALL: 'btn btn-light btn-sm',
        WIDTH_100: 'w-100',
        FORM_FLOATING: 'form-floating',
        INVISIBLE: 'invisible',
        TEXT_CENTER: 'text-center',
        LIST_GROUP: 'list-group',
        LIST_GROUP_ITEM: 'list-group-item list-group-item-action',
    }

    public static classes = {
        SELECTED: 'selected',
        DATATALBLE: 'DataTable',
        FORM_CONTROL: 'form-control',
        FORM_CONTROL_SMALL: 'form-control form-control-sm',
        STICKY_COLUMN: 'sticky-column',
        MASSIVE_UPDATE_HEADER: 'btn-massive-update-column-header',
    }

    public static readonly inputTypes = {
        TEXT: 'text',
        NUMBER: 'number',
        LIVE_SEARCH: 'livesearch',
        SELECT: 'select',
        DATE: 'date',
        YEAR: 'year',
        CHECKBOX: 'checkbox',
        CHECKBOX_SWITCH: 'checkbox-switch',
        FORM: 'form',
        ICON: 'icon',
        ROW_NUM: 'rowNum',
        BUTTON: 'button',
    }

    public static readonly buttontypes = {
        ICON: 'icon',
        MODAL: 'modal',

    }

    public static readonly formtypes = {
        SINGLE: 'single',
        MULTIPLE: 'multiple',
    }

    public static readonly icons = {
        ADD: 'bi bi-plus',
        UPDATED: 'bi bi-pencil-square',
        NEW: 'bi bi-plus-lg',
        DELETE: 'bi bi-trash3',
        INFO: 'bi bi-info-circle',
        ERROR: '',
        VERTICAL_DOTS: 'bi bi-three-dots-vertical',
        LIST_CHECK: 'bi bi-list-check',
        CHECK_SQUARE: 'bi bi-check-square',
        EYE: 'bi bi-eye',
        CHECK: 'bi bi-check',
        ORDERED_LIST: 'bi bi-list-ol',
        CALCULATOR: 'bi bi-calculator',
        COPY: 'bi bi-copy',
    }

    public static readonly rowtypes = {
        HEAD: 'head',
        BODY: 'body',
        FOOT: 'foot',
        EMPTY: 'empty',
        PAGINATION: 'pagination',
        OPERATION_BAR: 'operationbar',
    }

    public static readonly celltypes = {
        HEAD: 'head',
        BODY: 'body',
        INPUT: 'input',
        CUSTOM: 'custom',
        ROW_STATUS: 'rowStatus',
        ROW_NUM: 'rowNum',
    }


    public static readonly props = {
        ROW_INDEX: '___rowIndex___',
    }

    public static GetIcon(icon: string): string {
        return `<i class="${icon}"></i>`;
    }



    public GetPossibleColumnOperations(type: string): void {
        var ret
        if(type === Program.inputTypes.NUMBER){

        }
    }
    
    
}


