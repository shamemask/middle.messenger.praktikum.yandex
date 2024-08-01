import Block from '../../utils/Block';
import template from './input.hbs?raw';
import './input.scss';

interface InputProps {
  className: string;
  type?: string;
  title?: string;
  name: string;
  value?: string;
  placeholder?: string;
}

class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Input;
