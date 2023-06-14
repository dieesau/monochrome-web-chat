import Block from "../../utils/Block";
import template from './register.hbs'
import Input from "../../partials/input";
import Button from "../../partials/button";

export class RegPage extends Block {
    constructor() {
        const content = {
            logo: "MONOCHROME"
        }
        super(content);
    }

    init() {

        this.children.mailInput = new Input({
            type: "email",
            name: "email",
            placeholder: "email",
            add_class: "page__input-small"
        });

        this.children.loginInput = new Input({
            type: "text",
            name: "login",
            placeholder: "логин",
            add_class: "page__input-small"
        });

        this.children.firstName = new Input({
            type: "text",
            name: "first_name",
            placeholder: "имя",
            add_class: "page__input-small"
        });

        this.children.secondName = new Input({
            type: "text",
            name: "first_name",
            placeholder: "фамилия",
            add_class: "page__input-small"
        });

        this.children.phoneInput = new Input({
            type: "text",
            name: "phone",
            placeholder: "телефон",
            add_class: "page__input-small"
        });

        this.children.passwordInput = new Input({
            type: "password",
            name: "password",
            placeholder: "пароль",
            add_class: "page__input-small"
        });

        this.children.passwordAgain = new Input({
            type: "password",
            name: "password",
            placeholder: "пароль (ещё раз)",
            add_class: "page__input-small"
        });

        this.children.loginBtn = new Button({
            label: "ЗАРЕГЕСТРИРОВАТЬСЯ",
            add_class: "btn-big",
            type: "submit",
            events: {
                click: (e) => {
                    e.preventDefault()
                }
            }
        })

        this.children.regBtn = new Button({
            label: "войти",
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

export default RegPage;
