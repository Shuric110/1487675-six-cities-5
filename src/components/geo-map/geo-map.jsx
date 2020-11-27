import React, {useState, useRef, useEffect, useMemo} from "react";
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

const GeoMap = (props) => {
  const {className, mapCenter, zoom, offers, activeOffer} = props;

  const offerIcon = useMemo(() => makeIcon(OFFER_ICON_DEFINITION), []);
  const activeOfferIcon = useMemo(() => makeIcon(ACTIVE_OFFER_ICON_DEFINITION), []);

  const leafletMapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const initialRunRef = useRef(true);

  const [mapMarkers, setMapMarkers] = useState({});
  const [activeMapMarker, setActiveMapMarker] = useState(null);


  useEffect(() => {
    // Инициализация компонента
    leafletMapRef.current = leaflet.map(mapContainerRef.current, {
      center: Object.values(mapCenter),
      zoom: zoom || DEFAULT_ZOOM,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(TILE_LAYER_URL_TEMPLATE, {attribution: TILE_LAYER_ATTRIBUTION})
      .addTo(leafletMapRef.current);

    return () => {
      // Деинициализация компонента
      leafletMapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    // Установка видимой области карты
    if (!initialRunRef.curent) {
      leafletMapRef.current.setView(Object.values(mapCenter), zoom || DEFAULT_ZOOM);
    }
  }, [mapCenter, zoom]);

  useEffect(() => {
    // Синхронизация маркеров
    const newMapMarkers = {};
    const oldMapMarkers = Object.assign({}, mapMarkers);

    if (offers) {
      offers.forEach(({id, coordinates}) => {
        if (oldMapMarkers[id]) {
          newMapMarkers[id] = oldMapMarkers[id];
          oldMapMarkers[id] = false;
        } else {
          const marker = leaflet.marker(Object.values(coordinates), {icon: offerIcon});
          marker.addTo(leafletMapRef.current);
          newMapMarkers[id] = marker;
        }
      });
    }

    Object.values(oldMapMarkers).forEach((marker) => {
      if (marker) {
        marker.remove();
      }
    });

    setMapMarkers(newMapMarkers);

  }, [offers]);

  useEffect(() => {
    // Подсветка маркера активного предложения
    if (activeMapMarker) {
      activeMapMarker.setIcon(offerIcon);
      setActiveMapMarker(null);
    }

    if (activeOffer) {
      const newActiveMapMarker = mapMarkers[activeOffer.id];
      if (newActiveMapMarker) {
        newActiveMapMarker.setIcon(activeOfferIcon);
        setActiveMapMarker(newActiveMapMarker);
      }
    }
  }, [activeOffer]);

  useEffect(() => {
    // Сброс флага начального запуска
    initialRunRef.current = false;
  }, []);

  return (
    <section
      className={`${className} map`}
      ref={mapContainerRef}
    />);
};

GeoMap.propTypes = {
  className: PropTypes.string.isRequired,
  mapCenter: coordinatesPropType.isRequired,
  zoom: PropTypes.number,
  offers: PropTypes.arrayOf(offerPropType.isRequired),
  activeOffer: offerPropType
};

const mapStateToProps = (state) => ({
  activeOffer: state.APP.activeOffer,
});

export {GeoMap};
export default connect(mapStateToProps)(GeoMap);
