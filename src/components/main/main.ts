//@ts-nocheck
import {Block} from '../../utils/Block';
import template from './main.hbs?raw';
import './main.scss';

interface MainProps {
  content: Block;
}

class Main extends Block {
  constructor(props: MainProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Main;
