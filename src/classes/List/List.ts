import { ConfigList } from "../Config/ConfigList";
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
        this.className = Program.bootstrap.LIST_GROUP + ' ' + this.GetConfig().GetClassName();
    }
    
    private SetConfig(config: ConfigList): void {
        this.config = config;
    }

    public GetConfig(): ConfigList {
        return this.config;
    }

    public abstract Draw(): void 

}

