import React from 'react'
import { Link } from 'react-router-dom'
function HeaderLogo(){

    return(
        <Link to="/">
            <h1 className="mt-3 titulo">Rescataditos App</h1>
        </Link>
    );
}

export default HeaderLogo