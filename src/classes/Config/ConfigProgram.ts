import { Language } from "../Language/Language";
import { Config } from "./Config";

export class ConfigProgram extends Config {

    private language: Language;

    constructor(config: any) {
        super(config);
    }
    
}