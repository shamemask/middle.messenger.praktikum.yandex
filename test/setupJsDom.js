/* eslint-disable no-undef */
import {JSDOM} from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost:3000",
});

global.document = dom.window.document;
global.window = dom.window;
global.history = dom.window.history;
global.HTMLElement = dom.window.HTMLElement;
global.pathname = window.location.pathname;
global.DocumentFragment = dom.window.DocumentFragment;
global.localStorage = window.localStorage;
