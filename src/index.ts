import './style.sass';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Profile } from './pages/profile';
import { ChangeData } from './pages/change-personal-data';
import { Error404 } from './pages/error-404';
import { Chats } from './pages/chats';
import Router from "./utils/router";
import router from "./utils/router";

enum Routes {
    Login = '/',
    Register= '/register',
    Profile = '/profile',
    ChangeData = '/change-data',
    Chats = '/messenger',
    Error404 = '/404'
}

window.addEventListener('DOMContentLoaded', async () => {
    Router
        .use(Routes.Login, Login)
        .use(Routes.Register, Register)
        .use(Routes.Profile, Profile)
        .use(Routes.ChangeData, ChangeData)
        .use(Routes.Chats, Chats)
        .use(Routes.Error404, Error404)

    let isProtectedRoute = true;

    switch (window.location.pathname) {
        case Routes.Login:
        case Routes.Register:
            isProtectedRoute = false
            break
    }

    try {

        router.start()

    } catch (e) {
        console.log(e, 'Here')
        router.start()

        if (isProtectedRoute) {
            router.go(Routes.Error404)
        }
    }
});
