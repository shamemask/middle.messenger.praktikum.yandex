import store from "./Store";
import Block, { BlockProps } from "./Block.ts";

type ComponentConstructor<TProps extends BlockProps = {}> = new (
  props: TProps,
) => Block<TProps>;

export function connect<TProps extends BlockProps>(
  Component: ComponentConstructor<TProps>,
) {
  return class extends Component {
    constructor(props: TProps) {
      // Объединяем переданные props и состояние из store
      super({ ...props, ...store.getState() } as TProps);

      // Подписка на обновления стора
      store.on("updated", () => {
        this.setProps({ ...store.getState() } as TProps);
      });
    }
  };
}
