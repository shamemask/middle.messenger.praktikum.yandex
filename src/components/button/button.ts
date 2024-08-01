//@ts-nocheck
import Block from '../../utils/Block';
import template from './button.hbs?raw';
import './button.scss';

interface ButtonProps {
  className?: string;
  text: string;
  page: string;
  type?: string;
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: (event) => this.navigate(event),
      },
    });
  }

  render() {
    return template;
  }

  private navigate(event) {
    const {page, type} = this.props;
    if (type !== 'submit') {
      event.preventDefault();
      window.location.href = `/${page}`;
    }
  }
}

export default Button;