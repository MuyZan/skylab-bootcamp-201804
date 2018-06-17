'use strict'

import L from 'leaflet'

/**TODO: REFACTOR */

const markers = {

    userPlaceholder: new L.icon({
        iconUrl: require('./../../static/images/icons/animatedPlaceholder.svg'),
        iconSize: [34, 85],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }),

    djPlaceholder: new L.icon({
        iconUrl: require('./../../static/images/icons/dj.svg'),
        iconSize: [34, 85],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }),

    rock: new L.icon({
        iconUrl: require('./../../static/images/icons/rock.svg'),
        iconSize: [48, 85],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }),

    raca: new L.icon({
        iconUrl: require('./../../static/images/icons/rock.svg'),
        iconSize: [48, 85],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }),

    generic: new L.icon({
        iconUrl: require('./../../static/images/icons/rock.svg'),
        iconSize: [48, 85],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    })




}

export default markers