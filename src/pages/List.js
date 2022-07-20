import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom'

function List() {
  const { REACT_APP_LISTA } = process.env;
  const [mascotas, setMascotas] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(REACT_APP_LISTA);
        setMascotas(res.data.result);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, [REACT_APP_LISTA]);

  return (
    <>
      <Navbar />
      <Container>
        <Row>
          {mascotas ? (
            mascotas.map((mascota) => (
              <Col key={mascota.id_mascota} xs="12" md="6" lg="4" xl="3">
                <Link className="mascota-caja" to={`/mascotas/${mascota.id_mascota}`}>
                  <div className="item">
                    <div className="imagen ratio ratio-1x1">
                      <img src={mascota.imagenes[0].imagen} alt="" />
                    </div>
                    <div className="desc">
                      <p className="item-nombre">{mascota.nombre}</p>
                      <p>{mascota.raza} - {mascota.color}</p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))
          ) : (
            <h2> No hay mascotas en la base de datos </h2>
          )}
        </Row>
      </Container>
    </>
  );
}

export default List;
