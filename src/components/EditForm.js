import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Form,
  Col,
  Row,
  Button,
  Image,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import ImageInput from "./ImageInput";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const formSchema = yup.object().shape({
  nombre: yup
    .string()
    .min(3, "El nombre debe tener 3 caracteres o más")
    .required("Necesitas completar este campo"),
  raza: yup.string().required("Necesitas completar este campo"),
  color: yup.string().required("Necesitas completar este campo"),
  tamanio: yup.string().required("Necesitas completar este campo"),
  vacuna: yup
    .string()
    .min(3, "La vacuna debe tener 3 caracteres o más")
    .required("Necesitas completar este campo"),
  fechavacuna: yup
    .date()
    .required("Necesitas introducir la fecha de la vacuna"),
  descripcion: yup.string().required("Necesitas completar este campo"),
  imagen: yup.mixed().required("Debes subir una imagen"),
});

function EditForm() {
  const { id } = useParams();
  const [datosMascota, setDatosMascota] = useState();
  const [vacunasList, setVacunasList] = useState([]);
  const [vacunaSubmited, setVacunaSubmited] = useState(false);
  const [formSubmited, setFormSubmited] = useState(false);
  const [image, setImage] = useState(false);
  const refVacuna = useRef(null);
  const refVacunaFecha = useRef(null);
  const { REACT_APP_MASCOTAS, REACT_APP_VACUNAS, REACT_APP_IMAGENES } = process.env
  const navigate = useNavigate()

  async function getData() {
    const url = `${REACT_APP_MASCOTAS}/${id}`;
    const res = await axios.get(url);
    setDatosMascota(res.data);
  }
  useEffect(() => {
    getData();
  }, []);

  async function removerVacuna(id) {
    var reqData = {};
    reqData.editCode = window.localStorage.getItem("editCode") || "";

    try {
      await axios.delete(
        `${REACT_APP_VACUNAS}/${id}`,
        { data: reqData }
      );
      var newLista = vacunasList.filter(function (value, index, arr) {
        return value.id !== id;
      });
    } catch (e) {
      console.log(e);
    }
    getData()
    setVacunasList(newLista);
  }

  async function agregarVacuna(v, vfecha, errors) {
    setVacunaSubmited(true);
    if (errors.vacuna || errors.fechavacuna || v === "" || vfecha === "") {
      return;
    }
    try {
      var data = { vacuna: v, fecha: vfecha, id_mascota: id };
      data.editCode = window.localStorage.getItem("editCode") || "";
      await axios.post(`${REACT_APP_VACUNAS}`, data);
    } catch (e) {
      console.log(e);
    }
    const newVacuna = { desc: v, fecha: vfecha, id: new Date().valueOf() };
    setVacunasList([...vacunasList, newVacuna]);
    refVacuna.current.value = "";
    refVacunaFecha.current.value = "";
    setVacunaSubmited(false);
    getData();
  }

  function formatDate(date) {
    const fecha = new Date(date);
    return fecha.toLocaleDateString("es-ES");
  }

  async function enviarFormulario(values, errors) {
    setFormSubmited(true);
    console.log(errors);
    if (
      errors.nombre ||
      errors.color ||
      errors.raza ||
      errors.descripcion
    ) {
      return;
    }
    var allData = values;
    allData.listvacunas = vacunasList;
    allData.imagen = image;
    allData.editCode = window.localStorage.getItem("editCode") || "";

    try {
      await axios.put(
        `${REACT_APP_MASCOTAS}/${id}`,
        allData
      );
      Swal.fire({
        icon: "success",
        title: "Cambios guardados.",
        text: "Los datos de la mascota fueron actualizados!",
      });
    } catch (e) {
      const errorData = e.response.data;
      const errorMessage = errorData
        ? errorData.message
        : "Algo ha salido mal, vuelve a intentarlo!";
      Swal.fire({
        icon: "error",
        title: "No se ha podido guardar",
        text: errorMessage,
      });
    }
  }

  async function eliminarMascota(){
    var reqData = {};
    reqData.editCode = window.localStorage.getItem("editCode") || "";

    try{
        await axios.delete(`${REACT_APP_MASCOTAS}/${id}`, {data: reqData})
        Swal.fire({
            icon: "success",
            title: "Cambios guardados.",
            text: "La mascota ha sido eliminada del sistema!",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/lista')
            }
          })
    }
    catch(e){
        const errorData = e.response.data;
        const errorMessage = errorData
          ? errorData.message
          : "Algo ha salido mal, vuelve a intentarlo!";
        Swal.fire({
          icon: "error",
          title: "No se ha podido guardar",
          text: errorMessage,
        });
    }
  }

  async function eliminarImagen(id) {
    var reqData = {};
    reqData.editCode = window.localStorage.getItem("editCode") || "";
    try {
      await axios.delete(`${REACT_APP_IMAGENES}/${id}`, {
        data: reqData,
      });
      Swal.fire({
        icon: "success",
        title: "Cambios guardados.",
        text: "La imagen ha sido eliminada con exito!",
      });
      getData()
    } catch (e) {
      const errorData = e.response.data;
      const errorMessage = errorData
        ? errorData.message
        : "Algo ha salido mal, vuelve a intentarlo!";
      Swal.fire({
        icon: "error",
        title: "No se ha podido guardar",
        text: errorMessage,
      });
    }
  }

  async function subirImagen() {
    var reqData = {
      id_mascota: id,
      image: image,
    };
    reqData.editCode = window.localStorage.getItem("editCode") || "";
    try {
      await axios.post(`${REACT_APP_IMAGENES}/cargar`, reqData);
      Swal.fire({
        icon: "success",
        title: "Cambios guardados.",
        text: "La imagen ha sido cargada con exito!",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    } catch (e) {
      const errorData = e.response.data;
      const errorMessage = errorData
        ? errorData.message
        : "Algo ha salido mal, vuelve a intentarlo!";
      Swal.fire({
        icon: "error",
        title: "No se ha podido guardar",
        text: errorMessage,
      });
    }
  }

  return (
    <Container>
      {datosMascota ? (
        <Formik
          validationSchema={formSchema}
          initialValues={{
            nombre: datosMascota.nombre || "",
            raza: datosMascota.raza || "",
            color: datosMascota.color || "",
            tamanio: datosMascota.tamanio || "",
            vacuna: "",
            fechavacuna: "",
            descripcion: datosMascota.descripcion || "",
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
                      <Form.Control
                        onBlur={handleBlur}
                        defaultValue={datosMascota.nombre}
                        className="formulario-text"
                        name="nombre"
                        onChange={handleChange}
                        type="text"
                        placeholder="Floppy"
                      />
                    </Col>
                    {errors.nombre && formSubmited && (
                      <p className="formulario-feedback mx-auto">
                        {errors.nombre}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="formulario-label" column sm={4}>
                      Raza
                    </Form.Label>
                    <Col sm={8} className="my-auto">
                      <Form.Control
                        className="formulario-text"
                        defaultValue={datosMascota.raza}
                        name="raza"
                        onChange={handleChange}
                        type="text"
                        placeholder="Mestizo"
                      />
                    </Col>
                    {errors.raza && formSubmited && (
                      <p className="formulario-feedback">{errors.raza}</p>
                    )}
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="formulario-label" column sm={4}>
                      Color
                    </Form.Label>
                    <Col sm={8} className="my-auto">
                      <Form.Control
                        className="formulario-text"
                        defaultValue={datosMascota.color}
                        name="color"
                        onChange={handleChange}
                        type="text"
                        placeholder="Negro"
                      />
                    </Col>
                    {errors.color && formSubmited && (
                      <p className="formulario-feedback">{errors.color}</p>
                    )}
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="formulario-label" column sm={4}>
                      Tamaño
                    </Form.Label>
                    <Col sm={8} className="my-auto">
                      <Form.Control
                        className="formulario-text"
                        defaultValue={datosMascota.tamanio}
                        name="tamanio"
                        onChange={handleChange}
                        type="text"
                        placeholder="Mediano"
                      />
                    </Col>
                    {errors.tamanio && formSubmited && (
                      <p className="formulario-feedback">{errors.tamanio}</p>
                    )}
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="formulario-label" column sm={4}>
                      Imagenes
                    </Form.Label>
                    <Col xs={12} className="mascota-data">
                      <Row>
                        {datosMascota.imagenes.map((v) => (
                          <Col key={v.id_imagen} xs={4}>
                            <OverlayTrigger
                              trigger="click"
                              placement="top"
                              overlay={
                                <Popover>
                                  <Popover.Header as="h3">
                                    <Button
                                      onClick={() => {
                                        eliminarImagen(v.id_imagen);
                                      }}
                                      variant="danger"
                                      size="sm"
                                    >
                                      <FaTrashAlt />
                                    </Button>
                                  </Popover.Header>
                                </Popover>
                              }
                            >
                              <Image
                                className="ratio ratio-1x1 galeria-imagen mt-3"
                                src={v.imagen}
                              ></Image>
                            </OverlayTrigger>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                    <Row className="mt-3">
                        <Form.Label className="formulario-label" column sm={4}>
                        Subir nueva
                        </Form.Label>
                        <Col sm={8} className="my-auto">
                        <ImageInput
                            image={image}
                            setImage={setImage}
                            name="imagen"
                            formikChange={handleChange}
                            value={image}
                        />
                        </Col>
                    </Row>
                    <div className="d-grid gap-2 mt-2 mb-3">
                      <Button
                        onClick={() => {
                          subirImagen();
                        }}
                      >
                        Cargar imagen
                      </Button>
                    </div>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="formulario-label" column sm={4}>
                      Descripcion
                    </Form.Label>
                    <Col sm={12}>
                      <Form.Control
                        className="formulario-text"
                        defaultValue={datosMascota.descripcion}
                        name="descripcion"
                        onChange={handleChange}
                        type="text"
                        as="textarea"
                        placeholder="Datos extra sobre la mascota"
                      />
                    </Col>
                    {errors.descripcion && formSubmited && (
                      <p className="formulario-feedback">
                        {errors.descripcion}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label className="formulario-label" column sm={4}>
                      Vacunas
                    </Form.Label>
                    <div className="vacunas-lista">
                      {datosMascota.vacunas.length ? (
                        <ul>
                          {datosMascota.vacunas.map((vacuna) => (
                            <li key={vacuna.id_vacuna}>
                              {vacuna.nombre} - {formatDate(vacuna.fecha)}
                              <Button
                                onClick={() => {
                                  removerVacuna(vacuna.id_vacuna);
                                }}
                                className="ms-2"
                                variant="danger"
                                size="sm"
                              >
                                <FaTrashAlt />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No hay vacunas cargadas aún.</p>
                      )}
                    </div>
                    <Row>
                      <Col xs={6}>
                        <Form.Control
                          className="formulario-text"
                          ref={refVacuna}
                          name="vacuna"
                          onChange={handleChange}
                          type="text"
                          placeholder="Nombre vacuna"
                        />
                      </Col>
                      <Col xs={6}>
                        <Form.Control
                          className="formulario-text"
                          type="date"
                          ref={refVacunaFecha}
                          name="fechavacuna"
                          onChange={handleChange}
                          placeholder="Fecha de vacuna"
                        />
                      </Col>
                      <Col xs={12}>
                        <div className="d-grid gap-2 mt-2 mb-3">
                          <Button
                            onClick={() => {
                              agregarVacuna(
                                values.vacuna,
                                values.fechavacuna,
                                errors
                              );
                            }}
                          >
                            +
                          </Button>
                          {vacunaSubmited &&
                            (errors.vacuna || errors.fechavacuna) && (
                              <p className="formulario-feedback">
                                {errors.vacuna || errors.fechavacuna}
                              </p>
                            )}
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-grid gap-2 mb-3">
                <Button onClick={() => enviarFormulario(values, errors)}>
                  Guardar mascota
                </Button>
              </div>
              <div className="d-grid gap-2 mb-5">
                <Button variant="danger" onClick={() => eliminarMascota()}>
                  Eliminar mascota
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <h1>Cargando información.</h1>
      )}
    </Container>
  );
}

export default EditForm;
