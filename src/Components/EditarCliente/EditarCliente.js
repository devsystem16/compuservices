import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import SaveIcon from '@material-ui/icons/Save';
import { withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Swal from "sweetalert2";  

import  {API_CLIENTES} from '../../Constantes'
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



 

  function EditarCliente( {cliente , Ciudades , history , setRecargarClientes}) {

   
    const classes = useStyles();

  //  const { cliente , Ciudades , history} = props;



    const currencies = Ciudades

    const [values, setValues] = React.useState({
      currency: cliente[0].IDCiudad 
    });

    const [codigo ,setCodigo]= useState(cliente[0].codigo)
    const [cedula ,setCedula]= useState(cliente[0].cedula)
    const [nombre1 ,setNombre1]= useState(cliente[0].nombre1)
    const [nombre2 ,setNombre2]= useState(cliente[0].nombre2)
    const [apellidoPaterno ,setApellidoPaterno]= useState(cliente[0].apellidoPaterno)
    const [apellidoMaterno ,setApellidoMaterno]= useState(cliente[0].apellidoMaterno)
    const [celular ,setCelular]= useState(cliente[0].celular)
    const [direccion ,setDireccion]= useState(cliente[0].direccion)
    const [correo ,setCorreo]= useState(cliente[0].correo)



    const handleChange = name => event => {

 

      setValues({ ...values, [name]: event.target.value });
    };
 


   function actualizarCliente (event) {
    event.preventDefault();

 
        var cliente  = {
          codigo,
          cedula,
          nombre1,
          nombre2,
          apellidoPaterno,
          apellidoMaterno,
          celular,
          direccion,
          correo,
          IDCiudad: values.currency
        }

        axios.put(`${API_CLIENTES}/${localStorage.getItem('current_IDCLiente')}`  ,cliente ).then(res => {
          setRecargarClientes(true)
          history.push('/clientes')
          Swal.fire({
            title: 'Un momento',
            timer: 1500,
            onBeforeOpen: () => {
              Swal.showLoading()
            },
          })
        })
       
     

        
    }

 
  return (

    <div className="row">
      <div className="col-md-8">
        
   
    <form
  className={classes.container} 
     noValidate autoComplete="off"
   onSubmit={actualizarCliente}
    >
      <TextField
        id="standard-uncontrolled"
        required
        label="Cédula"
        className={classes.textFieldCi}
        margin="normal"
        // value={cliente.cedula}
        defaultValue=  {cliente[0].cedula}
         onChange={e => setCedula(e.target.value)}
        
      />
      <TextField
        id="standard-uncontrolled"
        required
        label="Primer Nombre"
        defaultValue=  {cliente[0].nombre1}
         className={classes.textField}
        margin="normal"
        onChange={e => setNombre1(e.target.value)}
      />

      <TextField
        required
        id="standard-required"
        label="Segundo Nombre"
        defaultValue=  {cliente[0].nombre2}
        className={classes.textField}
        margin="normal"
         onChange={e => setNombre2(e.target.value)}
      />

      <TextField
        id="standard-uncontrolled"
        required
        defaultValue=  {cliente[0].apellidoPaterno}
        label="Apellido Paterno"
    className={classes.textField}
        margin="normal"
         onChange={e => setApellidoPaterno(e.target.value)}
      />
      <TextField
        required
        id="standard-required"
        defaultValue=  {cliente[0].apellidoMaterno}
        label="Apellido Materno"
         className={classes.textField}
        margin="normal"
        onChange={e => setApellidoMaterno(e.target.value)}
      />

      <TextField
        required
        id="standard-required"
        defaultValue=  {cliente[0].celular}
        label="Celular"
        // className={classes.textField}
        margin="normal"
        onChange={e => setCelular(e.target.value)}
      />




<TextField
        id="standard-select-currency-native"
        select
        label=""
        className={classes.textField}
        value={cliente[0].IDCiudad}
        onChange={handleChange('currency')}
        
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Por favor, seleccione una ciudad de residencia."
        margin="normal"
      >
        {currencies.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>


  

      <TextField
        id="standard-full-width"
        label="Direccion"
        defaultValue=  {cliente[0].direccion}
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
        defaultValue=  {cliente[0].correo}
        placeholder="mi-correo@ejemplo.com"
        helperText=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={e => setCorreo(e.target.value)}
      />
 


      <DialogActions className="pull-right">

      <Link to="/clientes">
            <Button   color="primary">
              Cancelar
              </Button>
              </Link>

            <Button type="submit"   color="primary">
              Guardar
            </Button>
      </DialogActions>

    </form>
  
    </div>
    </div>
  );
}

export default withRouter(EditarCliente )