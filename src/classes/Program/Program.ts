export class Program {

    public static readonly types = {
        STRING: 'string',
        NUMBER: 'number',
        OBJECT: 'object',
        BOOLEAN: 'boolean',
    }

    public static readonly defaults  = {
        EMPTY_STRING: '',
    }


    public static readonly align = {
        LEFT: 'left',
        RIGHT: 'right',
        CENTER: 'center',
    }

    public static readonly keycodes = {
        KEY_UP: 38,
        KEY_DOWN: 40,
    }

    public static events = {
        CLICK: 'click',
        CHANGE: 'chage',
        CHANGE_PAGE: 'change.page',
        KEY_UP: 'keyup',
    }

    public static bootstrap = {
        INPUT_GROUP: 'input-group',
        SMALL_INPUT_GROUP: 'input-group-sm',
        FLOAT_RIGHT: 'float-end',
        BUTTON_SUCCESS_SMALL: 'btn btn-success btn-sm',
    }

    public static classes = {
        SELECTED: 'selected',
        DATATALBLE: 'DataTable',
        FORM_CONTROL: 'form-control',
        FORM_CONTROL_SMALL: 'form-control form-control-sm',
    }
    
}