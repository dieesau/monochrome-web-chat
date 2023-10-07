import { Block } from '../core/Block';
import Router from '../core/Router';

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
