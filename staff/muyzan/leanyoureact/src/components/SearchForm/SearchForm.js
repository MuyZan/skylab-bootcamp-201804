import React from 'react'
import "./SearchForm.css";

function SearchForm(props){

    

    return (
        <form onSubmit={props._handlerSearchUser}>
            <input className="input" placeholder="Escribe aquí tu maldito usuario" onChange={props._handlerWriteName} value={props.value}/>
            <input className="btn" type="submit" value="¡Qué busques, he dicho!" />
        </form>
    )
}


export default SearchForm