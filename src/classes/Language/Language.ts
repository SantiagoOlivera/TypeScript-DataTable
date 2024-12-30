import { EnumLanguage } from "../Enum/EnumLanguage";

export class Language {

    public defaults: any;

    constructor(language: EnumLanguage){
        if(language === EnumLanguage.SPANISH){
            this.defaults = {
                boolean: {
                    trueText: 'Sí',
                    falseText: 'No',
                }
            }
        } else if(language === EnumLanguage.ENGLISH){
            this.defaults = {
                boolean: {
                    trueText: 'Yes',
                    falseText: 'No',
                }
            }
        }
    }



}