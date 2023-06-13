import {HomePage} from "./pages/Home"
import {NotFound} from "./pages/clientError";
import './style.sass'
import ServErr from "./pages/serverError";
import {LoginPage} from "./pages/login";

const root = document.querySelector('#app')

switch (window.location.pathname) {
    case '/':
        const home = new HomePage()
        root.append(home.getContent()!)
        home.dispatchComponentDidMount()

        break

    case '/login':
        const login = new LoginPage()
        root.append(login.getContent()!)
        login.dispatchComponentDidMount()

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
