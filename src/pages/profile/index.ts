import Block from '../../utils/block';
import template from './profile.hbs';
import Label from '../../components/label';
import Button from '../../components/button';
import Img from '../../components/img';
import img from '../../../static/img/cat_err.png';

export class Profile extends Block {
    constructor() {
        super({});
    }

    init() {
        this.children.label1 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Почта',
            label_value_text: 'clientError@t.clientError',
        });

        this.children.label2 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Логин',
            label_value_text: 'Tropik',
        });
        this.children.label3 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Имя',
            label_value_text: 'Курт',
        });
        this.children.label4 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Фамилия',
            label_value_text: 'Бейн',
        });
        this.children.label5 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Имя в чате',
            label_value_text: 'Tropik',
        });
        this.children.label6 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Телефон',
            label_value_text: '+7(999)123-23-21',
        });

        this.children.changeDataButton = new Button({
            text: 'ИЗМЕНИТЬ ДАННЫЕ',
            add_class: 'btn-big',
            type: 'button',
            events: {
                click: (e) => {
                    e.preventDefault();
                },
            },
        });

        this.children.changePasswordButton = new Button({
            text: 'ИЗМЕНИТЬ ПАРОЛЬ',
            add_class: 'btn-big',
            type: 'button',
            events: {
                click: (e) => {
                    e.preventDefault();
                },
            },
        });

        this.children.logoutButton = new Button({
            text: 'выйти',
            add_class: 'btn-medium',
            type: 'button',
            events: {
                click: (e) => {
                    e.preventDefault();
                },
            },
        });

        this.children.avatarImg = new Img({
            src: img,
            alt: 'Аватар',
            add_class: 'setting_avatar',
        });
    }

    render() {
        return this.compile(template, {...this.children});
    }
}

export default Profile;
