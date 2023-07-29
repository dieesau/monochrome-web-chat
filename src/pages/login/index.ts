import Block from '../../utils/block';
import template from './login.hbs';
import Input from '../../components/input';
import Button from '../../components/button';
import {Link} from "../../components/link";
import {validate} from '~utils/validation';
import AuthController from "~controllers/AuthController";

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
            required: true,
            name: 'login',
            placeholder: 'логин',
            add_class: 'page__input-big',
            events: {
                blur: (e) => {
                    validate(e.target.value.trim(), ['loginForm'], e);
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
                    validate(e.target.value.trim(), ['passwordForm'], e);
                },
            },
        });

        this.children.loginBtn = new Button({
            text: 'ВОЙТИ',
            add_class: 'btn-big',
            type: 'submit',
            events: {
                click: () => this.onSubmit(),
            },
        });

        this.children.regBtn = new Link({
            text: 'зарегистрироваться',
            to: '/register',
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
        AuthController.signin(data);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default Login;
