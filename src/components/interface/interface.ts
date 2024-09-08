//@ts-nocheck
import Block from "../../utils/Block";
import template from "./interface.hbs?raw";
import "./interface.scss";

interface InterfaceProps {
  className?: string;
  content: Block;
}

class Interface extends Block {
  constructor(props: InterfaceProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Interface;
