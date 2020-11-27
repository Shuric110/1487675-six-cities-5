import {connect} from "react-redux";
import {getSortedFilteredOffers} from "../../store/selectors";

const mapStateToProps = (state) => ({
  offers: getSortedFilteredOffers(state),
});

const withAllOffers = (Component) => {
  return connect(mapStateToProps)(Component);
};

export default withAllOffers;
