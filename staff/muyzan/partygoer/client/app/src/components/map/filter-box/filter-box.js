import React, { Component } from 'react'
import logic from '../../../logic'
import markers from './../markers'

const { userPlaceholder, djPlaceholder, rock, raca, generic } = markers



export default class Filterbox extends Component {

render


}


<section id="section-filter">
{eventTypes !== null && eventTypesDisplay !== null ?
    Object.keys(eventTypes).map((eventTypeId) =>
        <div key={eventTypeId} onClick={() => this.filterEvents(eventTypeId)} className={eventTypesDisplay[eventTypeId] === true ? "filter nonSelected" : "filter"}>
            <img alt={eventTypes[eventTypeId]} className="filter-icon" src={this.setFilterIcon(eventTypeId)} placeholder={eventTypes[eventTypeId]} />
            <span className="filter-text ">{eventTypes[eventTypeId]}</span>
        </div>
    )
    :
    ""
}
<div onClick={() => this.setAll()} className={allButton === true ? "filter" : "filter nonSelected"}>
    <img alt="" className="filter-icon" src="" placeholder="" />
    <span className="filter-text ">All Event Types</span>
</div>

</section>





