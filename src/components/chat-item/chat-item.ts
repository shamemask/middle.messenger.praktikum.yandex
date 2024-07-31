import './chat-item.scss';
import Block from "../../utils/Block";
import template from "./chat-item.hbs?raw";

class ChatItem extends Block {
  constructor({...props}) {
    super({
      ...props,
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatItem;
