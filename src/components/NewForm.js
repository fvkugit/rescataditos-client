import React, { useState, useRef } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import * as yup from 'yup'
import { Formik } from 'formik'
import ImageInput from "./ImageInput";
import axios from 'axios';
import Swal from 'sweetalert2'


const formSchema= yup.object().shape({
    nombre: yup.string().min(3, 'El nombre debe tener 3 caracteres o más').required('Necesitas completar este campo'),
    raza: yup.string().required('Necesitas completar este campo'),
    color: yup.string().required('Necesitas completar este campo'),
    tamanio: yup.string().required('Necesitas completar este campo'),
    vacuna: yup.string().min(3, 'La vacuna debe tener 3 caracteres o más').required('Necesitas completar este campo'),
    fechavacuna: yup.date().required('Necesitas introducir la fecha de la vacuna'),
    descripcion: yup.string().required('Necesitas completar este campo'),
    imagen: yup.mixed().required('Debes subir una imagen')
});

function NewForm() {
    const [ vacunasList, setVacunasList ] = useState([]);
    const [ vacunaSubmited, setVacunaSubmited ] = useState(false);
    const [ formSubmited, setFormSubmited] = useState(false);
    const [ image, setImage ] = useState(false);
    const refVacuna = useRef(null);
    const refVacunaFecha = useRef(null);


    function agregarVacuna(v, vfecha, errors){
        setVacunaSubmited(true)
        if ((errors.vacuna || errors.fechavacuna) || v === '' || vfecha === '') {return}
        const newVacuna = {desc: v, fecha: vfecha, id: new Date().valueOf()}
        setVacunasList([...vacunasList, newVacuna])
        refVacuna.current.value = ''
        refVacunaFecha.current.value = ''
        setVacunaSubmited(false)
    }

    async function enviarFormulario(values, errors){
        var allData = values
        allData.listvacunas = vacunasList 
        allData.imagen = image 

        try{
            const res = await axios.post("http://localhost:3000/api/mascotas", allData)
            Swal.fire({
            icon: 'success',
            title: 'Cambios guardados.',
            text: 'La nueva mascota ha sido creada con exito!',
            })
        }
        catch(e){
            Swal.fire({
                icon: 'error',
                title: 'No se ha podido guardar',
                text: 'Algo ha salido mal, vuelve a intentarlo!',
            })
        }

        setFormSubmited(true)
    }

  return (
    <Container>
        <Formik
      validationSchema={formSchema}
      initialValues={{  
        nombre: '',
        raza: '',
        color: '',
        tamanio: '',
        vacuna: '',
        fechavacuna: '',
        descripcion: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit} className="mt-5">
            <Row>
                <Col sm="8" className="mx-auto">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label className="formulario-label" column sm={4}>
                            Nombre
                        </Form.Label>
                        <Col sm={8} className="my-auto">
                            <Form.Control onBlur={handleBlur} className="formulario-text" name="nombre" onChange={handleChange} type="text" placeholder="Floppy"/>
                        </Col>
                            {(errors.nombre && formSubmited) && <p className="formulario-feedback mx-auto">{errors.nombre}</p>}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label className="formulario-label" column sm={4}>
                            Raza
                        </Form.Label>
                        <Col sm={8} className="my-auto">
                            <Form.Control className="formulario-text" name="raza" onChange={handleChange} type="text" placeholder="Mestizo"/>
                        </Col>
                            {(errors.raza && formSubmited) && <p className="formulario-feedback">{errors.raza}</p>}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label className="formulario-label" column sm={4}>
                            Color
                        </Form.Label>
                        <Col sm={8} className="my-auto">
                            <Form.Control className="formulario-text" name="color" onChange={handleChange} type="text" placeholder="Negro"/>
                        </Col>
                            {(errors.color && formSubmited) && <p className="formulario-feedback">{errors.color}</p>}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label className="formulario-label" column sm={4}>
                            Tamaño
                        </Form.Label>
                        <Col sm={8} className="my-auto">
                            <Form.Control className="formulario-text" name="tamanio" onChange={handleChange} type="text" placeholder="Mediano"/>
                        </Col>
                            {(errors.tamanio && formSubmited) && <p className="formulario-feedback">{errors.tamanio}</p>}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label className="formulario-label" column sm={4}>
                            Imagen
                        </Form.Label>
                        <Col sm={8} className="my-auto">
                            <ImageInput image={image} setImage={setImage} name="imagen" formikChange={handleChange} value={image}/>
                        </Col>
                            {(!image && formSubmited) && <p className="formulario-feedback">Debes subir una imagen</p>}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label className="formulario-label" column sm={4}>
                            Descripcion
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control className="formulario-text" name="descripcion" onChange={handleChange} type="text" as="textarea" placeholder="Datos extra sobre la mascota"/>
                        </Col>
                            {(errors.descripcion && formSubmited) && <p className="formulario-feedback">{errors.descripcion}</p>}
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label className="formulario-label" column sm={4}>
                            Vacunas
                        </Form.Label>
                        <div className="vacunas-lista">
                            {vacunasList.length ?
                                <ul>
                                    {vacunasList.map((vacuna)=>(
                                        <li key={vacuna.id}>{vacuna.desc} - {vacuna.fecha}</li>
                                    ))}
                                </ul>
                                :
                                <p>No hay vacunas cargadas aún.</p>
                            }
                        </div>
                        <Row>
                        <Col xs={6}>
                            <Form.Control className="formulario-text" ref={refVacuna} name="vacuna" onChange={handleChange} type="text" placeholder="Nombre vacuna"/>
                        </Col>
                        <Col xs={6}>
                            <Form.Control type="date" ref={refVacunaFecha} name="fechavacuna" onChange={handleChange} placeholder="Fecha de vacuna" />
                        </Col>
                        <Col xs={12}> 
                            <div className="d-grid gap-2 mt-2 mb-3">
                                <Button onClick={()=>{agregarVacuna(values.vacuna, values.fechavacuna, errors)}}>+</Button>
                                {(vacunaSubmited && (errors.vacuna || errors.fechavacuna)) && <p className="formulario-feedback">{errors.vacuna || errors.fechavacuna}</p>}
                            </div> 
                        </Col>
                                
                        </Row>
                    </Form.Group>
                </Col>
            </Row>
            <div className="d-grid gap-2">
                <Button onClick={() => enviarFormulario(values, errors)}>Guardar mascota</Button>
            </div>
        </Form>
      )}
    </Formik>
    </Container>
  );
}

export default NewForm;
