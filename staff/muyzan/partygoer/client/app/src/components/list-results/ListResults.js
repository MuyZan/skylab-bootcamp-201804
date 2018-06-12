import React, { Component } from 'react'
import logic from '../../logic'



class ListResults extends Component {

    constructor() {
        super()

        this.state = {
            events: []
        }
    }

    componentWillMount() {      
        logic.listEvents()
        .then(res => {
            const { data: { data } } = res
            console.log(data)
            this.setState({ events: data })
        })
    }


    render() {
        return (

            <div>
                <h2>Events</h2>
                <ul>{this.state.events.map(event => {
                    return(<li key={event._id}>{event.name}<br/>{event.description}<br/><button>Add Event</button></li>)
                })}
                </ul>
            </div>
        )
    }
}

export default ListResults;


/*


componentDidMount() {
        document.body.style.background = 'white'
      
        logic.listCategories()
            .then(categories => this.setState({ categories }))
    }
    render() {
        return (
            <main>
                <Navbar />
                <h2>These are my categories</h2>
                <ul>{this.state.categories.map(category => {
                    return(<li key={category._id}>{category.name}</li>)
                })}
                </ul>
            </main>
        )
    }
}


*/