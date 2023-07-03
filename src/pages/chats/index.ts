import Block from '../../utils/block';
import template from './chats.hbs';
import ChatContact from '../../components/chat-contact';
import img from '../../../static/img/cat_avatar.png';

export class Chats extends Block {
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
        this.children.contact1 = new ChatContact({
            contact_name: 'Андрей',
            last_message: 'Пошли катацо',
            last_message_time: '22:15',
            unread_message_count: 3,
            alt: 'test',
            src: img,
        });
        this.children.contact2 = new ChatContact({
            contact_name: 'Света',
            last_message: 'Доброе утро)',
            last_message_time: '08:15',
            unread_message_count: 2,
            alt: 'test',
            src: img,
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default Chats;
