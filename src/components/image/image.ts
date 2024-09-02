import Block from "../../utils/Block";
import template from "./image.hbs?raw";
import "./image.scss";

interface ImageProps {
  className?: string;
  src: string;
  alt?: string;
  events?: {
    click?: (event: Event) => void;
  };
}

class Image extends Block {
  constructor(props: ImageProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Image;
