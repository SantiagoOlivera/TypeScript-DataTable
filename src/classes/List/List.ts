import { ConfigList } from "../Config/ConfigList";
import { Functions } from "../Functions/Functions";
import { IDraw } from "../Interfaces/IDraw";
import { Program } from "../Program/Program";
import { ListItem } from "./ListItem";

export abstract class List extends HTMLUListElement implements IDraw {

    private config: ConfigList;
    private items: Array<ListItem>;

    constructor(config: ConfigList){
        super();
        this.SetConfig(config);
        this.SetClassName();
    }

    private SetClassName(): void {
        var className: string = this.GetConfig().GetClassName();
        if(!Functions.IsNullOrEmpty(className)){
            this.className = Program.bootstrap.LIST_GROUP + ' ' + this.GetConfig().GetClassName();
        } else {
            this.className = Program.bootstrap.LIST_GROUP;
        }
    }
    
    private SetConfig(config: ConfigList): void {
        this.config = config;
    }

    public GetConfig(): ConfigList {
        return this.config;
    }

    public abstract Draw(): void 

}

