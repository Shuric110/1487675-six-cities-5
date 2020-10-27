import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import {offerPropType, coordinatesPropType} from "../../props.js";


const TILE_LAYER_URL_TEMPLATE = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`;
const TILE_LAYER_ATTRIBUTION = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`;

const OFFER_ICON_DEFINITION = {
  url: `/img/pin.svg`,
  width: 27,
  height: 39,
  anchorLeft: 14,
  anchorTop: 38
};

const ACTIVE_OFFER_ICON_DEFINITION = {
  url: `/img/pin-active.svg`,
  width: 27,
  height: 39,
  anchorLeft: 14,
  anchorTop: 38
};

const DEFAULT_ZOOM = 12;

const makeIcon = (iconDefinition) => {
  const {url, width, height, anchorLeft, anchorTop} = iconDefinition;
  return leaflet.icon({
    iconUrl: url,
    iconSize: [width, height],
    iconAnchor: [anchorLeft, anchorTop]
  });
};

class GeoMap extends PureComponent {
  constructor(props) {
    super(props);

    this._mapContainerRef = createRef();
    this._markers = {};
    this._activeMarker = null;
    this._activeMarkerId = null;
  }

  componentDidMount() {
    const {
      mapCenter: {latitude: centerLatitude, longitude: centerLongitude}
    } = this.props;

    const mapContainer = this._mapContainerRef.current;

    this._offerIcon = makeIcon(OFFER_ICON_DEFINITION);
    this._activeOfferIcon = makeIcon(ACTIVE_OFFER_ICON_DEFINITION);

    this._map = leaflet.map(mapContainer, {
      center: [centerLatitude, centerLongitude],
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(TILE_LAYER_URL_TEMPLATE, {attribution: TILE_LAYER_ATTRIBUTION})
      .addTo(this._map);

    this.updateMap(true);
  }

  componentWillUnmount() {
    this._markers = {};
    this._activeMarker = null;
    this._activeMarkerId = null;
    this._map.remove();
  }

  updateMap(initializing) {
    const {
      mapCenter: {latitude: centerLatitude, longitude: centerLongitude},
      offers
    } = this.props;

    if (!initializing) {
      this._map.setView([centerLatitude, centerLongitude], DEFAULT_ZOOM);
    }

    const newMarkers = {};

    if (offers) {
      offers.forEach(({id, coordinates: {latitude, longitude}}) => {
        if (this._markers[id]) {
          newMarkers[id] = this._markers[id];
          this._markers[id] = false;
        } else {
          const marker = leaflet.marker([latitude, longitude], {icon: this._offerIcon});
          marker.addTo(this._map);
          newMarkers[id] = marker;
        }
      });
    }

    Object.values(this._markers).forEach((marker) => {
      if (marker) {
        marker.remove();
      }
    });

    this._markers = newMarkers;

    if (this._activeMarkerId !== offer.id) {
      if (this._activeMarker) {

      }

      if ()
    }
  }

  render() {
    const {className} = this.props;

    if (this._map) {
      this.updateMap(false);
    }

    return (
      <section
        className={`${className} map`}
        ref={this._mapContainerRef}
      />);
  }
}

GeoMap.propTypes = {
  className: PropTypes.string.isRequired,
  mapCenter: coordinatesPropType.isRequired,
  offers: PropTypes.arrayOf(offerPropType.isRequired),
  activeOffer: offerPropType
};

const mapStateToProps = (state) => ({
  activeOffer: state.activeOffer,
});

export {GeoMap};
export default connect(mapStateToProps)(GeoMap);
