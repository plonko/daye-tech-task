import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import App from "./App";
import rootReducer from "./redux/reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

const TestComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);

it("should make an async call", async () => {
  const { container, getByText } = render(TestComponent);
  console.log("££££", container);

  await waitForElement(() => getByText("texts loaded"));
  // await wait(() => expect(fetch).toHaveBeenCalledTimes(2))
  // expect(fetch).toHaveBeenCalledTimes(2);
});
