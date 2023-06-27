import Block from "../../utils/Block";
import template from "./chats.hbs"

export class Chats extends Block {
    constructor() {
        super({});
    }

    render() {
        return this.compile(
            template, {...this.props})
    }
}

export default Chats;
