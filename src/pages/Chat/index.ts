import { Block } from '../../core/Block';
import template from './chat.hbs';
import Sidebar from '../../components/Sidebar';
import MessagePanel from '../../components/MessagePanel';
import store, { StoreEvents } from '../../core/Store';
import ChatsController from '../../controllers/ChatsController';
import { withRouter } from '../../hocs/withRouter';
import Router from '../../core/Router';
import { UserType } from 'api/profile';

export type LastMessage = {
    user: UserType;
    time: string;
    content: string;
    id: number
}

export type ChatType = {
    avatar: null | string;
    created_by: number;
    id: number;
    last_message: LastMessage | null;
    title: string;
    unread_count: number
}

export type MessageType = {
    chat_id: number;
    content: string;
    file: null;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
}

export type MessagesType = {
    [x: number]: MessageType[];
}

export type ChatProps = {
    router?: typeof Router;
    _id?: string;
    user?: UserType;
    chats?: ChatType[] | [] | undefined;
    currentChat?: number;
    messages?: MessagesType;
    message?: MessageType[];
}

class Chat extends Block {
    constructor(props: ChatProps) {
        super(props);

        store.on(StoreEvents.Updated, () => {
            this.setProps(store.getState());
        });
    }
    
    init() {
        ChatsController.getChats();
        this.children.sidebar = new Sidebar({});
        this.children.messagePanel = new MessagePanel({});
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        this.children.sidebar = new Sidebar({});
        return true;
    }

    render() {
        return this.compile(template, { ...this.props});
    }
}

export default withRouter(Chat);
