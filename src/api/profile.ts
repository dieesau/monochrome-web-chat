import BaseAPI from './base-api';

export type PasswordDataType =  {
  oldPassword: string;
  newPassword: string;
}

export type UserType =  {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export type ChangeUserType = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export class ProfileAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    changeUser(data: ChangeUserType) {
      return this.http.put('/profile', { data: data, method: 'put', timeout: 5000 });
    }
    
    changePassword(data: PasswordDataType) {
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
    
    create = undefined;
    update = undefined;
    delete = undefined;
}

export default new ProfileAPI();
