import Block from "../../utils/Block";
import template from "./search.hbs?raw";
import "./search.scss";
import Input from "../input";

interface SearchProps {
  content: Block;
}

class Search extends Block {
  constructor(props: SearchProps) {
    const input = new Input({
      className: "search__element",
      type: "text",
      name: "search",
      placeholder: "Поиск",
    });
    super({ ...props, input });
  }

  render() {
    return template;
  }
}

export default Search;
