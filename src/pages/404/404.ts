import Block from "../../utils/Block";
import template from "./404.hbs?raw";
import "./404.scss";
import { Interface, Link, Main } from "../../components";
import { connect } from "../../utils/Hoc.ts";

class NotFound extends Block {
  constructor(props: any = {}) {
    const login_link = new Link({
      url: "/login",
      text: "назад к чатам",
      page: "login",
    });

    super({
      ...props,
      login_link,
    });
  }

  render() {
    return template;
  }
}

class NotFoundPage extends Block {
  constructor(props: any) {
    const not_found = new NotFound();

    const dialogContent = new Interface({
      content: not_found,
    });

    const content = new Main({
      content: dialogContent,
    });

    super({ ...props, content });
  }

  render() {
    return "{{{ content }}}";
  }
}

export default connect(NotFoundPage);
