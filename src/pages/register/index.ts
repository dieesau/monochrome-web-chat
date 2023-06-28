import Block from "../../utils/Block";
import template from './register.hbs'
import Input from "../../partials/input";
import Button from "../../partials/button";
import {validate} from "../../utils/validation";

export class Register extends Block {
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
            add_class: "page__input-small",
            events: {
                blur: (e) => {
                    const emailValue = e.target.value.trim();
                    const emailValidate = validate(emailValue,
                        ['req', 'emailFormat'])
                    if (!emailValidate.isValid) {
                        console.log(emailValidate.message)
                    } else {
                        console.log(`Email - ${e.target.value}`)
                    }
                }
            }
        });

        this.children.loginInput = new Input({
            type: "text",
            name: "login",
            placeholder: "логин",
            add_class: "page__input-small",
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

        this.children.firstName = new Input({
            type: "text",
            name: "first_name",
            placeholder: "имя",
            add_class: "page__input-small",
            events: {
                blur: (e) => {
                    const firstName = e.target.value.trim();
                    const firstNameValid = validate(firstName,
                        ['noSpaces', 'nameFormat', 'noSpecChar'])
                    if (!firstNameValid.isValid) {
                        console.log(firstNameValid.message)
                    } else {
                        console.log(`Имя - ${e.target.value}`)
                    }
                }
            }
        });

        this.children.secondName = new Input({
            type: "text",
            name: "first_name",
            placeholder: "фамилия",
            add_class: "page__input-small",
            events: {
                blur: (e) => {
                    const secondName = e.target.value.trim();
                    const secondNameValid = validate(secondName,
                        ['noSpaces', 'nameFormat', 'noSpecChar'])
                    if (!secondNameValid.isValid) {
                        console.log(secondNameValid.message)
                    } else {
                        console.log(`Фамилия - ${e.target.value}`)
                    }
                }
            }
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
            add_class: "page__input-small",
            events: {
                blur: (e) => {
                    const password = e.target.value.trim();
                    const passwordValidate = validate(password,
                        ['minLen:8', 'maxLen:40', 'passwordFormat'])
                    if (!passwordValidate.isValid) {
                        console.log(passwordValidate.message)
                    } else {
                        console.log(`Пароль - ${e.target.value}`)
                    }
                }
            }
        });

        this.children.passwordAgain = new Input({
            type: "password",
            name: "password",
            placeholder: "пароль (ещё раз)",
            add_class: "page__input-small",

        });

        this.children.loginBtn = new Button({
            label: "ЗАРЕГЕСТРИРОВАТЬСЯ",
            add_class: "btn-big",
            type: "submit",
            events: {
                click: (e) => {
                    e.preventDefault();
                    const emailValue = this.children.mailInput.element.value.trim();
                    const loginValue = this.children.loginInput.element.value.trim();
                    const firstNameValue = this.children.firstName.element.value.trim();
                    const secondNameValue = this.children.secondName.element.value.trim();
                    const phoneValue = this.children.phoneInput.element.value.trim();
                    const passwordValue = this.children.passwordInput.element.value.trim();
                    const passwordAgainValue = this.children.passwordAgain.element.value.trim();
                    const formData = {
                        email: emailValue,
                        login: loginValue,
                        firstName: firstNameValue,
                        secondName: secondNameValue,
                        phone: phoneValue,
                        password: passwordValue,
                        passwordAgain: passwordAgainValue
                    };
                    console.log(formData);
                }
            }
        });

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

export default Register;
