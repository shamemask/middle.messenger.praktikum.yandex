import {Block} from '../../utils/Block';
import template from './chat-page.hbs?raw';
import './chat-page.scss';
import {Interface, Main} from "../../components";


class Chat extends Block {
  constructor(props: any = {}) {


    super({
      ...props,
    });
  }

  render() {
    return template;
  }
}

class ChatPage extends Block {
  constructor(props: any) {
    const chat = new Chat();

    const dialogContent = new Interface({
      content: chat
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

export default ChatPage;
