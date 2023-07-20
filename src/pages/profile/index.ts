import Block from '../../utils/block';
import template from './profile.hbs';
import Label from '../../components/label';
import Button from '../../components/button';
import {Link} from "../../components/link";
import Img from '../../components/img';
import img from '../../../static/img/cat_err.png';
import AuthController from "~controllers/AuthController";
import {withStore, State} from "~utils/store";

export class BaseProfile extends Block {

    init() {

        this.children.label1 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Почта',
            label_value_text: (user ? user.email : 'clientError@t.clientError'),
        });

        this.children.label2 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Логин',
            label_value_text: (user ? user.login : 'Tropik'),
        });
        this.children.label3 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Имя',
            label_value_text: (user ? user.first_name : 'Курт'),
        });
        this.children.label4 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Фамилия',
            label_value_text: (user? user.second_name : 'Бейн'),
        });
        this.children.label5 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Имя в чате',
            label_value_text: (user ? user.display_name : 'Tropik'),
        });
        this.children.label6 = new Label({
            label_class: 'profile-data-label',
            label_data_class: 'label',
            label_name_text: 'Телефон',
            label_value_text: (user ? user.phone : '+7(800)555-35-35'),
        });

        this.children.changeDataButton = new Link({
            text: 'ИЗМЕНИТЬ ДАННЫЕ',
            link_class: 'button btn-big',
            to: '/change-data'
        });

        this.children.changeDataButton = new Link({
            text: 'ИЗМЕНИТЬ ПАРОЛЬ',
            link_class: 'button btn-big',
            to: '/change-password'
        });

        this.children.logoutButton = new Button({
            text: 'выйти',
            add_class: 'btn-medium',
            type: 'button',
            events: {
                click: () => { AuthController.logout(); },
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
function mapStateToProps(state: State) {
    return {...state.user}
}

export const Profile = withStore(mapStateToProps(BaseProfile));
