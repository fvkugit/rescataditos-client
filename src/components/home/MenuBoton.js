import React from 'react'

function MenuBoton({icon, text}){

    return(
        <div className="botonMenu">
            <i className="icon">{icon}</i>
            <h2 className="botonTitulo">{text}</h2>
        </div>
    );
}

export default MenuBoton