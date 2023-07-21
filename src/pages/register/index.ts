import Block from '../../utils/block';
import template from './register.hbs';
import Input from '../../components/input';
import Button from '../../components/button';
import {validate} from '~utils/validation';
import AuthController from "~controllers/AuthController";
import {Link} from "../../components/link";

export class Register extends Block {
    constructor() {
        const content = {
            logo: 'MONOCHROME',
        };
        super(content);
    }

    init() {
        this.children.mailInput = new Input({
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

        this.children.passwordInput = new Input({
            type: 'password',
            name: 'password',
            placeholder: 'пароль',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    validate(e.target.value.trim(), ['passwordForm'], e);
                },
            },
        });

        this.children.passwordAgain = new Input({
            type: 'password',
            name: 'password',
            placeholder: 'пароль (ещё раз)',
            add_class: 'page__input-small',
        });

        this.children.loginBtn = new Button({
            text: 'ЗАРЕГЕСТРИРОВАТЬСЯ',
            add_class: 'btn-big',
            type: 'submit',
            events: {
                click: () => this.onSubmit(),
            },
        });

        this.children.regBtn = new Link({
            text: 'войти',
            to: '/',
            link_class: 'button btn-medium',
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
        AuthController.signup(data);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default Register;
