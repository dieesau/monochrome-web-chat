import { Button } from '../Button';
import { Block } from '../../core/Block';
import template from './modal.hbs';
import ProfileController from "../../controllers/ProfileController";
import ChatsController from '../../controllers/ChatsController';
import store from '../../core/Store';

export class Modal extends Block {
  constructor(props: object | undefined) {
    super(props)
    }
    
    avatar: FormDataEntryValue | null = null;

    init() {
        this.children.button = new Button({
            buttonClass: 'btn', type: 'submit', buttonText: 'Поменять',
            events: {
                click: (evt) => {
                    evt.preventDefault();
                    const form = document.querySelector('.changeAvatarForm') as HTMLFormElement;
                    const formData = new FormData(form);
                    this.avatar = formData.get('avatar');
                    formData.set('chatId', store.getState().currentChat);
                    ChatsController.changeChatAvatar(formData);
                    const modal = document.querySelector('#changeAvatarModal') as HTMLElement;
                    modal.style.visibility = 'hidden';
                }
            }
        });
    }

    render() {
    return this.compile(template, { ...this.props});
  }
}
