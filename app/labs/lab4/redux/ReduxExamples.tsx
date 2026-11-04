"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";

export default function ReduxExamples() {
  return (
    <div id="wd-redux-examples">
      <h2>Redux</h2>

      <Provider store={store}>
        <HelloRedux />
        <CounterRedux />
        <AddRedux />
      </Provider>

      <hr />
    </div>
  );
}