import Block from '../../utils/block';
import Img from '../../components/img';
import img from '../../../static/img/cat_err.png';
import template from './500.hbs';
import {Link} from "../../components/link";

export class Error500 extends Block {
    constructor() {
        const content = {
            logo: 'MONOCHROME',
            code: '500',
            text: 'На сервере произошла непредвиденная ошибка. Пожалуйста подождите, вскоре она будет исправлена.',
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

export default Error500;
