import  Block  from './Block';
import Router from './Router';

export interface PropsWithRouter {
    router: typeof Router;
}

export function withRouter(Component: typeof Block<any>) {

    return class WithRouter extends Component {
        constructor(props: any) {
            super({ ...props, router: Router });
        }
    }
}
