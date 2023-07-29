import { API } from './api';

export type IPasswordData =  {
    oldPassword: string;
    newPassword: string;
}

export type IUser =  {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export type IChangeUserData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export class ProfileAPI extends API {
    constructor() {
        super('/user');
    }

    changeUser(data: IChangeUserData) {
        return this.http.put('/profile', { data: data, method: 'put', timeout: 5000 });
    }

    changePassword(data: IPasswordData) {
        return this.http.put('/password', { data: data, method: 'put', timeout: 5000 });
    }

    changeAvatar(data: any) {
        return this.http.put('/profile/avatar', { data: data, method: 'put', timeout: 5000 });
    }

    read(id: string) {
        return this.http.get(`/user/{${id}}`,{ method: 'get', timeout: 5000 });
    }

    search(login: string) {
        return this.http.post(`/search`, { data: {login: login }, method: 'post', timeout: 5000 });
    }
}

export default new ProfileAPI();
