import Block from "../../utils/Block";
import template from "./input-with-label.hbs?raw";
import "./input-with-label.scss";
import Input from "../input";

interface InputWithLabelProps {
  className: string;
  title: string;
  name: string;
  type?: string;
  text?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}

class InputWithLabel extends Block {
  constructor(props: InputWithLabelProps) {
    const input = new Input({
      className: "input-field__element",
      type: props["type"],
      title: props["title"],
      name: props["name"],
      value: props["value"],
      placeholder: props["placeholder"],
      disabled: props["disabled"],
    });
    super({ ...props, input });
  }

  render() {
    return template;
  }
}

export default InputWithLabel;
