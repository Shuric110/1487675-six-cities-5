import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const withActiveFlag = (Component) => {
  class WithActiveFlag extends PureComponent {
    constructor(props) {
      super(props);

      const {initialState = false} = props;

      this.state = {
        isActive: initialState,
      };
    }

    render() {
      const {isActive} = this.state;

      return <Component
        isActive={isActive}
        setIsActive={(newIsActive) => this.setState({isActive: newIsActive})}
        {...this.props}
      />;
    }
  }

  WithActiveFlag.propTypes = {
    initialState: PropTypes.bool
  };

  return WithActiveFlag;
};

export default withActiveFlag;
