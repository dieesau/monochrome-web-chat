import Block from '../../utils/block';
import template from './login.hbs';
import Input from '../../components/input';
import Button from '../../components/button';
import {validate} from '~utils/validation';

export class Login extends Block {
    constructor() {
        const content = {
            logo: 'MONOCHROME',
        };
        super(content);
    }

    init() {
        this.children.loginInput = new Input({
            type: 'text',
            name: 'login',
            placeholder: 'логин',
            add_class: 'page__input-big',
            events: {
                blur: (e) => {
                    const loginValue = e.target.value.trim();
                    validate(loginValue, ['loginForm'], e);
                },
            },
        });

        this.children.passwordInput = new Input({
            type: 'password',
            name: 'password',
            placeholder: 'пароль',
            add_class: 'page__input-big',
            events: {
                blur: (e) => {
                    const passwordValue = e.target.value.trim();
                    validate(passwordValue, ['passwordForm'], e);
                },
            },
        });

        this.children.loginBtn = new Button({
            text: 'ВОЙТИ',
            add_class: 'btn-big',
            type: 'submit',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const loginValue =
                        this.children.loginInput.element.value.trim();
                    const passwordValue =
                        this.children.passwordInput.element.value.trim();
                    const formData = {
                        login: loginValue,
                        password: passwordValue,
                    };
                    console.log(formData);
                },
            },
        });

        this.children.regBtn = new Button({
            text: 'зарегистрироваться',
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

export default Login;
