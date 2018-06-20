import React from 'react';
import "./MainContent.css";


function MainContent(props){

    let bio = props.data.bio;
    let img = props.data.avatar_url;
    let name = props.data.name;


    

    return (
<div className="container">
        <h1>{name}</h1>
        <h2>{bio}</h2>
        {img && <img src={img}  alt="Github"/>}
      
        
        </div>
    )


}

export default MainContent;