import Block from "../../utils/Block";
import template from "./5xx.hbs?raw";
import "./5xx.scss";

import { Interface, Link, Main } from "../../components";
import { connect } from "../../utils/Hoc.ts";

class Error extends Block {
  constructor() {
    const login_link = new Link({
      url: "/login",
      text: "назад к чатам",
      page: "login",
    });

    super({
      login_link,
    });
  }

  render() {
    return template;
  }
}

class ErrorPage extends Block {
  constructor() {
    const error = new Error();

    const dialogContent = new Interface({
      content: error,
    });

    const content = new Main({
      content: dialogContent,
    });

    super({ content });
  }

  render() {
    return "{{{ content }}}";
  }
}

export default connect(ErrorPage);
