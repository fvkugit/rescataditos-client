import React, { useState } from 'react'
import { Container, InputGroup, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'


function CodeForm(){
    var localCode = window.localStorage.getItem('editCode') || ''
    const [ code, setCode ] = useState(localCode)

    function guardarCodigo(){
        window.localStorage.setItem('editCode', code);
        Swal.fire({
            icon: 'success',
            title: 'Cambios guardados.',
            text: 'Se guardo el nuevo codigo que introduciste!',
        })
    }

    return(
        <Container>  
            <InputGroup className="mt-5 w-75 mx-auto">
                <Form.Control
                placeholder="Codigo de edición"
                aria-describedby="Insertar aquí el codigo de edición privado"
                value={code}
                onChange={(e)=>{setCode(e.target.value)}}
                />
            </InputGroup>
            <div className="d-grid gap-2 w-75 mx-auto mt-2">
                <Button onClick={() => guardarCodigo()} variant="success" size="lg">
                    Guardar
                </Button>
            </div>
        </Container>
    );
}

export default CodeForm

