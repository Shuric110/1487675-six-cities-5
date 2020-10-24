import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {offerPropType} from "../../props.js";

import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

const TILE_LAYER_URL_TEMPLATE = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`;
const TILE_LAYER_ATTRIBUTION = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`;

export default class GeoMap extends PureComponent {
  constructor(props) {
    super(props);

    this._mapContainerRef = createRef();
  }

  componentDidMount() {
    const {
      mapCenter: {latitude: centerLatitude, longitude: centerLongitude},
      offerIcon: {url: offerIconUrl, width: offerIconWidth, height: offerIconHeight, anchorLeft: offerIconAnchorLeft, anchorTop: offerIconAnchorTop},
      defaultZoom,
      offers
    } = this.props;

    const mapContainer = this._mapContainerRef.current;

    const offerIcon = leaflet.icon({
      iconUrl: offerIconUrl,
      iconSize: [offerIconWidth, offerIconHeight],
      iconAnchor: [offerIconAnchorLeft, offerIconAnchorTop]
    });

    this._map = leaflet.map(mapContainer, {
      center: [centerLatitude, centerLongitude],
      zoom: defaultZoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(TILE_LAYER_URL_TEMPLATE, {attribution: TILE_LAYER_ATTRIBUTION})
      .addTo(this._map);

    if (offers) {
      offers.forEach(({coordinates: {latitude, longitude}}) => {
        leaflet
         .marker([latitude, longitude], {icon: offerIcon})
         .addTo(this._map);
      });
    }
  }

  componentWillUnmount() {
    this._map.remove();
  }

  render() {
    const {className} = this.props;

    return (
      <section
        className={`${className} map`}
        ref={this._mapContainerRef}
      />);
  }
}

GeoMap.propTypes = {
  className: PropTypes.string.isRequired,
  mapCenter: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  offerIcon: PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    anchorLeft: PropTypes.number.isRequired,
    anchorTop: PropTypes.number.isRequired
  }).isRequired,
  defaultZoom: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropType.isRequired)
};
