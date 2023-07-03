import Block from '../../utils/block';
import template from './change-personal-data.hbs';
import Button from '../../components/button';
import Img from '../../components/img';
import img from '../../../static/img/cat_err.png';
import Input from '../../components/input';
import {validate} from '~utils/validation';

export class ChangeData extends Block {
    constructor() {
        super({});
    }

    init() {
        this.children.avatar = new Img({
            src: img,
            alt: 'Avatar',
            add_class: 'setting_avatar',
        });

        this.children.mailInput = new Input({
            type: 'email',
            name: 'email',
            placeholder: 'email',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    const emailValue = e.target.value.trim();
                    validate(emailValue, ['emailForm'], e);
                },
            },
        });

        this.children.loginInput = new Input({
            type: 'text',
            name: 'login',
            placeholder: 'логин',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    const loginValue = e.target.value.trim();
                    validate(loginValue, ['loginForm'], e);
                },
            },
        });

        this.children.firstName = new Input({
            type: 'text',
            name: 'first_name',
            placeholder: 'имя',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    const firstName = e.target.value.trim();
                    validate(firstName, ['nameForm'], e);
                },
            },
        });

        this.children.secondName = new Input({
            type: 'text',
            name: 'second_name',
            placeholder: 'фамилия',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    const secondName = e.target.value.trim();
                    validate(secondName, ['nameForm'], e);
                },
            },
        });

        this.children.phoneInput = new Input({
            type: 'text',
            name: 'phone',
            placeholder: 'телефон',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    const phone = e.target.value.trim();
                    validate(phone, ['phoneForm'], e);
                },
            },
        });

        this.children.nicknameInput = new Input({
            type: 'text',
            name: 'display_name',
            placeholder: 'имя в чате',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    const nickname = e.target.value.trim();
                    validate(nickname, ['nicknameForm'], e);
                },
            },
        });

        this.children.saveBtn = new Button({
            text: 'СОХРАНИТЬ',
            add_class: 'btn-big',
            type: 'submit',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const formData = {
                        email: this.children.mailInput.element.value.trim(),
                        login: this.children.loginInput.element.value.trim(),
                        firstName: this.children.firstName.element.value.trim(),
                        secondName:
                            this.children.secondName.element.value.trim(),
                        phone: this.children.phoneInput.element.value.trim(),
                    };
                    console.log(formData);
                },
            },
        });

        this.children.backBtn = new Button({
            text: 'назад',
            add_class: 'btn-medium',
            type: 'submit',
            events: {
                click: (e) => {
                    e.preventDefault();
                },
            },
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default ChangeData;
