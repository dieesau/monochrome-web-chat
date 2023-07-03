import Block from '../../utils/block';
import Img from '../../components/img';
import img from '../../../static/img/cat_err.png';
import template from './error-404.hbs';

export class Error404 extends Block {
    constructor() {
        const content = {
            logo: 'MONOCHROME',
            code: '404',
            text: 'Страница не найдена. Возможно, вы неправильно ввели адрес или страница была перемещена.',
            link: 'Вернуться к чатам',
        };
        super(content);
    }

    init() {
        this.children.errImage = new Img({
            src: img,
            alt: 'ERROR_IMAGE',
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default Error404;
