import L from 'leaflet'

const userIcon = require('./../../static/images/icons/animatedPlaceholder.svg')
const djIcon = require('./../../static/images/icons/dj.svg')
const concertIcon = require('./../../static/images/icons/rock.svg')

let mapIcon = L.Icon.extend({
    options: {
        iconSize: [34, 85],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }
});

const markers ={
    userPlaceholder: new mapIcon({iconUrl: userIcon}),
    djPlaceholder: new mapIcon({iconUrl: djIcon}),
    rock: new mapIcon({iconUrl: concertIcon, iconSize: [48, 85]}),
    raca: new mapIcon({iconUrl: concertIcon, iconSize: [48, 85]}),
    generic: new mapIcon({iconUrl: concertIcon, iconSize: [48, 85]}),
}

export default markers