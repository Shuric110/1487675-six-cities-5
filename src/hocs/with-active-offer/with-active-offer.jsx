import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";

const mapDispatchToProps = (dispatch) => ({
  setActiveOffer(offer) {
    dispatch(ActionCreator.setActiveOffer(offer));
  },
  clearActiveOffer(oldOffer) {
    dispatch(ActionCreator.clearActiveOffer(oldOffer));
  },
});

const withActiveOffer = (Component) => {
  return connect(null, mapDispatchToProps)(Component);
};

export default withActiveOffer;
