import React, { useState } from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
// import SaveIcon from '@material-ui/icons/Save';


import axios from 'axios';

import { API_GET_NEW_ID, API_GET_CLIENTE_CODIGO} from '../../Constantes'




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






export default function TextFields({ handleClose, Ciudades }) {


  const classes = useStyles();
  const [values, setValues] = React.useState({
    currency: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };


  const [cedula, setCedula] = useState('')
  const [primerNombre, setPrimerNombre] = useState('')
  const [segundoNombre, setSegundoNombre] = useState('')
  const [apellidoPaterno, setApellidoPaterno] = useState('')
  const [apellidoMaterno, setApellidoMaterno] = useState('')
  const [telefonoCelular, setTelefonoCelular] = useState('')
  const [direccion, setDireccion] = useState('')
  const [correo, setCorreo] = useState('')



  const currencies = Ciudades

  const cancelar = async e => {
    handleClose(null, false)
  }

  const agregarProducto = async e => {
    e.preventDefault()

 
    axios.get(API_GET_CLIENTE_CODIGO).then(resultado => {


     
      axios.get(API_GET_NEW_ID).then(uuid => {


 
          const datos = {
            'IDCliente': uuid.data
            , 'codigo': resultado.data[0].codigo
            , 'cedula': cedula
            , 'nombre1': primerNombre
            , 'nombre2': segundoNombre
            , 'apellidoPaterno': apellidoPaterno
            , 'apellidoMaterno': apellidoMaterno
            , 'celular': telefonoCelular
            , 'direccion': direccion
            , 'correo': correo
            , 'IDStatus': localStorage.getItem("IDStatusActivo")
            , 'IDCiudad': values.currency
          }
          handleClose(datos, true)


      })
        
    })




  }

  return (
    <form className={classes.container} noValidate autoComplete="off"
      onSubmit={agregarProducto}
    >
      <TextField
        id="standard-uncontrolled"
        required
        label="Cédula"
        defaultValue=""
        className={classes.textFieldCi}
        margin="normal"
        onChange={e => setCedula(e.target.value)}
      />
      <TextField
        id="standard-uncontrolled"
        required
        label="Primer Nombre"
        defaultValue=""
        className={classes.textField}
        margin="normal"
        onChange={e => setPrimerNombre(e.target.value)}
      />

      <TextField
        required
        id="standard-required"
        label="Segundo Nombre"
        defaultValue=""
        className={classes.textField}
        margin="normal"
        onChange={e => setSegundoNombre(e.target.value)}
      />

      <TextField
        id="standard-uncontrolled"
        required
        label="Apellido Paterno"
        defaultValue=""
        className={classes.textField}
        margin="normal"
        onChange={e => setApellidoPaterno(e.target.value)}
      />
      <TextField
        required
        id="standard-required"
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
        defaultValue=""
        className={classes.textField}
        margin="normal"
        onChange={e => setTelefonoCelular(e.target.value)}
      />




      <TextField
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
            <Button onClick={cancelar} color="primary">
              Cancelar
              </Button>
            <Button type="submit" color="primary">
              Guardar
            </Button>
      </DialogActions>

    </form>
  );
}