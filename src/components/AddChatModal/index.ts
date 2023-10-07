import { Button } from '../Button';
import { Block } from '../../core/Block';
import template from './addChatModal.hbs';
import ChatsController from '../../controllers/ChatsController';
import { CreateChatType } from 'api/chat';


export class ChatModal extends Block {
    constructor(props: object | undefined) {
        super(props)
    }
    
    chatName: FormDataEntryValue | null = null;

    init() {

        this.children.button = new Button({
            buttonClass: 'btn', type: 'submit', buttonText: 'Создать',
            events: {
                click: (evt) => {
                    evt.preventDefault();
                    const form = document.getElementById('modal') as HTMLFormElement;
                    const formData = new FormData(form);
                    this.chatName = formData.get('chatName');
                    this.onSubmit();
                    const modal = document.querySelector('.modal') as HTMLElement;
                    modal.style.visibility = 'hidden';
                }
            }
        });
        this.children.close = new Button({
            buttonClass: 'close-btn', type: 'button', buttonText: 'X',
            events: {
                click: (evt) => {
                    evt.preventDefault();
                    const modal = document.querySelector('.modal') as HTMLElement;
                    modal.style.visibility = 'hidden';
                }
            }
        });
    }

    onSubmit() {
        const data = {title: this.chatName}
        ChatsController.createChat(data as CreateChatType);
    }

    render() {
    return this.compile(template, { ...this.props});
  }
}
