import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {authorizationStatusPropType, authorizationInfoPropType} from "../../props";
import {AuthorizationStatus} from "../../const.js";

const MainHeader = (props) => {
  const {isMainPage, authorizationStatus, authorizationInfo} = props;
  const {email: userEmail} = authorizationInfo || {email: null};

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className={`header__logo-link ${isMainPage ? `header__logo-link--active` : ``}`}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{userEmail}</span>
                  </a>
                  :
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
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
