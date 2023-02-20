export class OptionSelect {

    private value: string;
    private description: string;

    constructor(value: string, description: string){
        this.SetValue(value);
        this.SetDescription(description);
    }

    private SetValue(value: string): void{
        this.value = value;
    }

    private SetDescription(description: string): void{
        this.description = description;
    }

    public GetValue(): string{
        return this.value;
    }

    public GetDescription(): string{
        return this.description;
    }
    
}