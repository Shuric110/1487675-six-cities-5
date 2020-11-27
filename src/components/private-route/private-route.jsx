import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus, AppRoute} from "../../const";


const PrivateRoute = (props) => {
  const {path, exact, authorizationStatus} = props;
  const render = props.render || (() => props.children);

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(routeProps)
            : <Redirect to={{
              pathname: AppRoute.LOGIN,
              state: {returnUrl: routeProps.location.pathname}
            }} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  render: PropTypes.func,
  children: PropTypes.node
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.authorizationStatus,
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
