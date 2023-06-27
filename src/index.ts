import './style.sass'
import {Login} from "./pages/login";
import {Register} from "./pages/register";
import {Profile} from "./pages/profile";
import {ChangeData} from "./pages/change-personal-data";
import {Error404} from "./pages/error-404";
import {Error500} from "./pages/error-500";
import {Chats} from "./pages/chats";

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app');
    const path = window.location.pathname;
    const login = new Login();
    const register = new Register();
    const profile = new Profile();
    const changeData = new ChangeData();
    const error404 = new Error404();
    const error500 = new Error500();
    const chats = new Chats();

    switch (path) {
        case `/`:
            root?.append(login.getContent()!);
            break;
        case `/register`:
            root?.append(register.getContent()!);
            break;
        case `/profile`:
            root?.append(profile.getContent()!);
            break;
        case `/change-data`:
            root?.append(changeData.getContent()!);
            break;
        case `/error-404`:
            root?.append(error404.getContent()!);
            break;
        case `/error-500`:
            root?.append(error500.getContent()!);
            break;
        case `/chats`:
            root?.append(chats.getContent()!);
            break;
        default:
            root?.append(error404.getContent()!);
    }
});
