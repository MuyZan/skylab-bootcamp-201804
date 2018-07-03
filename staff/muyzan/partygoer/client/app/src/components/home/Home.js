import React, { Component } from 'react'
import logic from '../../logic'
import ListResults from '../list-results/ListResults'




class Home extends Component {

    constructor() {
        super()

        this.state = {
            search: false
        }
    }

    _handlerSearch = () => {

           this.setState({ search: true})
    }

    render() {
        return (
            <div>
                <button onClick={this._handlerSearch}>LIST EVENTS</button>
                {this.state.search === true ?
                <ListResults _events={this.state.events}/>
                :
                ""
            }
            </div>

        )

    }
}

export default Home;