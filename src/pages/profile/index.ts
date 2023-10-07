import { Block } from "../../core/Block";
import template from "./profile.hbs";
import { Input } from '../../components/Input';
import { SideButton } from "../../components/sideButton";
import profilePhoto from "../../assets/ProfileImg.png"
import { Image } from "../../components/Image";
import AuthController from "../../controllers/AuthController";
import { Link } from '../../components/Link';
import { withRouter } from "../../hocs/withRouter";
import store, { StoreEvents } from "../../core/Store";
import Router from "../../core/Router";


class Profile extends Block {

    constructor(props: object | undefined) {
        super(props);  

        store.on(StoreEvents.Updated, () => {
            this.setProps(store.getState());
        });
        
    }

    init() {
        const user = store.getState().user;
        this.props.name = user.first_name;
        this.children.input = new Input({
            forAndName: 'email', labelClass: 'profile__label',
            labelText: 'Почта', inputType: 'email', inputClass: 'profile__input-disabled',
            value: (user ? user.email : 'pochta@yandex.ru')
        });
        this.children.input2 = new Input({
            forAndName: 'login', labelClass: 'profile__label',
            labelText: 'Логин', inputType: 'text', inputClass: 'profile__input-disabled',
            value: (user ? user.login : 'IvanIvanov')
        });
        this.children.input3 = new Input({
            forAndName: 'first_name', labelClass: 'profile__label',
            labelText: 'Имя', inputType: 'text', inputClass: 'profile__input-disabled',
            value: (user ? user.first_name : 'Иван')
        });
        this.children.input4 = new Input({
            forAndName: 'second_name', labelClass: 'profile__label',
            labelText: 'Фамилия', inputType: 'text', inputClass: 'profile__input-disabled',
            value: (user ? user.second_name : 'Иванов')
        });
        this.children.input5 = new Input({
            forAndName: 'display_name', labelClass: 'profile__label',
            labelText: 'Имя в чате', inputType: 'text', inputClass: 'profile__input-disabled',
            value: (user ? user.display_name : 'Иван')
        });
        this.children.input6 = new Input({
            forAndName: 'phone', labelClass: 'profile__label',
            labelText: 'Логин', inputType: 'phone', inputClass: 'profile__input-disabled',
            value: (user ? user.phone : '+79001234567')
        });
        this.children.sideButton = new SideButton({ buttonClass: 'side-btn', events: {
            'click': () => {
              Router.go('/messenger');
            }
          } });
        this.children.image = new Image({
            src: (user.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + user.avatar : profilePhoto),
            alt: "Profile photo",
            class: "avatar"
        });

        this.children.logout = new Link({
            linkClass: 'red-link', linkText: 'Выйти',
            href: '/',
            events: {
                click: (event) => {
                    event.preventDefault();
                    this.clickLogoutBtn();
                } 
            }
        });

        this.children.editProfile = new Link({
            linkClass: 'profile__link', linkText: 'Изменить данные',
            href: '/edit-profile',
            events: {
                click: (event) => {
                    event.preventDefault();
                    Router.go('/edit-profile');
                } 
            }
        });

        this.children.editPassword = new Link({
            linkClass: 'profile__link', linkText: 'Изменить пароль',
            href: '/edit-password',
            events: {
                click: (event) => {
                    event.preventDefault();
                    Router.go('/edit-password');
                } 
            }
        });
    }

    clickLogoutBtn() {
        AuthController.logout();
    }

    render() {
        return this.compile(template, {...this.props});
      }
}

export default withRouter(Profile);

