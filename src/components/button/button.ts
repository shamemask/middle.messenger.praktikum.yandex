import Block from "../../utils/Block";
import template from "./button.hbs?raw";
import "./button.scss";
import router from "../../utils/Router.ts";

interface ButtonProps {
  className?: string;
  text: string;
  page?: string;
  type?: string;
  color?: string;
  events?: {
    click?: (event: Event) => void;
  };
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      events: {
        click: (event: Event) => this.navigate(event),
      },
      ...props,
    });
  }

  render() {
    return template;
  }

  private navigate(event: Event) {
    const { page, type } = this.props as ButtonProps;
    if (type !== "submit" && page) {
      event.preventDefault();
      router.go(`/${page}`);
    }
  }
}

export default Button;
