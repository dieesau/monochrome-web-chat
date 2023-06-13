import {HomePage} from "./pages/Home"
import {NotFound} from "./pages/clientError";
import './style.sass'

const root = document.querySelector('#app')

switch (window.location.pathname) {
    case '/':
        const home = new HomePage()
        root.append(home.getContent()!)
        home.dispatchComponentDidMount()

        break

    case '/404':
        const nf = new NotFound()
        root.append(nf.getContent()!)
        nf.dispatchComponentDidMount()

        break
}
