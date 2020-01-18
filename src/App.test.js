import React from "react";
import {
  render,
  waitForElement,
  wait,
  fireEvent,
  screen
} from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./App";
import rootReducer from "./redux/reducers";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const connectedApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

test("Loading message is shown before products are loaded", async () => {
  const { getByText } = render(connectedApp);

  expect(getByText("Products loading...")).toBeInTheDocument();
});

test("When products are loaded there are 6 product titles", async () => {
  const { getAllByText } = render(connectedApp);
  const productTitleText = await waitForElement(() =>
    getAllByText("Tampon pack")
  );

  expect(productTitleText).toHaveLength(6);
});

test("The loading message is removed", async () => {
  const { queryByText } = render(connectedApp);

  await wait(() => {
    expect(queryByText("Products loading...")).not.toBeInTheDocument();
  });
});

test("Shows the right number of products when filter is set", async () => {
  const { getAllByText } = render(connectedApp);

  await wait(() => {
    fireEvent.click(screen.getByTestId("checkbox-regular"));
    expect(getAllByText("Tampon pack")).toHaveLength(3);
  });
});
