import {extend} from "../../util";
import {ActionType} from "../action";

const initialOfferDetails = {
  offerId: null,
  offer: null,
  nearestOffers: null,
  reviews: null
};

const initialState = {
  offers: [],
  favorites: null,
  cities: [],
  offerDetails: initialOfferDetails,
};

const appData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INIT_OFFERS:
    {
      const {offers} = action.payload;
      return extend(state, {
        offers,
      });
    }

    case ActionType.INIT_FAVORITES:
    {
      const {favorites} = action.payload;
      return extend(state, {
        favorites,
      });
    }

    case ActionType.INIT_CITIES:
    {
      const {cities} = action.payload;
      return extend(state, {
        cities,
      });
    }

    case ActionType.UPDATE_FAVORITE_OFFER:
    {
      const {id, isFavorite} = action.payload;
      const newState = {};
      const newDetails = {};
      const {
        offers,
        favorites,
        offerDetails: {
          offer: detailsOffer,
          nearestOffers: detailsNearestOffers
        }
      } = state;

      newState.offers = offers.map((offer) => (offer.id !== id ? offer : extend(offer, {isFavorite})));

      if (favorites) {
        newState.favorites = isFavorite ? null :
          favorites.map(({city, offers: favOffers}) => ({
            city,
            offers: favOffers.filter((offer) => offer.id !== id)
          }))
          .filter(({offers: favOffers}) => favOffers.length > 0);
      }

      if (detailsOffer && detailsOffer.id === id) {
        newDetails.offer = extend(detailsOffer, {isFavorite});
      }

      if (detailsNearestOffers && detailsNearestOffers.find(({id: offerId}) => id === offerId)) {
        newDetails.nearestOffers = detailsNearestOffers.map(
            (nearOffer) => nearOffer.id === id ? extend(nearOffer, {isFavorite}) : nearOffer
        );
      }

      if (Object.keys(newDetails).length > 0) {
        newState.offerDetails = extend(state.offerDetails, newDetails);
      }

      return extend(state, newState);
    }

    case ActionType.INIT_OFFER_DETAILS:
    {
      const {offerId} = action.payload;
      return extend(state, {
        offerDetails: extend(initialOfferDetails, {offerId}),
      });
    }

    case ActionType.UPDATE_OFFER_DETAILS:
    {
      const {offerId, details} = action.payload;
      const {offerDetails} = state;

      if (offerDetails.offerId !== offerId) {
        return state;
      }

      return extend(state, {
        offerDetails: extend(offerDetails, details)
      });
    }

  }

  return state;
};

export {appData};
