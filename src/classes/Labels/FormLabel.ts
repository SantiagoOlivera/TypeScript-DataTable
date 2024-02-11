import { Label } from "./Label";

export class FormLabel extends Label {

    constructor(text: string){
        super();
        this.SetText(text);
        this.Draw();
    }

    public Draw(): void {
        this.innerHTML = this.GetText();
    }

}