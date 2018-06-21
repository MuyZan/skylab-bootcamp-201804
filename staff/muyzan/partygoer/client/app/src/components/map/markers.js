import L from 'leaflet'

const userIcon = require('./../../static/images/icons/animatedPlaceholder.svg')
const electronic = require('./../../static/images/icons/electronic.svg')
const concert = require('./../../static/images/icons/concert.svg')
const karaoke = require('./../../static/images/icons/karaoke.svg')
const blockparty = require('./../../static/images/icons/blockparty.svg')
const cultural = require('./../../static/images/icons/cultural.svg')
const festival = require('./../../static/images/icons/festival.svg')
const atmosphere = require('./../../static/images/icons/atmosphere.svg')
const generic = require('./../../static/images/icons/generic.svg')

let mapIcon = L.Icon.extend({
    options: {
        iconSize: [34, 85],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }
});

const markers ={
    userPlaceholder: new mapIcon({iconUrl: userIcon}),
    electronic: new mapIcon({iconUrl: electronic}),
    concert: new mapIcon({iconUrl: concert, iconSize: [48, 85]}),
    blockparty: new mapIcon({iconUrl: blockparty, iconSize: [37, 85]}),
    karaoke: new mapIcon({iconUrl: karaoke, iconSize: [38, 85]}),
    festival: new mapIcon({iconUrl: festival, iconSize: [40, 85]}),
    atmosphere: new mapIcon({iconUrl: atmosphere, iconSize: [40, 85]}),
    cultural: new mapIcon({iconUrl: cultural, iconSize: [40, 85]}),
    generic: new mapIcon({iconUrl: generic, iconSize: [48, 85]}),
}

export default markers