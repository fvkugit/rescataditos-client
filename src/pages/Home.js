import React from 'react'
import { FaPaw, FaRegPlusSquare } from 'react-icons/fa'
import MenuBoton from '../components/home/MenuBoton';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom'

function Home(){

    return(
        <>
            <Navbar/>
            <Link to="/lista"><MenuBoton text={'Ver lista'} icon={<FaPaw/>}/></Link>
            <Link to="/mascotas/crear"><MenuBoton text={'Crear nuevo'} icon={<FaRegPlusSquare/>}/></Link>
        </>
    );
}

export default Home