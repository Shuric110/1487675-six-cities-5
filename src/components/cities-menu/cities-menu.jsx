import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {cityPropType} from "../../props";
import {ActionCreator} from "../../store/action";

const CitiesMenu = (props) => {
  const {cities, currentCity, setCurrentCity} = props;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city.id}>
              <a onClick={() => setCurrentCity(city)}
                className={`locations__item-link tabs__item ${city.id === currentCity.id ? `tabs__item--active` : ``}`}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

CitiesMenu.propTypes = {
  cities: PropTypes.arrayOf(cityPropType.isRequired).isRequired,
  currentCity: cityPropType,
  setCurrentCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: state.cities,
  currentCity: state.currentCity
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentCity(city) {
    dispatch(ActionCreator.setCurrentCity(city));
  },
});

export {CitiesMenu};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesMenu);
