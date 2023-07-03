import Block from '../../utils/block';
import template from './img.hbs';

interface ImgProps {
    src: string;
    alt: string;
    add_class?: string;
}

export class Img extends Block<ImgProps> {
    constructor(props: ImgProps) {
        super(props);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default Img;
