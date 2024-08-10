import { Button } from "bootstrap";
import { IInput } from "../Interfaces/IInput";
import { Config } from "../Config/Config";
import { ConfigButton } from "../Config/ConfigButton";
import { InputButton } from "./InputButton";
import { ConfigInput } from "../Config/ConfigInput";

export class InputButtonRowStatus extends InputButton implements IInput {
    constructor(config: ConfigInput){
        super(config);
    }
}