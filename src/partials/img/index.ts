import template from './img.hbs'
import Block from "../../utils/Block";

interface ImgProps {
    src: string
    alt: string
    add_class: string
}

export class Img extends Block<ImgProps> {
    constructor(props: { src: any; alt: string }) {
        super({...props});
    }

    render(){
        return this.compile(template, {...this.props})
    }
}

export default Img
