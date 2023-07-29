import Block from '../../utils/block';
import template from './change_personal_data.hbs';
import Button from '../../components/button';
import Img from '../../components/img';
import img from '../../../static/img/cat_err.png';
import Input from '../../components/input';
import {validate} from '~utils/validation';
import {Link} from "../../components/link";
import { withRouter } from "../../hocs/withRouter"
import AuthController from "~controllers/AuthController";
import ProfileController from "~controllers/ProfileController";
import store from "~utils/store";


export class ChangeData extends Block {
    constructor() {
        super({});
    }

    init() {
        const user = store.getState().user

        this.children.avatar = new Img({
            src: img,
            alt: 'Avatar',
            add_class: 'setting_avatar',
        });

        this.children.mailInput = new Input({
            value: (user ? user.email : ''),
            type: 'email',
            name: 'email',
            placeholder: 'email',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    validate(e.target.value.trim(), ['emailForm'], e);
                },
            },
        });

        this.children.loginInput = new Input({
            value: (user ? user.login : ''),
            type: 'text',
            name: 'login',
            placeholder: 'логин',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    validate(e.target.value.trim(), ['loginForm'], e);
                },
            },
        });

        this.children.firstName = new Input({
            value: (user ? user.first_name : ''),
            type: 'text',
            name: 'first_name',
            placeholder: 'имя',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    validate(e.target.value.trim(), ['nameForm'], e);
                },
            },
        });

        this.children.secondName = new Input({
            value: (user ? user.second_name : ''),
            type: 'text',
            name: 'second_name',
            placeholder: 'фамилия',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    validate(e.target.value.trim(), ['nameForm'], e);
                },
            },
        });

        this.children.phoneInput = new Input({
            value: (user ? user.phone : ''),
            type: 'text',
            name: 'phone',
            placeholder: 'телефон',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    validate(e.target.value.trim(), ['phoneForm'], e);
                },
            },
        });

        this.children.nicknameInput = new Input({
            value: (user ? user.display_name : ''),
            type: 'text',
            name: 'display_name',
            placeholder: 'имя в чате',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    validate(e.target.value.trim(), ['nicknameForm'], e);
                },
            },
        });

        this.children.saveBtn = new Button({
            text: 'СОХРАНИТЬ',
            add_class: 'btn-big',
            type: 'submit',
            events: {
                click: (e) => {
                    this.onSubmit()
                },
            },
        });

        this.children.backBtn = new Link({
            text: 'назад',
            link_class: 'button btn-medium',
            to: '/profile'
        });
    }

    onSubmit() {
        const values = Object.values(this.children)
            .filter((child) => child instanceof Input)
            .map((child) => {
                const name = child.getName();
                const value = child.getValue();
                return [name, value];
            });

        const data = Object.fromEntries(values);
        console.log(data);
        ProfileController.changeUser(data);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default withRouter(ChangeData);
