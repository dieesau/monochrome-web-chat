import {NotFound} from "./pages/clientError";
import './style.sass'
import ServErr from "./pages/serverError";
import {LoginPage} from "./pages/login";
import RegPage from "./pages/register";
import ProfilePage from "./pages/profile";
import {ChangeData} from "./pages/change_personal_data";
import ChatPage from "./pages/chats";

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app');
    const path = window.location.pathname;
    const loginPage = new LoginPage();
    const signinPage = new RegPage();
    const profilePage = new ProfilePage();
    const error500Page = new ServErr();
    const notFoundPage = new NotFound();

    const routes = {
        Login: '/',
        Profile: '/profile/',
        Main: '/login/',
        Signin: '/signin/',
        ChangeProfile: '/change_profile/',
        ChangePassword: '/change_password/',
        Error500: '/error_500/',
    };

    if (routes.Login.match(path)) {
        root?.append(loginPage.getContent()!);
    } else if (routes.Signin.match(path)) {
        root?.append(signinPage.getContent()!);
    } else if (routes.Profile.match(path)) {
        root?.append(profilePage.getContent()!);
        profilePage.dispatchComponentDidMount();
    } else if (routes.Error500.match(path)) {
        root?.append(error500Page.getContent()!);
    } else {
        root?.append(notFoundPage.getContent()!);
    }
});
