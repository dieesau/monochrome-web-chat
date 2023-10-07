import { Link } from '../../components/Link';
import { ChatModal } from '../../components/AddChatModal';
import { Block } from '../../core/Block';
import template from './sidebar.hbs';
import store, { StoreEvents } from '../../core/Store';
import Router from '../../core/Router';
import { ChatProps } from 'pages/Chat';
import { ChatItem } from '../../components/ChatItem';
import ChatsController from '../../controllers/ChatsController';
import { AddDeleteUserPanel } from '../../components/AddDeleteUserPanel';
import { Search } from '../../components/Search';

class Sidebar extends Block {
  constructor(props: ChatProps) {
    super(props);

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }
    
    init() {
        this.props = store.getState();
        if (Boolean(this.props.chats)) {
            this.children.chatList = this.createItems(this.props);
        }
        
        this.children.chatModal = new ChatModal({});
        this.children.addOrDeleteUserModal = new AddDeleteUserPanel({});
         
        this.children.addChat = new Link({
            linkClass: 'addChat', linkText: 'Создать чат',
            href: '/',
            events: {
                click: (event) => {
                    event.preventDefault();
                    const modal = document.querySelector('.modal') as HTMLElement;
                    modal.style.visibility = 'visible';
                } 
            }
        });
        this.children.profileLink = new Link({
          linkClass: 'chat__link', linkText: 'Профиль >',
          href: '/profile',
          events: {
                click: (event) => {
                event.preventDefault();
                  Router.go('/settings');
              } 
          }
        });
        this.children.searchForm = new Search({
            events: {
                click: async (event: PointerEvent) => {
                    event.preventDefault();
                },
                submit: async (event: SubmitEvent) => {
                    event.preventDefault();
                    const form = document.querySelector('.search__form') as HTMLFormElement;
                    const formData = new FormData(form);
                    const filter = formData.get('search');
                    await ChatsController.getFiltredChats(filter as string);
                }
            }
        }); 
    }

    createItems(props: ChatProps) {
        return props.chats!.map(data => {
            return new ChatItem({
                ...data,
                events: {
                    click: () => {
                        ChatsController.checkedChat(data.id);
                        if (store.getState().currentChat === data.id) {
                            document.getElementById(`${data.id}`)!.style.background = '#E4EDFD';
                        }
                    }
                }
            });
        })
    }

    render() {
    return this.compile(template, { ...this.props});
  }
}

export default Sidebar;
