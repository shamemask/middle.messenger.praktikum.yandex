import {Block} from '../../utils/Block';
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
    const input = new Input({
      className: "input-field__element",
      type: props["type"],
      title: props["title"],
      name: props["name"]
    })
    super({...props, input});
  }

  render() {
    return template;
  }
}

export default InputField;
