import BaseAPI from './base-api';

export type SignInDataType =  {
  login: string;
  password: string;
}

export type SignUpDataType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
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

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signin(data: SignInDataType) {
      return this.http.post('/signin', { data: data, method: 'post', timeout: 5000 });
  }


  signup(data: SignUpDataType) {
    return this.http.post('/signup', { data: data, method: 'post', timeout: 5000 });
  }

  read() {
    return this.http.get('/user',{ method: 'get', timeout: 5000 });
  }

  logout() {
    return this.http.post('/logout',{ method: 'post', timeout: 5000 });
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new AuthAPI();
