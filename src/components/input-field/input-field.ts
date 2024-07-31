//@ts-nocheck
import Block from '../../utils/Block';
import template from './input-field.hbs?raw';
import './input-field.scss';
import Input from "../input";

interface InputFieldProps {
  className: string;
  title: string;
  name: string;
  type?: string;
}

class InputField extends Block {
  constructor(props: InputFieldProps) {
    props["input"] = new Input({
      className:"-field__element",
      type:props["type"],
      title:props["title"],
      name:props["name"]
    })
    super(props);
  }

  render() {
    return template;
  }
}

export default InputField;
