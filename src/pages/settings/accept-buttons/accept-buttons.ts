import template from "./accept-buttons.hbs?raw";
import { Button, Hr } from "../../../components";
import Block from "../../../utils/Block.ts";
import "./accept-buttons.scss";

interface AcceptButtonsProps {
  accept_event: (event: Event) => void;
  cancel_event: (event: Event) => void;
}

class AcceptButtons extends Block {
  constructor(props: AcceptButtonsProps) {
    const accept_button = new Button({
      className: "settings-page__link accept-buttons__button",
      text: "Применить",
      type: "button",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          props.accept_event(event);
        },
      },
    });

    const hr6 = new Hr({ className: "settings-page__hr" });

    const cancel_button = new Button({
      className: "settings-page__link accept-buttons__button",
      text: "Отменить",
      type: "button",
      color: "red",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          props.cancel_event(event);
        },
      },
    });

    super({
      accept_button,
      cancel_button,
      hr6,
    });
  }

  render() {
    return template;
  }
}

export default AcceptButtons;
