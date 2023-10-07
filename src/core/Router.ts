import { Block } from "./Block";
import renderDOM from "./renderDOM";

export interface BlockConstructable<P = any> {
    new(props: P): Block;
  }

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

class Route {
    _block: Block | null = null;
    _pathname: string;
    _blockClass: BlockConstructable;

    constructor(pathname: string, view: any) {
        this._pathname = pathname;
        this._blockClass = view;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block?.destroy();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
            this._block = new this._blockClass({});
            renderDOM(this._block);
      }
}

class Router {
    static __instance: Router;
    _rootQuery!: string;
    history!: History;
    _currentRoute!: Route | null;
    routes!: Route[];

    
    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: BlockConstructable) {
        const route = new Route(pathname, block);
        this.routes.push(route);
        return this;
    }

    start() {
      window.onpopstate = event => {
      this._onRoute((event.currentTarget! as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
          return;
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();

    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
  }

    back() {
      this.history.back();
    }

    forward() {
      this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router(".app");

