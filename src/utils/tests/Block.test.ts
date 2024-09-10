 

/* eslint-disable @typescript-eslint/no-unused-expressions */

import {expect} from "chai";
import Block from "../Block";

class TestBlock extends Block {
  render() {
    return "<div>{{content}}</div>";
  }
}

describe("Block", () => {
  it("should create a Block instance", () => {
    const block = new TestBlock({ content: "Hello, world!" });
    expect(block).to.exist;
    expect(block.getContent().innerHTML).to.include("Hello, world!");
  });

  it("should initialize with default props", () => {
    const block = new TestBlock();
    expect(block.props).to.deep.equal({});
  });

  it("should register event handlers", () => {
    const block = new TestBlock({
      events: {
        click: () => console.log("Clicked"),
      },
    });

    block.getContent().click();
    expect(block).to.exist;
  });
});
