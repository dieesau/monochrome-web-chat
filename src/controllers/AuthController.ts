import { AuthAPI, ILoginData, IRegisterData } from '../api/AuthAPI';
import Router from '../utils/Router';
import store from '../utils/Store';

class AuthController {
    private api = new AuthAPI();

    async signin(data: ILoginData) {
        try {
            await this.api.signin(data);

            await this.fetchUser();

            console.log(store.getState())
            Router.go('/profile');
        } catch (error) {
            console.log(error);
        }
    }

    async signup(data: IRegisterData) {
        try {
            console.log(data)
            await this.api.signup(data);
            console.log(store.getState())
            Router.go('/profile');
        } catch (error) {
            console.log(error);
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
