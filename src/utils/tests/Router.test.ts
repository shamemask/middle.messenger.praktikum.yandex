import { expect } from "chai";
import Block from "../Block";
import Router from "../Router";

class MockBlock extends Block {
  getContent() {
    const element = document.createElement("div");
    element.textContent = "Test Block";
    return element;
  }
}

describe("Router", () => {
  let router: Router;
  let originalIsAuthenticated: any;

  beforeEach(() => {
    router = new Router("app");
    originalIsAuthenticated = router._isAuthenticated;
    router._isAuthenticated = () => true;

    document.body.innerHTML = '<div id="app"></div>';
  });

  afterEach(() => {
    router._isAuthenticated = originalIsAuthenticated;
  });

  it("should render the correct block on navigation", () => {
    router.use("/test", MockBlock);
    router.go("/test");

    const app = document.getElementById("app") as HTMLElement;
    expect(app.textContent).to.equal("Test Block");
  });

  it("should render 404 page if route is not found", () => {
    router.use("/not-found", MockBlock);
    router.go("/unknown");

    expect(window.location.pathname).to.equal("/not-found");
  });
});
