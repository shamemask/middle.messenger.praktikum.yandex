/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import EventBus from "./EventBus";
import handlebars from "handlebars";

const { compile: handlebarsCompile } = handlebars;

export type BlockProps = Record<string, any>;

class Block<TProps extends BlockProps = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element: HTMLElement | null = null;
  _id = Math.floor(100000 + Math.random() * 900000);
  props: TProps;
  children: Record<string, Block>;
  private lists: Record<string, Block[]>;
  eventBus: () => EventBus;

  constructor(propsWithChildren: TProps = {} as TProps) {
    const eventBus = new EventBus();
    const { props, children, lists } =
      this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy(props as TProps) as TProps;
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(_oldProps?: TProps) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(_oldProps: TProps, _newProps: TProps) {
    return true;
  }

  _getChildrenPropsAndProps(propsAndChildren: TProps) {
    const children: Record<string, Block> = {};
    const props: Record<string, any> = {};
    const lists: Record<string, Block[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  addAttributes() {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        if (typeof value === "string") {
          this._element.setAttribute(key, value);
        }
      }
    });
  }

  setProps = (nextProps: Partial<TProps>) => {
    if (!nextProps) {
      return;
    }

    const { children, props, lists } = this._getChildrenPropsAndProps(
      nextProps as TProps,
    );
    this.children = children;

    this.lists = lists;
    this.props = this._makePropsProxy(props as TProps) as TProps;

    this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);

    this._render();
  };

  get element() {
    return this._element;
  }

  _render() {
    const propsAndStubs: Record<string, string> = { ...this.props };
    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([_key, _child]) => {
      propsAndStubs[_key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement("template");
    const template = handlebarsCompile(this.render());

    fragment.innerHTML = template(propsAndStubs);
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([_key, _child]) => {
      const listCont = this._createDocumentElement("template");
      _child.forEach((item) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  render() {
    return "<div>{{content}}</div>";
  }

  getContent(): HTMLElement {
    return this.element!;
  }

  _makePropsProxy(props: TProps) {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: Record<string, string>, prop: string, value) => {
        const oldTarget = { ...target };
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("No access");
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }

  remove() {
    this._element?.remove();
    this._element = null;
  }
}

export default Block;
