import Block from "../../utils/Block";
import template from "./link.hbs?raw";
import "./link.scss";
import router from "../../utils/Router.ts";

interface LinkProps {
  className?: string;
  text: string;
  page?: string;
  url: string;
  color?: string;
  events?: {
    click?: (event: Event) => void;
  };
}

class Link extends Block {
  constructor(props: LinkProps) {
    super({
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go(props.url);
        },
      },
      ...props,
    });
  }

  render() {
    return template;
  }
}

export default Link;
