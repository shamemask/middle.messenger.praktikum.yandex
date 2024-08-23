import Block from "../../utils/Block";
import template from "./container.hbs?raw";
import "./container.scss";

interface ContainerProps {
  content: Block;
}

class Container extends Block {
  constructor(props: ContainerProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Container;
