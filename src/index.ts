import './style.sass';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Profile } from './pages/profile';
import { ChangeData } from './pages/change-personal-data';
import { Error404 } from './pages/error-404';
import { Chats } from './pages/chats';
import Router from "./utils/router";

export const Routes = {
    Auth: '/',
    Register: '/register',
    Profile: '/profile',
    ChangeData: '/change-data',
    Chats: '/messenger',
    Error404: '/404'
}

window.addEventListener('DOMContentLoaded', () => {
    Router
        .use(Routes.Auth, Login)
        .use(Routes.Register, Register)
        .use(Routes.Profile, Profile)
        .use(Routes.ChangeData, ChangeData)
        .use(Routes.Chats, Chats)
        .use(Routes.Error404, Error404)
        .start();
});
