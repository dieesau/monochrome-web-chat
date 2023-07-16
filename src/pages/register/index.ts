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

        this.children.passwordInput = new Input({
            type: 'password',
            name: 'password',
            placeholder: 'пароль',
            add_class: 'page__input-small',
            events: {
                blur: (e) => {
                    const password = e.target.value.trim();
                    validate(password, ['passwordForm'], e);
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
                click: (e) => {
                    e.preventDefault();
                    const data = {
                        first_name: this.children.firstName.element.value.trim(),
                        second_name: this.children.secondName.element.value.trim(),
                        login: this.children.loginInput.element.value.trim(),
                        email: this.children.mailInput.element.value.trim(),
                        password: this.children.passwordInput.element.value.trim(),
                        phone: this.children.phoneInput.element.value.trim(),
                    };
                    console.log(data);
                    AuthController.signup(data)
                },
            },
        });

        this.children.regBtn = new Link({
            text: 'войти',
            to: '/',
            link_class: 'button btn-medium',
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default Register;
