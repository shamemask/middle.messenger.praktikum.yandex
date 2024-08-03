//@ts-nocheck
import {Block} from '../../utils/Block';
import template from './dialog.hbs?raw';
import './dialog.scss';

interface DialogProps {
  content: Block[];
}

class Dialog extends Block {
  constructor(props: DialogProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default Dialog;
