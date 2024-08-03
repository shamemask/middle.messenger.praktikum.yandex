import './chat-list.scss';
import {Block} from "../../utils/Block";
import template from "./chat-list.hbs?raw";

class ChatList extends Block {
  constructor({...props}) {
    super(props);
  }

  render() {
    return template;
  }
}

export default ChatList;
