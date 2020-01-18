import React from "react";
import { render } from "@testing-library/react";

import Filters from "./Filters";
import { FILTER_CATEGORIES } from "../utils/constants";

describe("The filters", () => {
  test("Have the correct category titles", () => {
    const { getByText } = render(<Filters setFilterKeywords={() => {}} />);
    FILTER_CATEGORIES.map(({ heading }) =>
      expect(getByText(heading)).toBeInTheDocument()
    );
  });
});
