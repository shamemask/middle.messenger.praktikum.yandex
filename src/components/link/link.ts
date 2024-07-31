//@ts-nocheck
import Block from '../../utils/Block';
import template from './link.hbs?raw';
import './link.scss';

interface LinkProps {
  className?: string;
  text: string;
  page: string;
}

class Link extends Block {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Link;
