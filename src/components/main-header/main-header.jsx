import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import history from "../../browser-history";
import {authorizationStatusPropType, authorizationInfoPropType} from "../../props";
import {AppRoute, AuthorizationStatus} from "../../const.js";

const MainHeader = (props) => {
  const {isMainPage, authorizationStatus, authorizationInfo} = props;
  const {email: userEmail} = authorizationInfo || {email: null};

  const location = history.location;
  let authReturnUrl = location.pathname;
  if (authReturnUrl === AppRoute.LOGIN) {
    authReturnUrl = location.state && location.state.returnUrl ? location.state.returnUrl : AppRoute.ROOT;
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.ROOT} className={`header__logo-link ${isMainPage ? `header__logo-link--active` : ``}`}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{userEmail}</span>
                  </Link>
                  :
                  <Link className="header__nav-link header__nav-link--profile"
                    to={{
                      pathname: AppRoute.LOGIN,
                      state: {returnUrl: authReturnUrl}
                    }}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

MainHeader.propTypes = {
  isMainPage: PropTypes.bool,
  authorizationStatus: authorizationStatusPropType.isRequired,
  authorizationInfo: authorizationInfoPropType,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.authorizationStatus,
  authorizationInfo: state.USER.authorizationInfo,
});

export {MainHeader};
export default connect(mapStateToProps)(MainHeader);
