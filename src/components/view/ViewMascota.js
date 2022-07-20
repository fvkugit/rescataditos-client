import React, { useState, useRef, useEffect } from "react";
import { Container, Image, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from 'axios';

function ViewMascota() {
    const [datosMascota, setDatosMascota] = useState()
    const { id } = useParams()
    
    function formatDate(date){
        const fecha = new Date(date)
        return fecha.toLocaleDateString("es-ES")
    }

    useEffect(() => {
      async function getData(){
        const url = `http://localhost:3000/api/mascotas/${id}`
        const res = await axios.get(url)
        setDatosMascota(res.data)
        console.log(res.data)
      }
      getData()
    }, [])
    

  return (
    <Container>
        <Row className="w-75 mx-auto mt-5">
            {datosMascota &&
            <>
                <Col xs={12} className="mascota-data">
                <span className="fuente">Nombre:</span> {datosMascota.nombre}
                </Col>
                <Col xs={12} className="mascota-data">
                <span className="fuente">Raza:</span> {datosMascota.raza}
                </Col>
                <Col xs={12} className="mascota-data">
                <span className="fuente">Color:</span> {datosMascota.color}
                </Col>
                <Col xs={12} className="mascota-data">
                    <span className="fuente">Tamaño:</span> {datosMascota.tamanio}
                </Col>
                <Col xs={12} className="mascota-data">
                    <span className="fuente">Vacunas:</span> 
                    <div className="mascota-data-vacunas">
                        {(datosMascota.vacunas).map((v)=>(
                            <li>{v.nombre} - {formatDate(v.fecha)}</li>
                        ))}
                    </div>
                </Col>
                <Col xs={12} className="mascota-data">
                    <span className="fuente">Descripción:</span> 
                    <p className="descripcion">{datosMascota.descripcion}</p>
                </Col>
                <Col xs={12} className="mascota-data">
                    <span className="fuente">Galeria:</span> 
                    <Row>
                        {(datosMascota.imagenes).map((v)=>(
                            <Col xs={6}>
                                <Image className="ratio ratio-1x1" src={v.imagen}></Image>
                            </Col>
                        ))}
                        
                    </Row>
                </Col>
            </>
            }


        </Row>
    </Container>
  );
}

export default ViewMascota;
