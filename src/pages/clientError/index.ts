import template from './404.hbs';
import img from '../../../static/img/cat_err.png'
import Img from "../../partials/img";
import Block from "../../utils/Block";

export class NotFound extends Block {
    constructor() {
        super({});
    }


    init() {
    this.children.errImg = new Img({
        src: img,
        alt: 'cat-error',
    })

    }
    render() {
        return this.compile(
            template, {...this.props})
    }
}



