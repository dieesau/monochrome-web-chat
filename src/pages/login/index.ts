import Block from "../../utils/Block";
import template from './login.hbs'
import Input from "../../partials/input";
import Button from "../../partials/button";
import {validate} from "../../utils/validation";

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
            add_class: "page__input-big",
            events: {
                blur: (e) => {
                    const loginValue = e.target.value.trim();
                    const loginValidate = validate(loginValue,
                        ['req', 'minLen:3', 'maxLen:20', 'noSpaces', 'noSpecChar'])
                    if (!loginValidate.isValid) {
                        console.log(loginValidate.message)
                    } else {
                        console.log(`Логин - ${e.target.value}`)
                    }
                }
            }
        });

        this.children.passwordInput = new Input({
            type: "password",
            name: "password",
            placeholder: "пароль",
            add_class: "page__input-big",
            events: {
                blur: (e) => {
                    const passwordValue = e.target.value.trim();
                    const passwordValidate = validate(passwordValue,
                        ['req', 'oneUpperReq', 'oneDigitReq'])
                    console.log(`Пароль - ${e.target.value}`)
                    // if (!passwordValidate.isValid) {
                    //     console.log(passwordValidate.message)
                    // } else {
                    //     console.log(`Пароль - ${e.target.value}`)
                    // }
        }
            }
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
