import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import EditPassword from './pages/EditPassword';
import { Registration } from './pages/Registration';
import { Error400 } from './pages/Page400';
import { Error500 } from './pages/Page500';
import { AddDeleteUserPanel } from './components/AddDeleteUserPanel';
import Chat from './pages/Chat';
import Router from './core/Router';
import AuthController from './controllers/AuthController';
import store from './core/Store';

window.addEventListener('DOMContentLoaded', async() => {
    Router
        .use('/', LoginPage)
        .use('/messenger', Chat)
        .use('/settings', Profile)
        .use('/edit-profile', EditProfile)
        .use('/edit-password', EditPassword)
        .use('/sign-up', Registration)
        .use('/error400', Error400)
        .use('/error500', Error500)
        .use('/addAndDeleteUser', AddDeleteUserPanel)

    try {
        await AuthController.fetchUser();
        if(Boolean(store.getState().user.id)) {
            Router.start();
            Router.go('/messenger');
        } else {
            Router.start();
            Router.go('/');
        }
    } catch (e) {
        Router.start();
        if(Boolean(store.getState().user)) {
            Router.go('/messenger');
        } else {
            Router.go('/');
        }
    }
});
