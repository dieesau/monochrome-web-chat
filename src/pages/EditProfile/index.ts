import { Block } from "../../core/Block";
import template from "./editProfile.hbs";
import { Input } from '../../components/Input';
import { SideButton } from "../../components/sideButton";
import { Button } from "../../components/Button";
import profilePhoto from "../../assets/ProfileImg.png"
import { Image } from "../../components/Image";
import { validationEmail, validationLogin, validationName, validationPhone } from "../../utils/validation";
import { withRouter } from "../../hocs/withRouter";
import store, { StoreEvents } from "../../core/Store";
import ProfileController from "../../controllers/ProfileController";
import { ChangeUserType } from "api/profile";
import { Modal } from "../../components/Modal";
import Router from '../../core/Router';

export class EditProfile extends Block {

    constructor(props: object | undefined) {
        super(props);  

        store.on(StoreEvents.Updated, () => {
            this.setProps(store.getState());
        });
    }

    login: FormDataEntryValue | null = null;
    email: FormDataEntryValue | null = null;
    firstName: FormDataEntryValue | null = null;
    secondName: FormDataEntryValue | null = null;
    displayName: FormDataEntryValue | null = null;
    phone: FormDataEntryValue | null = null;

    init() {
        this.children.button = new Button({
            buttonClass: 'btn', type: 'submit', buttonText: 'Сохранить',
            events: 
                { click: (evt: PointerEvent) => {
                    evt.preventDefault();
                    validationEmail(this.children.input);
                    validationLogin(this.children.input2);
                    validationName(this.children.input3);
                    validationName(this.children.input4);
                    validationName(this.children.input5);
                    validationPhone(this.children.input6);          
                    const form = document.getElementById('form') as HTMLFormElement;
                    const formData = new FormData(form);
                    this.login = formData.get('login');
                    this.email = formData.get('email');
                    this.firstName = formData.get('first_name');
                    this.secondName = formData.get('second_name');
                    this.displayName = formData.get('display_name');
                    this.phone = formData.get('phone');
                    this.onSubmit();
                } 
                }
        });
        
        const user = store.getState().user;
        
        this.children.input = new Input({
            forAndName: 'email', labelClass: 'profile__label', labelText: 'Почта',
            inputType: 'email', inputClass: 'profile__input',
            value: (user ? user.email : 'pochta@yandex.ru'),
            events:
        {
        focus: () => {
            validationEmail(this.children.input);
        },
        blur: () => {
            validationEmail(this.children.input);
        }
}  });
        this.children.input2 = new Input({
            forAndName: 'login', labelClass: 'profile__label', labelText: 'Логин',
            inputType: 'text', inputClass: 'profile__input',
            value: (user ? user.login : 'IvanIvanov'),
            events:
        {
        focus: () => {
            validationLogin(this.children.input2);
        },
        blur: () => {
            validationLogin(this.children.input2);
        }
}  });
        this.children.input3 = new Input({
            forAndName: 'first_name', labelClass: 'profile__label', labelText: 'Имя',
            inputType: 'text', inputClass: 'profile__input',
            value: (user ? user.first_name : 'Иван'),
            events: {
                focus: () => {
                    validationName(this.children.input3);
                },
                blur: () => {
                    validationName(this.children.input3);
                }
            }  });
        this.children.input4 = new Input({
            forAndName: 'second_name', labelClass: 'profile__label', labelText: 'Фамилия',
            inputType: 'text', inputClass: 'profile__input',
            value: (user ? user.second_name : 'Иванов'),
            events: {
                focus: () => {
                    validationName(this.children.input4);
                },
                blur: () => {
                    validationName(this.children.input4);
                }
            }  });
        this.children.input5 = new Input({
            forAndName: 'display_name', labelClass: 'profile__label', labelText: 'Имя в чате',
            inputType: 'text', inputClass: 'profile__input',
            value: (user ? user.display_name : 'Иван'),
            events:
            {
                focus: () => {
                    validationName(this.children.input5);
                },
                blur: () => {
                    validationName(this.children.input5);
                }
            }   });
        this.children.input6 = new Input({
            forAndName: 'phone', labelClass: 'profile__label', labelText: 'Телефон',
            inputType: 'phone', inputClass: 'profile__input',
            value: (user ? user.phone : '+79001234567'),
            events:
            {
                focus: () => {
                    validationPhone(this.children.input6);
                },
                blur: () => {
                    validationPhone(this.children.input6);
                }
            }});
        this.children.sideButton = new SideButton({ buttonClass: 'side-btn', events: {
            'click': () => {
              Router.go('/messenger');
            }
          } });
        this.children.modal = new Modal({type: 'userAvatar'});
        this.children.image = new Image({
            src: (user.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + user.avatar : profilePhoto),
            alt: "Profile photo",
            class: "avatar",
            events: {
                click: () => {
                    const modal = document.querySelector('.modal') as HTMLElement;
                    modal.style.visibility = 'visible';
            }
        } });
        this.children.modalButton = new Button({
            buttonClass: 'btn', type: 'submit', buttonText: 'Поменять',
            events: {
                click: (evt) => {
                    evt.preventDefault();
                    const form = document.querySelector('.changeUserAvatarForm') as HTMLFormElement;
                    const formData = new FormData(form);
                    formData.set('chatId', store.getState().currentChat);
                    ProfileController.changeAvatar(new FormData(form));
                    this.closeModal();
                    Router.go('/settings'); 
                }
                    
            }
        });
    }

    closeModal() {
        const modal = document.querySelector('#changeUserAvatarModal') as HTMLElement;
        modal.style.visibility = 'hidden';
    }

    onSubmit() {
        const data = { first_name: this.firstName, second_name: this.secondName,
            display_name: this.displayName, login: this.login,
            email: this.email, phone: this.phone
        };
        ProfileController.changeUser(data as ChangeUserType);
        //ProfileController.getUser();
    }

    render() {
        return this.compile(template, this.props);
      }
}

export default withRouter(EditProfile);
