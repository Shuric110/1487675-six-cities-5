import React from "react";
import renderer from "react-test-renderer";

import {SortSelect} from "./sort-select";

const noop = () => {};

describe(`Render SortSelect`, () => {
  it(`SortSelect with sort type 1 in active state renders correctly`, () => {
    const tree = renderer
      .create(
          <SortSelect
            sortType="PRICE_DESC"
            setSortType={noop}
            isActive={true}
            setIsActive={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`SortSelect with sort type 2 in inactive state renders correctly`, () => {
    const tree = renderer
      .create(
          <SortSelect
            sortType="DEFAULT"
            setSortType={noop}
            isActive={false}
            setIsActive={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
