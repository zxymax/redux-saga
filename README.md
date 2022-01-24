### React Redux-Saga Redux-ToolKit

[DEMO_LINK](https://codesandbox.io/s/redux-toolkit-saga-stoic-euler-cjhgx-0by78)

- npm install @reduxjs/toolkit

-> src/redux/    

-> redux/ducks/
- redux/ducks/counter.js
- redux/ducks/user.js
- redux/ducks/userSlice.js

-> redux/sagas/
- redux/sagas/rootReducer.js
->  redux/sagas/handlers/
- redux/sagas/handlers/user.js
-> redux/sagas/requests/
- redux/sagas/requests/user.js

-> index.js
```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/configureStore";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);

```

-> App.js
```js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "./Counter";
import { getUser } from "./redux/ducks/userSlice";
import "./styles.css";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser({ test: "hi", id: 1 }));
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  const count = useSelector((state) => state.counter.count);
  const voters = [
    "Anthony Sistilli ",
    "Bob Smith",
    "Stephanie Foo",
    "Kevin Ma"
  ];
  return (
    <div className="App">
      {user && <h1> Hello, {user.firstName} </h1>}
      <h1>Redux made easy</h1>
      <h2> Total Votes: {count}</h2>
      {voters.map((voter) => (
        <Counter name={voter} />
      ))}
    </div>
  );
}

```

-> redux/reducks/counter.js
```js
const INCREMENT = "increment";
const DECREMENT = "decrement";

export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});

const initialState = {
  count: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};
```

-> redux/ducks/user.js
```js
export const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

export const getUser = () => ({
  type: GET_USER
});

export const setUser = (user) => ({
  type: SET_USER,
  user
});

const initialState = {
  user: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const { user } = action;
      return { ...state, user };
    default:
      return state;
  }
};

```

-> redux/ducks/userSlice.js
```js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    getUser() {},
    setUser(state, action) {
      const userData = action.payload;
      return { ...state, ...userData };
    }
  }
});

export const { getUser, setUser } = userSlice.actions;

export default userSlice.reducer;
```

-> redux/sagas/handlers/user.js
```js
import { call, put } from "redux-saga/effects";
import { setUser } from "../../ducks/userSlice";
import { requestGetUser } from "../requests/user";

export function* handleGetUser(action) {
  try {
    const response = yield call(requestGetUser);
    const { data } = response;
    yield put(setUser({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

```


-> redux/sagas/requests/user.js
```js
import axios from "axios";

export function requestGetUser() {
  return axios.request({
    method: "get",
    url: "https://my-json-server.typicode.com/atothey/demo/user"
  });
}
```


-> redux/sagas/rootSaga.js
```js

import { takeLatest } from "redux-saga/effects";
import { handleGetUser } from "./handlers/user";
import { getUser } from "../ducks/userSlice";

export function* watcherSaga() {
  yield takeLatest(getUser.type, handleGetUser);
}
```


-> redux/configureStore.js
```js

import {
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import userReducer from "./ducks/userSlice";
import counterReducer from "./ducks/counter";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  counter: counterReducer,
  user: userReducer
});

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
});
sagaMiddleware.run(watcherSaga);

export default store;

```


-> Counter.jsx
```js
import React from "react";
import { useDispatch } from "react-redux";
import { decrement, increment } from "./redux/ducks/counter";

const Counter = (props) => {
  const { name } = props;
  const dispatch = useDispatch();

  const [votes, setVotes] = React.useState(0);

  const handleIncrement = () => {
    dispatch(increment());
    setVotes(votes + 1);
  };
  const handleDecrement = () => {
    dispatch(decrement());
    setVotes(votes - 1);
  };

  return (
    <div style={{ backgroundColor: "grey", margin: "10px" }}>
      <h2> {name} </h2>
      <h3> {`Votes: ${votes}`} </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleIncrement}> Increment </button>
        <button onClick={handleDecrement}> Decrement </button>
      </div>
    </div>
  );
};

export default Counter;
```

