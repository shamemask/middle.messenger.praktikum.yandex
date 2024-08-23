import Block from "../../utils/Block";
import template from "./sidebar.hbs?raw";
import "./sidebar.scss";

interface SidebarProps {
  content: Block;
}

class Sidebar extends Block {
  constructor(props: SidebarProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Sidebar;
