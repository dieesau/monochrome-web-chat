import { Block } from "../../core/Block";
import template from "./editPassword.hbs";
import { Input } from '../../components/Input';
import { SideButton } from "../../components/sideButton";
import { Button } from "../../components/Button";
import profilePhoto from "../../assets/ProfileImg.png"
import { Image } from "../../components/Image";
import { validationPassword } from "../../utils/validation";
import { withRouter } from "../../hocs/withRouter";
import store, { StoreEvents } from "../../core/Store";
import ProfileController from "../../controllers/ProfileController";
import { PasswordDataType } from "api/profile";
import Router from '../../core/Router';

class EditPassword extends Block {

    constructor(props: any) {
        super(props);  
    
        store.on(StoreEvents.Updated, () => {
            this.setProps(store.getState());
        });
    }

    oldPassword: FormDataEntryValue | null = null;
    newPassword: FormDataEntryValue | null = null;

    init() {
        this.children.button = new Button({ buttonClass: 'btn', type: 'submit', buttonText: 'Сохранить', events: 
        { click: (evt: PointerEvent) => {
            evt.preventDefault();
            validationPassword(this.children.input);
            validationPassword(this.children.input1);
            validationPassword(this.children.input2);
            const form = document.getElementById('form') as HTMLFormElement;
            const formData = new FormData(form);
            this.oldPassword = formData.get('oldPassword');
            this.newPassword = formData.get('newPassword');
            this.onSubmit();
        } 
        }  });
        this.children.input = new Input({ forAndName: 'oldPassword', labelClass: 'profile__label', labelText: 'Старый пароль', inputType: 'password', inputClass: 'profile__input', value: '•••••••••', events:
        {
        focus: () => {
            validationPassword(this.children.input);
        },
        blur: () => {
            validationPassword(this.children.input);
        }
}  });
        this.children.input1 = new Input({ forAndName: 'newPassword', labelClass: 'profile__label', labelText: 'Новый пароль', inputType: 'password', inputClass: 'profile__input', value: '•••••••••••', events:
        {
        focus: () => {
            validationPassword(this.children.input1);
        },
        blur: () => {
            validationPassword(this.children.input1);
        }
}  });
        this.children.input2 = new Input({ forAndName: 'newPasswordAgain', labelClass: 'profile__label', labelText: 'Повторите новый пароль', inputType: 'password', inputClass: 'profile__input', value: '•••••••••••', events:
        {
        focus: () => {
            validationPassword(this.children.input2);
        },
        blur: () => {
            validationPassword(this.children.input2);
        }
}  });
        this.children.sideButton = new SideButton({ buttonClass: 'side-btn', events: {
            'click': () => {
              Router.go('/messenger');
            }
          } });
        this.children.image = new Image({
            src: (store.getState().user.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + store.getState().user.avatar : profilePhoto),
            alt: "Profile photo",
            class: "avatar"
        });
    }

    onSubmit() {
        const data = { oldPassword: this.oldPassword, newPassword: this.newPassword};
        ProfileController.changePassword(data as PasswordDataType);
    }

    render() {
        return this.compile(template, this.props);
      }
}

export default withRouter(EditPassword);
