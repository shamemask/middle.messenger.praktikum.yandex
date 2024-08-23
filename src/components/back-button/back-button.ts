import Block from "../../utils/Block";
import template from "./back-button.hbs?raw";
import "./back-button.scss";
import router from "../../utils/Router.ts";

class BackButton extends Block {
  constructor() {
    super({
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.back();
        },
      },
    });
  }

  render() {
    return template;
  }
}

export default BackButton;
