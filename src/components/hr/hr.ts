import Block from "../../utils/Block";
import template from "./hr.hbs?raw";
import "./hr.scss";

interface HrProps {
  className?: string;
}

class Hr extends Block {
  constructor(props: HrProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Hr;
