import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../store/action";
import {SortType, SORT_DEFINITIONS} from "../../const";
import withActiveFlag from "../../hocs/with-active-flag/with-active-flag";

const SortSelect = (props) => {
  const {sortType: currentSortType, setSortType, isActive, setIsActive} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={() => setIsActive(!isActive)}>
        {SORT_DEFINITIONS[currentSortType].title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isActive ? `places__options--opened` : ``}`}
        onClick={(evt) => {
          if (evt.target.dataset.sortType) {
            setSortType(evt.target.dataset.sortType);
            setIsActive(false);
          }
        }}
      >
        {Object.values(SortType).map((sortType) => (
          <li tabIndex="0" key={sortType}
            className={`places__option ${currentSortType === sortType ? `places__option--active` : ``}`}
            data-sort-type={sortType}
          >
            {SORT_DEFINITIONS[sortType].title}
          </li>
        ))}
      </ul>
    </form>
  );
};

SortSelect.propTypes = {
  sortType: PropTypes.string.isRequired,
  setSortType: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sortType: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  setSortType(sortType) {
    dispatch(ActionCreator.setSortType(sortType));
  },
});

export {SortSelect};
export default connect(mapStateToProps, mapDispatchToProps)(withActiveFlag(SortSelect));
