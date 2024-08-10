import { ConfigListItem } from "../Config/ConfigListItem";
import { IDraw } from "../Interfaces/IDraw";

export class ListItem extends HTMLLIElement implements IDraw  {

    private config: ConfigListItem;

    constructor(config: ConfigListItem) {
        super();
        this.SetConfig(config);
        this.Draw();
    }

    private SetConfig(config: ConfigListItem): void {
        this.config = config;
    }

    public GetConfig(): ConfigListItem {
        return this.config;
    }

    public Draw(): void {
        this.className = this.GetConfig().GetClassName();
    }


}

