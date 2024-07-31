//@ts-nocheck
import Block from '../../utils/Block';
import template from './button.hbs?raw';
import './button.scss';

interface ButtonProps {
  className?: string;
  text: string;
  page: string;
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Button;
