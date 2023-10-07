import { Block } from '../../core/Block';
import template from './addDeleteUserPanel.hbs';
import ProfileController from '../../controllers/ProfileController';
import { Button } from '../../components/Button';
import ChatsController from '../../controllers/ChatsController';
import store from '../../core/Store';
import Router from '../../core/Router';

export class AddDeleteUserPanel extends Block {
    constructor(props: object | undefined) {
        super(props)
    }
    
    userName: FormDataEntryValue | null = null;

    init() {
        this.children.close = new Button({
            buttonClass: 'close-btn', type: 'button', buttonText: 'X',
            events: {
                click: (evt) => {
                    evt.preventDefault();
                    this.closeModal();
                }
            }
        });

        this.children.addUserBtn = new Button({
            buttonClass: 'add-user-btn', type: 'button', buttonText: 'Добавить пользователя',
            events: {
                click: async () => {
                    const form = document.getElementById('addDeleteUserForm') as HTMLFormElement;
                    const formData = new FormData(form);
                    this.userName = formData.get('UserName');
                    await ProfileController.searchUser(this.userName as string);
                    const searchUserData = store.getState().searchUserData;
                    const currentChat = store.getState().currentChat;
                    ChatsController.addUserFromChat({ users: [searchUserData[0].id], chatId: currentChat });
                    Router.go('/messenger');
                }
            }
        });

        this.children.deleteUserBtn = new Button({
            buttonClass: 'delete-user-btn', type: 'button', buttonText: 'Удалить пользователя',
            events: {
                click: async () => {
                    const form = document.getElementById('addDeleteUserForm') as HTMLFormElement;
                    const formData = new FormData(form);
                    this.userName = formData.get('UserName');
                    await ProfileController.searchUser(this.userName as string);
                    const searchUserData = store.getState().searchUserData;
                    const currentChat = store.getState().currentChat;
                    ChatsController.deleteUserFromChat({ users: [searchUserData[0].id], chatId: currentChat });
                    Router.go('/messenger');
                }
            }
        });
        this.children.deleteChatBtn = new Button({
            buttonClass: 'delete-btn', type: 'button', buttonText: 'Удалить чат',
            events: {
                click: (evt) => {
                    evt.preventDefault();
                    ChatsController.deleteChat(store.getState().currentChat);
                    this.closeModal();
                    Router.go('/messenger');
                }
            }
        });
    }

    closeModal() {
        const modal = document.querySelector('#addDeleteUser') as HTMLElement;
        modal.style.visibility = 'hidden';
    }

    render() {
    return this.compile(template, { ...this.props});
  }
}
