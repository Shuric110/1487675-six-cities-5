import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SortSelect} from "./sort-select";

Enzyme.configure({
  adapter: new Adapter(),
});

const noop = () => {};

describe(`SortSelect works correctly`, () => {
  it(`Menu opens on click`, () => {
    const setIsActive = jest.fn();

    const wrapper = mount(
        <SortSelect
          sortType="PRICE_DESC"
          setSortType={noop}
          isActive={false}
          setIsActive={setIsActive}
        />
    );

    wrapper.find(`.places__sorting-type`).simulate(`click`);

    expect(setIsActive).toHaveBeenCalledTimes(1);
    expect(setIsActive).toHaveBeenNthCalledWith(1, true);
  });

  it(`Sort type changes and menu closes on new sort selection`, () => {
    const setIsActive = jest.fn();
    const setSortType = jest.fn();

    const wrapper = mount(
        <SortSelect
          sortType="PRICE_DESC"
          setSortType={setSortType}
          isActive={true}
          setIsActive={setIsActive}
        />
    );

    wrapper.find(`ul.places__options li`).at(0).simulate(`click`);

    expect(setIsActive).toHaveBeenCalledTimes(1);
    expect(setIsActive).toHaveBeenNthCalledWith(1, false);
    expect(setSortType).toHaveBeenCalledTimes(1);
    expect(setSortType).toHaveBeenNthCalledWith(1, `DEFAULT`);
  });
});
