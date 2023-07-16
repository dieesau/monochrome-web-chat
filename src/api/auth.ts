import { API } from './api';

export interface IRegisterData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface ILoginData {
    login: string;
    password: string;
}

export interface IUser {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export class AuthAPI extends API {
    constructor() {
        super('/auth');
    }

    signin(data: ILoginData) {
        return this.http.post('/signin', { data: data, method: 'post', timeout: 5000 });
    }

    signup(data: IRegisterData): Promise<XMLHttpRequest> {
        return this.http.post('/signup', { data: data, method: 'post', timeout: 5000 });
    }

    logout(): Promise<XMLHttpRequest> {
        return this.http.post('/logout',{ method: 'post', timeout: 5000 });
    }

    getUser(): Promise<XMLHttpRequest> {
        return this.http.get('/user',{ method: 'get', timeout: 5000 });
    }
}
