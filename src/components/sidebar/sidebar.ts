import Block from "../../utils/Block";
import template from "./sidebar.hbs?raw";
import "./sidebar.scss";
import Profile from "../profile";
import Search from "../search";
import { ChatList } from "../index.ts";
import { ChatListProps } from "../chat-list/chat-list.ts";

class Sidebar extends Block {
  constructor(props: ChatListProps) {
    const profile = new Profile();

    const search = new Search();

    const chat_list = new ChatList(props);

    super({
      profile,
      search,
      chat_list,
    });
  }

  render() {
    return template;
  }
}

export default Sidebar;
