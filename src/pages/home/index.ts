import Block from "../../utils/Block";
import template from "./home.hbs"

export class Home extends Block {
    constructor() {
        super({});
    }

    render() {
        return this.compile(
            template, {...this.props})
    }
}

export default Home;
