import Block from "../../utils/Block";
import template from "./search.hbs?raw";
import "./search.scss";
import Input from "../input";

class Search extends Block {
  constructor() {
    const input_search = new Input({
      className: "search__element",
      type: "text",
      name: "search",
      placeholder: "Поиск",
    });
    super({ input_search });
  }

  render() {
    return template;
  }
}

export default Search;
