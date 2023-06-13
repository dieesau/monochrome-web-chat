import Block from "../../utils/Block";
import template from './login.hbs'
import Input from "../../partials/input";
import Button from "../../partials/button";

export class LoginPage extends Block {
    constructor() {
          const content = {
              logo: "MONOCHROME"
            }
        super(content);
    }

    init() {
        this.children.loginInput = new Input({
            type: "text",
            name: "login",
            placeholder: "логин",
            add_class: "page__input-big"
        });

        this.children.passwordInput = new Input({
            type: "password",
            name: "password",
            placeholder: "пароль",
            add_class: "page__input-big"
        });

        this.children.loginBtn = new Button({
            label: "ВОЙТИ",
            add_class: "btn-big",
            type: "submit",
            events: {
                click: (e) => {
                    e.preventDefault()
                }
            }
        })

        this.children.regBtn = new Button({
            label: "зарегистрироваться",
            add_class: "btn-medium",
            type: "submit",
            events: {
                click: (e) => {
                    e.preventDefault()
                }
            }
        })

    }
    render() {
        return this.compile(
            template, {...this.props})
    }
}

export default LoginPage;
