import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { API_GET_NEW_ID, API_USUARIO } from '../../Constantes'
import { withRouter } from 'react-router-dom'

import MenuItem from '@material-ui/core/MenuItem';

import Swal from "sweetalert2";
import iziToast from "izitoast";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
  textFieldCi: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  textFieldAll: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 530,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));


function NuevoUsuario({ history, fn_cerrarModal, open, fn_cerrarModalNuevoUsuario, title, roles, cargarUsuarios }) {

  const classes = useStyles();



  const [cedula, setCedula] = useState('')
  const [primerNombre, setPrimerNombre] = useState('')
  const [segundoNombre, setSegundoNombre] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [telefonoCelular, setTelefonoCelular] = useState('')
  const [direccion, setDireccion] = useState('')
  const [correo, setCorreo] = useState('')
  const [usuario, setUsuario] = useState('')
  const [constraseña, setContraseña] = useState('')
  const [confirmarConstraseña, setConfirmarConstraseña] = useState('')

  const currencies = roles

  const [values, setValues] = React.useState({
    currency: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const agregarUsuario = async e => {
    e.preventDefault()


    if (values.currency === "") {
      iziToast.error({
        title: 'Campos imcompletos',
        message: 'Seleccione el tipo de usuario',
        timeout: 2000,
        position: "topRight"
      });
      return
    }


    fn_cerrarModal(false)

    Swal.fire({
      title: 'Un momento',
      timer: 1500,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    })

 

    axios.get(API_GET_NEW_ID).then(uuid => {

      const datos = {
        'IDUsuario': uuid.data
        , 'cedula': cedula
        , 'nombre1': primerNombre
        , 'nombre2': segundoNombre
        , 'apellidoPaterno': apellidoPaterno
        , 'apellidoMaterno': apellidoMaterno
        , 'celular': telefonoCelular
        , 'direccion': direccion
        , 'correo': correo
        , 'IDStatus': localStorage.getItem("IDStatusActivo")
        , 'nick': usuario
        , 'pass': constraseña
        , 'IDRol': values.currency
      }


      axios.post(API_USUARIO, datos).then(response => {
        console.log("Guardar usuario", response.data)
        cargarUsuarios(true);
        history.push("/usuarios")
        limpiarCampos()

      })




    })


  }

  function limpiarCampos() {
    setCedula('')
    setPrimerNombre('')
    setSegundoNombre('')
    setApellidoPaterno('')
    setApellidoMaterno('')
    setTelefonoCelular('')
    setDireccion('')
    setCorreo('')
    setUsuario('')
    setContraseña('')
    setConfirmarConstraseña('')
  }
  function Cerrar() {
    fn_cerrarModalNuevoUsuario(false)
    limpiarCampos()
  }


  // useEffect(()=> {
  //   console.log('paso por aqui')
  //   setCedula('')
  // })

  return (

    <div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={Cerrar}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

            {/* ///////////////////////////////////////////////// */}

            <form className={classes.container} autoComplete="off" onSubmit={agregarUsuario}>

              <TextField
                id="standard-uncontrolled"
                required
                label="Cédula"
                value={cedula}
                className={classes.textFieldCi}
                margin="normal"
                onChange={e => setCedula(e.target.value)}
              />
              <TextField
                id="standard-uncontrolled"
                required
                label="Primer Nombre"
                defaultValue=""
                value={primerNombre}
                className={classes.textField}
                margin="normal"
                onChange={e => setPrimerNombre(e.target.value)}
              />

              <TextField
                required
                id="standard-required"
                label="Segundo Nombre"
                value={segundoNombre}
                defaultValue=""
                className={classes.textField}
                margin="normal"
                onChange={e => setSegundoNombre(e.target.value)}
              />

              <TextField
                id="standard-uncontrolled"
                required
                value={apellidoPaterno}
                label="Apellido Paterno"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                onChange={e => setApellidoPaterno(e.target.value)}
              />
              <TextField
                required
                id="standard-required"
                value={apellidoMaterno}
                label="Apellido Materno"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                onChange={e => setApellidoMaterno(e.target.value)}
              />

              <TextField
                required
                id="standard-required"
                label="Teléfono Celular"
                value={telefonoCelular}
                defaultValue=""
                className={classes.textField}
                margin="normal"
                onChange={e => setTelefonoCelular(e.target.value)}
              />



              <TextField
                id="standard-select-currency"
                select

                label="Tipo de usuairo"
                className={classes.textField}
                value={values.currency}
                onChange={handleChange('currency')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Por favor, seleccione el tipo de usuario"
                margin="normal"
              >
                {currencies.map(option => (
                  <MenuItem key={option.IDRol} value={option.IDRol}>
                    {option.descripcion}
                  </MenuItem>
                ))}
              </TextField>


              {/* <TextField
                id="standard-select-currency-native"
                select
                label=""
                className={classes.textField}
                value={values.currency}
                onChange={handleChange('currency')}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Por favor, seleccione el rol del usuario."
                margin="normal"
              >
                {currencies.map(option => (
                  <option key={option.IDRol} value={option.IDRol}>
                    {option.descripcion}
                  </option>
                ))}
              </TextField> */}




              <TextField
                id="standard-full-width"
                label="Direccion"
                value={direccion}
                placeholder="Dirección Domiciliaria"
                helperText=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => setDireccion(e.target.value)}
              />




              <TextField
                id="standard-full-width"
                label="Correo Electronico"
                value={correo}
                placeholder="mi-correo@ejemplo.com"
                helperText=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => setCorreo(e.target.value)}
              />



              <TextField
                id="standard-uncontrolled"
                required
                value={usuario}
                label="Usuario"
                defaultValue=""
                className={classes.textFieldCi}
                margin="normal"
                helperText="Nick con el cual iniciará sesión"
                onChange={e => setUsuario(e.target.value)}
              />


              <TextField
                required
                id="standard-required"
                label="Contraseña"
                value={constraseña}
                defaultValue=""
                className={classes.textField}
                margin="normal"
                onChange={e => setContraseña(e.target.value)}
              />



              <TextField
                required
                id="standard-required"
                label="Confirmar Contraseña"
                defaultValue=""
                value={confirmarConstraseña}
                className={classes.textField}
                margin="normal"
                onChange={e => setConfirmarConstraseña(e.target.value)}
              />


              <DialogActions>
                <Button onClick={Cerrar} color="primary">
                  Cancelar
            </Button>
                <Button type="submit" color="primary">
                  Guardar
            </Button>
              </DialogActions>


            </form>















          </DialogContentText>
        </DialogContent>

      </Dialog>
    </div>
  )
}
export default withRouter(NuevoUsuario)
