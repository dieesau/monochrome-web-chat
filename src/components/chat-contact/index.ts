import Block from '../../utils/block';
import template from './chat-contact.hbs';
import Img from '../../components/img';

interface ChatContactProps {
    contact_name: string;
    last_message_time: string;
    last_message: string;
    unread_message_count: number;
    alt: string;
    src: string;
}

export class ChatContact extends Block<ChatContactProps> {
    constructor(props: ChatContactProps) {
        super({...props});
    }

    init() {
        this.children.avatar = new Img({
            ...this.props,
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default ChatContact;
