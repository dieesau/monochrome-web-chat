import store from '../core/Store';
import API, { ChangeUserType, PasswordDataType, ProfileAPI } from '../api/profile';

export class ProfileController {
    private readonly api: ProfileAPI;

    constructor() {
        this.api = API;
    }

    async changeUser(data: ChangeUserType) {
        try {
            await this.api.changeUser(data);
            store.set('user', data);
        } catch (e: any) {
            console.error(e);
        }
    }

    async getUser() {
        await this.api.read(store.getState().user.id);
    }
    
    async changePassword(data: PasswordDataType) {
        try {
            await this.api.changePassword(data);
        } catch (e: any) {
            console.error(e);
        }
    }

    async changeAvatar(data: any) {
        try {
            await this.api.changeAvatar(data);
        } catch (e: any) {
            console.error(e);
        }
    }

    async searchUser(login: string) {
        try {
            const searchUserData = await this.api.search(login);
            store.set('searchUserData', searchUserData);
        } catch (e: any) {
            console.error(e);
        }
    }
}

export default new ProfileController();
