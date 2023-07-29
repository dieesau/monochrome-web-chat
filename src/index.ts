import './style.sass';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Profile } from './pages/profile';
import { ChangeData } from './pages/change-personal-data';
import { ChangePassword } from './pages/change-password'
import { Error404 } from './pages/error-404';
import { Error500 } from "~pages/error-500";
import { Chats } from './pages/chats';
import AuthController from "~controllers/AuthController";
import Router from "./utils/router";
import store from "~utils/store";

enum Routes {
    Login = '/',
    Register= '/register',
    Profile = '/profile',
    ChangeData = '/change-data',
    ChangePassword = '/change-password',
    Chats = '/messenger',
    Error404 = '/404',
    Error500 = '/500'
}

window.addEventListener('DOMContentLoaded', async () => {
    Router
        .use(Routes.Login, Login)
        .use(Routes.Register, Register)
        .use(Routes.Profile, Profile)
        .use(Routes.ChangeData, ChangeData)
        .use(Routes.ChangePassword, ChangePassword)
        .use(Routes.Chats, Chats)
        .use(Routes.Error404, Error404)
        .use(Routes.Error500, Error500)

    try {
        await AuthController.fetchUser();
        if(Boolean(store.getState().user.id)) {
            Router.start();
            Router.go('/profile');
        } else {
            Router.start();
            Router.go('/');
        }
    } catch (e) {
        console.log(e)
        Router.start();
        if (Boolean(store.getState().user)) {
            Router.go('/profile');
        } else {
            Router.go('/');
        }
    }
});
