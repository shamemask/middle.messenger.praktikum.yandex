import "./create-chat-form.scss";
import Block from "../../utils/Block";
import template from "./create-chat-form.hbs?raw";

class CreateChatForm extends Block {
  constructor(events: { events: { submit: (event: Event) => void } }) {
    super({
      events,
    });
  }

  render() {
    return template;
  }
}

export default CreateChatForm;
