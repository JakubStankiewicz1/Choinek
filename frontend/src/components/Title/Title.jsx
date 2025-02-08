import React from 'react';
import "./title.css";

const Title = ({ text }) => {
  return (
    <div className="title">

        <h1 className="titleComponentText snowburst-one-regular">{text}</h1>
        
    </div>
  )
}

export default Title