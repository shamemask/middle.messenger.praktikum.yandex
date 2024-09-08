import Block from "./Block.ts";
import store from "./Store.ts";

function isEqual(lhs: any, rhs: any): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block): Element | null {
  const root = document.getElementById(query) as Element;
  root.append(block.getContent());
  // block.dispatchComponentDidMount();
  return root;
}

class Route {
  private _pathname: string;
  private _blockClass: any;
  private _block: Block | null = null;
  private _props: any;
  private _root: Element | null = null;

  constructor(pathname: string, view: any, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._root && this._block) {
      if (!this._block._element) {
        this._root.innerHTML = "";
      } else if (this._root.contains(this._block.getContent())) {
        this._root.removeChild(this._block.getContent());
      }
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass();

    if (this._block) {
      this._root = render(this._props.rootQuery, this._block);
      return;
    }
  }
}

class Router {
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | undefined | null = null;
  private readonly _rootQuery: string | undefined;

  private static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: any): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const isProtectedRoute = !["/", "/sign-up"].includes(pathname);
    if (isProtectedRoute && !this._isAuthenticated()) {
      this.go("/");
      return;
    }

    const route = this.getRoute(pathname);

    if (!route) {
      this.go("/not-found");
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  _isAuthenticated() {
    // Здесь можно использовать вызов AuthAPI.getUser() для проверки авторизации
    return !!store.getState().user;
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router("app");
