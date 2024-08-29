import Block from '../../utils/Block';
import template from './image.hbs?raw';
import './image.scss';

interface ImageProps {
  className?: string;
  avatar: string;
  alt?: string;
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
