//@ts-nocheck
import Block from '../../utils/Block';
import template from './page-title.hbs?raw';
import './page-title.scss';

interface PageTitleProps {
  title: string;
}

class PageTitle extends Block {
  constructor(props: PageTitleProps) {
    super(props);
  }

  render() {
    return template;
  }
}

export default PageTitle;
