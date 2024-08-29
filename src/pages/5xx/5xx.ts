import Block from '../../utils/Block';
import template from './5xx.hbs?raw';
import './5xx.scss';

import {Interface, Link, Main} from "../../components";

class Error extends Block {
  constructor(props: any = {}) {

    const login_link = new Link({
      url: '/login',
      text: "назад к чатам",
      page: 'login'
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

class ErrorPage extends Block {
  constructor(props: any) {
    const error = new Error();

    const dialogContent = new Interface({
      content: error
    });

    const content = new Main({
      content: dialogContent,
    });

    super({...props, content});
  }

  render() {
    return '{{{ content }}}';
  }
}

export default ErrorPage;
