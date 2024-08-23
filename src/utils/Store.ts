type Subscriber = (state: State) => void;

interface Action {
  type: string;

  [key: string]: any;
}

interface State {
  buttonText: string;
}

type Reducer = (state: State, action: Action) => State;

const createStore = (reducer: Reducer, initialState: State) => {
  const subscribers: Subscriber[] = [];
  let currentState = initialState;

  return {
    getState: (): State => currentState,
    subscribe: (fn: Subscriber) => {
      subscribers.push(fn);
      fn(currentState);
    },
    dispatch: (action: Action) => {
      currentState = reducer(currentState, action);
      subscribers.forEach((fn) => fn(currentState));
    },
  };
};

const deepCopy = <T>(object: T): T => JSON.parse(JSON.stringify(object));

const reducer: Reducer = (state, action) => {
  let newState = deepCopy(state);
  if (action.type === "SET_TEXT") {
    console.log("SET_TEXT");
    newState.buttonText = action.buttonText;
    return newState;
  } else {
    return state;
  }
};

const state: State = {
  buttonText: "Initial text",
};

// const setTextAction: Action = {
//   type: 'SET_TEXT',
//   buttonText: ''
// };

const store = Object.freeze(createStore(reducer, state));

export default store;
