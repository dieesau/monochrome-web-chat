import store from '../core/Store';
import API, { AuthAPI, SignInDataType, SignUpDataType } from '../api/auth';
import Router from '../core/Router';
import ChatsController from './ChatsController';


export class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }
   
    async signin(data: SignInDataType) {
        try {
            await this.api.signin(data);
            const user = await this.api.read();
            store.set('user', user);
            Router.go('/messenger');
        } catch (e: any) {
            console.error(e.reason);
            if (e.reason === 'User already in system') {
                Router.go('/messenger');
            }
            if (e.reason === 'Login or password is incorrect') {
                document.querySelector('.form-error')!.textContent = 'Неправильный логин или пароль';
            }
            document.querySelector('.form-error')!.textContent = '';
        }
    }

    async signup(data: SignUpDataType) {
        try {
            await this.api.signup(data);
            const user = await this.api.read();
            store.set('user', user);
            Router.go('/messenger');
        } catch (e: any) {
            console.error(e);
        }
    }

  async logout() {
    try {
        ChatsController.closeAll();
        await this.api.logout();
        Router.go('/');
        store.set('user', null);
        store.set('chats', null);
        store.set('currentChat', null);
        store.set('messages', null);
    } catch (e: any) {
        console.error(e);
    }
  }

    async fetchUser() {
        const user = await this.api.read();
        store.set('user', user);
    }
}

export default new AuthController();
