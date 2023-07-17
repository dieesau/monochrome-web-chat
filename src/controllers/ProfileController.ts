import store from "~utils/store";
import {ProfileAPI, IChangeUserData, IPasswordData} from "~api/profile";

class ProfileController {
    private api = new ProfileAPI();

    async changeUser(data: IChangeUserData) {
        try {
            await this.api.changeUser(data);
            store.set('user', data);
        } catch (e: any) {
            console.log(e)
        }
    }

    async getUser() {
        await this.api.read(store.getState().user.id);
    }

    async changePassword(data: IPasswordData) {
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
