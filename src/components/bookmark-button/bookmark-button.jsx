import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {offerPropType} from "../../props";
import {AsyncActionCreator} from "../../store/async-action";


const BookmarkButton = (props) => {
  const {children, baseClassName, offer: {id, isFavorite}, setIsFavorite} = props;
  return (
    <button className={`${baseClassName} button ${isFavorite ? `${baseClassName}--active` : ``}`} type="button"
      onClick={() => setIsFavorite(id, !isFavorite)}
    >
      {children}
    </button>
  );
};

BookmarkButton.propTypes = {
  children: PropTypes.node.isRequired,
  baseClassName: PropTypes.string.isRequired,
  offer: offerPropType.isRequired,
  setIsFavorite: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setIsFavorite(offerId, isFavorite) {
    dispatch(AsyncActionCreator.setIsFavorite(offerId, isFavorite));
  },
});

export {BookmarkButton};
export default connect(null, mapDispatchToProps)(BookmarkButton);
