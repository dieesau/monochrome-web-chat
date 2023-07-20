import Block from '../../utils/block';
import template from './change_password.hbs';
import Button from '../../components/button';
import Img from '../../components/img';
import img from '../../../static/img/cat_err.png';
import Input from '../../components/input';
import {Link} from "../../components/link";


export class ChangePassword extends Block {
    constructor() {
        super({});
    }

    init() {
        this.children.avatar = new Img({
            src: img,
            alt: 'Avatar',
            add_class: 'setting_avatar',
        });

        this.children.input1 = new Input({
            type: 'password',
            name: 'oldPassword',
            placeholder: 'Старый пароль',
            add_class: 'page__input-small',
        });

        this.children.input2 = new Input({
            type: 'password',
            name: 'newPassword',
            placeholder: 'Новый пароль',
            add_class: 'page__input-small',
        });

        this.children.input3 = new Input({
            type: 'password',
            name: 'newPasswordAgain',
            placeholder: 'Повторите новый пароль',
            add_class: 'page__input-small',
        });

        this.children.saveBtn = new Button({
            text: 'СОХРАНИТЬ',
            add_class: 'btn-big',
            type: 'submit',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const formData = {
                        oldPassword: this.children.input1.element.value.trim(),
                        newPassword: this.children.input2.element.value.trim(),
                        newPasswordAgain: this.children.input3.element.value.trim(),
                    };
                    console.log(formData);
                },
            },
        });

        this.children.backBtn = new Link({
            text: 'назад',
            link_class: 'button btn-medium',
            to: '/profile'
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default ChangePassword;
