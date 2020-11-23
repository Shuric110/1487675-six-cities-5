import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import "./messages.css";

const Messages = (props) => {
  const {messages} = props;

  return (
    <ul className="app-messages">
      {messages.map(({id, text, isFadingOut}) =>
        <li key={id} className={`app-messages__item app-messages__item--error ${isFadingOut ? `app-messages__item--fadeout` : ``}`}>
          {text}
        </li>
      )}
    </ul>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isFadingOut: PropTypes.bool.isRequired,
  })).isRequired
};


const mapStateToProps = (state) => ({
  messages: state.APP.messages,
});

export {Messages};
export default connect(mapStateToProps)(Messages);
