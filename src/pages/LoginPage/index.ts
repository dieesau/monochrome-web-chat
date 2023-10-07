import { Block } from "../../core/Block";
import template from "./authorization.hbs";
import { Button } from "../../components/Button";
import { Input } from '../../components/Input';
import { validationLogin, validationPassword } from "../../utils/validation";
import AuthController from "../../controllers/AuthController";
import { SignInDataType } from "api/auth";
import { withRouter } from "../../hocs/withRouter";
import store, { StoreEvents } from "../../core/Store";
import { Link } from "../../components/Link";
import Router from "../../core/Router";

class LoginPage extends Block {

    constructor(props: object | undefined) {
        super(props);  

        store.on(StoreEvents.Updated, () => {
            this.setProps(store.getState());
              });
    }

    login: FormDataEntryValue | null = null;
    password: FormDataEntryValue | null = null;

    init() {
        
        this.children.button = new Button({ buttonClass: 'btn', type: 'submit', buttonText: 'Войти', events: 
            { click: (evt: PointerEvent) => {
                evt.preventDefault();
                validationLogin(this.children.input);
                validationPassword(this.children.input2);
                const form = document.getElementById('form') as HTMLFormElement;
                const formData = new FormData(form);
                this.login = formData.get('login');
                this.password = formData.get('password');
                this.onSubmit();
            } 
            }
        });
        this.children.input = new Input({
            forAndName: 'login', labelClass: 'label', labelText: 'Логин', inputType: 'text', inputClass: 'input',
            events:
                {
                focus: () => {
                    validationLogin(this.children.input);
                },
                blur: () => {
                    validationLogin(this.children.input);
                }
        }});
        this.children.input2 = new Input({
            forAndName: 'password', labelClass: 'label', labelText: 'Пароль', inputType: 'password', inputClass: 'input',
            events:
            {
            focus: () => {
                validationPassword(this.children.input2);
            },
            blur: () => {
                validationPassword(this.children.input2);
            }
        }
        });
        this.children.registration = new Link({
            linkClass: 'form__link', linkText: 'Нет аккаунта?',
            href: '/registration',
            events: {
                click: (event) => {
                    event.preventDefault();
                    Router.go('/sign-up');
                } 
            }
        });
    }

    onSubmit() {
        const data = { login: this.login, password: this.password };
        AuthController.signin(data as SignInDataType);
    }

    render() {
        return this.compile(template, this.props);
      }
}

export default withRouter(LoginPage);
