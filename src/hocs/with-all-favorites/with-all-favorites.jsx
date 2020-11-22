import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {favoritePropType} from "../../props";
import {AsyncActionCreator} from "../../store/async-action";

const mapStateToProps = (state) => ({
  favorites: state.DATA.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFavorites() {
    dispatch(AsyncActionCreator.fetchFavorites());
  }
});

const withAllFavorites = (Component) => {
  class WithAllFavorites extends PureComponent {
    componentDidMount() {
      this._loadData();
    }

    componentDidUpdate() {
      this._loadData();
    }

    _loadData() {
      const {favorites, fetchFavorites} = this.props;
      if (favorites === null) {
        fetchFavorites();
      }
    }

    render() {
      const {favorites} = this.props;

      return <Component
        {...this.props}
        favorites={favorites}
      />;
    }
  }

  WithAllFavorites.propTypes = {
    favorites: PropTypes.arrayOf(favoritePropType.isRequired),
    fetchFavorites: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithAllFavorites);
};

export default withAllFavorites;
