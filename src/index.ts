import {HomePage} from "./pages/Home"
import {NotFound} from "./pages/clientError";
import './style.sass'
import ServErr from "./pages/serverError";
import {LoginPage} from "./pages/login";
import RegPage from "./pages/register";
import ProfilePage from "./pages/profile";
import {ChangeData} from "./pages/change_personal_data";
import ChatPage from "./pages/chats";

const root = document.querySelector('#app')

switch (window.location.pathname) {
    case '/':
        const home = new HomePage()
        root.append(home.getContent()!)
        home.dispatchComponentDidMount()

        break

    case '/chats':
        const chats = new ChatPage()
        root.append(chats.getContent()!)
        chats.dispatchComponentDidMount()

        break

    case '/login':
        const login = new LoginPage()
        root.append(login.getContent()!)
        login.dispatchComponentDidMount()

        break

    case '/register':
        const register = new RegPage()
        root.append(register.getContent()!)
        register.dispatchComponentDidMount()

        break

    case '/profile':
        const profile = new ProfilePage()
        root.append(profile.getContent()!)
        profile.dispatchComponentDidMount()

        break

    case '/profile/settings':
        const editData = new ChangeData()
        root.append(editData.getContent()!)
        editData.dispatchComponentDidMount()

        break


    case '/404':
        const nf = new NotFound()
        root.append(nf.getContent()!)
        nf.dispatchComponentDidMount()

        break

    case '/500':
        const servErr = new ServErr()
        root.append(servErr.getContent()!)
        servErr.dispatchComponentDidMount()

        break
}
