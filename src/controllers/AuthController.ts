import { AuthAPI, ILoginData, IRegisterData } from '~api/auth';
import Router from '../utils/Router';
import store from '../utils/Store';

class AuthController {
    private api = new AuthAPI();

    async signin(data: ILoginData) {
        try {
            await this.api.signin(data);
            const user = await this.api.getUser();
            store.set('user', user);
            Router.go('/messenger');
        } catch (e: any) {
            console.error(e.reason);
            if (e.reason === 'User already in system') {
                Router.go('/messenger');
            }
            if (e.reason === 'Login or password is incorrect') {
                alert('Неправильный логин или пароль');
            }
        }
    }

    async signup(data: IRegisterData) {
        try {
            await this.api.signup(data);
            const user = await this.api.getUser();
            store.set('user', user);
            Router.go('/messenger');
        } catch (e: any) {
            console.error(e);
        }
    }

    async logout() {
        try {
            await this.api.logout();

            store.set('user', undefined);

            Router.go('/');

        } catch (error) {
            console.log(error);
        }
    }

    async fetchUser() {
        try {
            const user = await this.api.getUser();

            store.set('user', user);

        } catch (error) {
            throw error;
        }
    }
}

export default new AuthController();
