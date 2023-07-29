import Block from '../../utils/block';
import template from './change_password.hbs';
import Button from '../../components/button';
import Img from '../../components/img';
import img from '../../../static/img/cat_err.png';
import Input from '../../components/input';
import {Link} from "../../components/link";
import ProfileController from "~controllers/ProfileController";
import store, {StorageEvent} from "~utils/store";
import {validate} from "~utils/validation";


export class ChangePassword extends Block {

    constructor(props: object | undefined) {
        super(props);

        store.on(StorageEvent.UpdateState, () => {
            this.setProps(store.getState());
        });

    }

    init() {
        this.children.avatar = new Img({
            src: img,
            alt: 'Avatar',
            add_class: 'setting_avatar',
        });

        this.children.input1 = new Input({
            type: 'password',
            name: 'oldPassword',
            placeholder: 'Старый пароль',
            add_class: 'page__input-small',
        });

        this.children.input2 = new Input({
            type: 'password',
            name: 'newPassword',
            placeholder: 'Новый пароль',
            add_class: 'page__input-small',
            events: {
                    blur: (e) => {
                        validate(e.target.value.trim(), ['passwordForm'], e);
                    }
            }
        });

        this.children.input3 = new Input({
            type: 'password',
            name: 'newPasswordAgain',
            placeholder: 'Повторите новый пароль',
            add_class: 'page__input-small',
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
        ProfileController.changePassword(data);
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

export default ChangePassword;
