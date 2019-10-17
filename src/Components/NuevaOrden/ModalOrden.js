import React  ,{useState} from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

// import TextField from '@material-ui/core/TextField';
import axios from 'axios';
// import { withStyles } from '@material-ui/core/styles';

import Formulario from './Formulario'





import Clientes from  '../Clientes'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

 




function ModalOrden({ setOpenProps, handleCloseModalCliente, Ciudades, setRecargarClientes,  ReportClientes }) {
    // const [open, setOpen] = React.useState(setOpenProps);

    const [maxWidth, setMaxWidth] = React.useState('xl');

   


    function handleClose(datos, guardar) {


        try {

            // if (guardar) {
            //     axios.post("http://127.0.0.1:8000/api/cliente",datos
            //     ).then(res => {
            //         setRecargarClientes(true)
            //     })
                
            // }

            handleCloseModalCliente(false)

        } catch (error) {
            handleCloseModalCliente(false)
        }



    }


    return (

        <div>

            <Dialog 
             maxWidth= "xl"
                open={setOpenProps}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {/* <div className="title-cliente"> Nuevo Cliente </div> */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">

                    <Clientes ReportClientes={ReportClientes} Ciudades={Ciudades}
                                        setRecargarClientes={setRecargarClientes}
                                        titulo="Seleccione un cliente"
                                        handleCloseModalCliente= {handleCloseModalCliente}
                                        btnEditar={false}
                                        btnELiminar={false}
                                        btnSeleccionar={true}
                                        btnNuevoCliente ={true}

                                    ></Clientes>


                    </DialogContentText>
                </DialogContent>



            </Dialog>
        </div>
    );
}


export default (ModalOrden);