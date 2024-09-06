import "./create-chat-form.scss";
import Block from "../../utils/Block";
import template from "./create-chat-form.hbs?raw";

interface CreateChatProps {
  events?: {
    submit: (event: Event) => void;
  };
}

class CreateChatForm extends Block {
  constructor(props: CreateChatProps) {
    super({
      ...props,
    });
  }

  render() {
    return template;
  }
}

export default CreateChatForm;
