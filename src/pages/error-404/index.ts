import Block from '../../utils/block';
import Img from '../../components/img';
import img from '../../../static/img/cat_err.png';
import template from './404.hbs';
import {Link} from "../../components/link";

export class Error404 extends Block {
    constructor() {
        const content = {
            logo: 'MONOCHROME',
            code: '404',
            text: 'Страница не найдена. Возможно, вы неправильно ввели адрес или страница была перемещена.',
        };
        super(content);
    }

    init() {
        this.children.errImage = new Img({
            src: img,
            alt: 'ERROR_IMAGE',
        });

        this.children.link = new Link({
            text: 'Вернутся к чатам',
            link_class: 'link-to-chats',
            to: '/messenger'
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default Error404;
