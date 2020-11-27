import React, {PureComponent, createRef} from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {authorizationStatusPropType} from "../../props";
import {AsyncActionCreator} from "../../store/async-action";
import {AppRoute, AuthorizationStatus} from "../../const.js";
import MainHeader from "../main-header/main-header";

class AuthScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.emailRef = createRef();
    this.passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {returnUrl, onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
      returnUrl
    });
  }

  render() {
    const {authorizationStatus} = this.props;

    if (authorizationStatus === AuthorizationStatus.AUTH) {
      return <Redirect to={AppRoute.ROOT} />;
    }

    return (
      <div className="page page--gray page--login">
        <MainHeader />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={this.handleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input ref={this.emailRef} className="login__input form__input" type="email" name="email" placeholder="Email" required="required" />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input ref={this.passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required="required" />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

AuthScreen.propTypes = {
  returnUrl: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  authorizationStatus: authorizationStatusPropType.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.authorizationStatus
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit({email, password, returnUrl}) {
    dispatch(AsyncActionCreator.login(email, password, returnUrl));
  }
});

export {AuthScreen};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
