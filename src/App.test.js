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

it("should have 6 products", async () => {
  const { getAllByText } = render(TestComponent);
  const productTitleText = await waitForElement(() =>
    getAllByText("Tampon pack")
  );

  expect(productTitleText).toHaveLength(6);
});
