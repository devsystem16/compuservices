import React, { useState, useRef } from 'react';
import clsx from 'clsx';

import { withRouter } from 'react-router-dom'

import Swal from "sweetalert2";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import SaveIcon from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import ModalOrden from './ModalOrden'
import iziToast from "izitoast";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { getCurrentDate } from '../../utils'
import { API_GET_NEW_ID, API_GET_ORDEN_CODIGO, API_POST_GUARDAR_ORDEN, API_POST_GUARDAR_ABONO } from "../../Constantes";

const useStyles = makeStyles(theme => ({

  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },



  container: {
    display: 'flex',
    flexWrap: 'wrap',
    // width: '50%'
  },
  textField: {
    marginLeft: theme.spacing(1),

    marginRight: theme.spacing(1),
    width: 250,
  },
  textFieldSalto: {


    marginRight: theme.spacing(-5),
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
    width: 525,
  },

  linea: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(28),
    width: 830,
  },
  textFieldInforme: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 790,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    marginLeft: '5%',
    clear: 'both'
  }
}));



function TextFields({ history, guardarRecargarProductos, tiposEquipos, marcas, ReportClientes, Ciudades, setRecargarClientes, operarios, estadosOrden, garantias, orden }) {


  var datos = ReportClientes;

  const classes = useStyles();



  const [values, setValues] = React.useState({
    currency: '',
  });


  const [objMarcas, setMarcas] = React.useState({
    marcas: '',
  });

  const [objEstadosOrden, setEstadosOrden] = React.useState({
    estadosOrden: '',
  });


  const [objOperarios, setOperarios] = React.useState({
    operarios: '',
  });

  const [objGarantias, setGarantias] = React.useState({
    garantias: '',
  });

  const cambioGarantias = name => event => {
    setGarantias({ ...values, [name]: event.target.value });
  };


  const cambioMarcas = name => event => {
    setMarcas({ ...values, [name]: event.target.value });
  };

  const cambioEstadosOrden = name => event => {
    setEstadosOrden({ ...values, [name]: event.target.value });
  };

  const cambioOperarios = name => event => {
    setOperarios({ ...values, [name]: event.target.value });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };


  const [codigo, setCodigo] = useState('')
  const [primerNombre, setPrimerNombre] = useState('')

  const [banderaModalNuevaOrden, setBanderaModalNuevaOrden] = useState(false)


  // Caluclo valores.

  const [__saldo, __setSaldo] = useState(0)





  const currencies = marcas
  const _tiposEquipos = tiposEquipos
  const _operarios = operarios
  const ordenesStatus = estadosOrden
  const _garantias = garantias



  const [valores, setValores] = useState({ modelo: '', serie: '', accesorios: '', fallas: '', total: '', abono: '', saldo: '', currency: '', informe: '' })


 
   

  const fn_onChange = e => {
    const { name, value } = e.target

 
  //  let regex = new RegExp("^[ñíóáéú a-zA-Z , .]+$")
  var regex  = new RegExp("^[0-9  .]+$")
 
   
    if (e.target.name  === "total"  || e.target.name === "abono") {
 
          for(let i = 0; i <= value.length -1; i++){
              let letra = value[i]
              if(!regex.test(letra ) || !letra === " "){
                      return;
              }
          }
  } 




    setValores({ ...valores, [name]: value })
   


 


      if (e.target.name == "total") {
        const { abono } = valores
        if (abono == "") {
          __setSaldo("$ " + e.target.value)
        } else {
          __setSaldo("$ " + (e.target.value - abono))
        }
      }


      if (e.target.name == "abono") {
        const { total } = valores
        if (total == "") {
          __setSaldo("$ " + e.target.value)
        } else {
          __setSaldo("$ " + (total - e.target.value))
        }
      }

 

    

  }

  const fn_Cancelar = () => {
    history.push('/ordenes')
  }

  const guardarOrden = (e) => {
 
    e.preventDefault();
    const { modelo, serie, accesorios, fallas, total, abono, saldo, informe } = valores
 
    if( values.currency === ""){
      iziToast.error({
        title: 'Campos imcompletos',
        message: 'Seleccione el Tipo de equipo',
        timeout: 2000,
        position: "topRight"
    });
      return
    }
    
    if( objMarcas.marcas === ""){
      iziToast.error({
        title: 'Campos imcompletos',
        message: 'Seleccione la marca del equipo',
        timeout: 2000,
        position: "topRight"
    });
      return
    }
     
    if(objOperarios.operarios === ""){
          iziToast.error({
            title: 'Campos imcompletos',
            message: 'Seleccione quien recibió el equipo',
            timeout: 2000,
            position: "topRight"
        });
          return
    }

   if(objEstadosOrden.estadosOrden === ""){
      iziToast.error({
        title: 'Campos imcompletos',
        message: 'Seleccione el estado de la orden',
        timeout: 2000,
        position: "topRight"
    });
      return
    }

  if(objGarantias.garantias === ""){
      iziToast.error({
        title: 'Campos imcompletos',
        message: 'Seleccione si el equipo aplica garantía',
        timeout: 2000,
        position: "topRight"
    });
      return
    }


    var valorAbono =0;
    if(abono!== ""){
      valorAbono = abono;
    }
  
    Swal.fire({
      title:  'Guardando orden',
      timer: 1500,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    })
 
    axios.get(API_GET_ORDEN_CODIGO).then(nOrden => {

      axios.get(API_GET_NEW_ID).then(uuid => {

     
        const orden = {
          IDOrden: uuid.data
          , numeroOrden: nOrden.data[0].codigo
          , modelo: modelo
          , serie: serie
          , accesorios: accesorios
          , falla: fallas
          , fecha: getCurrentDate('-')
          , total: total
          , informeTecnico: informe
          , IDTipoEquipo: values.currency
          , IDMarca: objMarcas.marcas
          , IDCliente: JSON.parse(localStorage.getItem('currentCliente')).IDCliente
          , IDStatus: localStorage.getItem('IDStatusActivo')
          , IDGarantia: objGarantias.garantias 
          , IDUsuario: objOperarios.operarios
          , IDEstadoOrden: objEstadosOrden.estadosOrden
          , orden_varchar1: ''
          , orden_varchar2: ''
          , orden_entero1: valorAbono
          , orden_entero2: ''
        }
 
        axios.post(API_POST_GUARDAR_ORDEN, orden).then(resp => {
        
          guardarRecargarProductos(true)
          history.push('/ordenes')
          Swal.fire({
            title:  'Un momento',
            timer: 1500,
            onBeforeOpen: () => {
              Swal.showLoading()
            },
          })
        })



      })

    })

 
 
  }



  function SetStatusModal() {
    setBanderaModalNuevaOrden(false)



    setCodigo(JSON.parse(localStorage.getItem('currentCliente')).codigo)
    setPrimerNombre(JSON.parse(localStorage.getItem('currentCliente')).codigo + " | " + JSON.parse(localStorage.getItem('currentCliente')).nombres)

  }

  function SetStatusModalClose() {
    setBanderaModalNuevaOrden(true)
  }

  return (
    <div >

      <h1 className="text-center">ORDEN DE INGRESO DE EQUIPO  </h1>
      <Paper className={classes.root}>

        <InputBase
          className={classes.input}
          // defaultValue={orden.cliente}
          placeholder="Código del cliente"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={primerNombre}

        />

        <Divider className={classes.divider} />
        <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={SetStatusModalClose} >
          <SearchIcon />
        </IconButton>
      </Paper>
       
      <form className={classes.container} onSubmit={guardarOrden}   autoComplete="off">

        <TextField
          id="standard-select-currency"
          select
          label="Tipo de Equipo"
          name="tipoEquipo"
          required
          className={classes.textField}
          value={values.currency}
          onChange={handleChange('currency')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Por favor, seleccione un tipo de equipo"
          margin="normal"
        >
          {_tiposEquipos.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="standard-select-currency"
          select
          required
          label="Marcas"
          className={classes.textField}
          value={objMarcas.marcas}
          onChange={cambioMarcas('marcas')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Por favor, seleccione una marca"
          margin="normal"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="standard-error"
          label="Modelo"
          required
          name="modelo"
         //  defaultValue={orden.modelo}
          value={valores.modelo}
          className={classes.textField}
          margin="normal"
          onChange={fn_onChange}
        />

        <TextField

          id="standard-disabled"
          label="Serie"
          name="serie"
          required
          value={valores.serie}
        //   defaultValue={orden.serie}
          className={classes.textField}
          margin="normal"
          onChange={fn_onChange}
        />

        <TextField
          id="standard-password-input"
          label="Accesorios"
          multiline
          rowsMax="20"
        //   defaultValue={orden.accesorios}
          value={valores.accesorios}
          className={classes.textFieldAll}
          margin="normal"
          name="accesorios"
          onChange={fn_onChange}
        />
        <TextField
          id="standard-password-inputa"
          label="Falla/as"
          name="fallas"
          multiline
         //  defaultValue={orden.falla}
          value={valores.fallas}
          rowsMax="20"
          className={classes.textFieldAll}
          margin="normal"

          onChange={fn_onChange}
        />



        <TextField
          id="standard-sdelect-currency"
          select
          label="Recibido por"
          className={classes.textField}
          required
          value={objOperarios.operarios}
          onChange={cambioOperarios('operarios')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Por favor, seleccione por quien fue recibido el equipo."
          margin="normal"
        >
          {_operarios.map(option => (
            <MenuItem key={option.IDUsuario} value={option.IDUsuario}>
              {`${option.nombre1} ${option.apellidoPaterno}`}
            </MenuItem>
          ))}
        </TextField>



        <TextField
          id="standard-password-inputsa"
          label="Informe Técnico"
          name="informe"
         //  defaultValue={orden.informeTecnico}
          multiline
          // fullWidth
          value={valores.informe}
          rowsMax="20"
          className={classes.textFieldInforme}
          margin="normal"
          onChange={fn_onChange}
        />




        <TextField
          id="standard-dense"
          label="Total $"
          name="total"
          required
       //    defaultValue={orden.total}
          value={valores.total}
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          onChange={fn_onChange}
        // onChange={e => {__setTotal(e.target.value)} }
        />


        <TextField
          id="standard-dense"
          label="Abono  $"
          name="abono"
          value={valores.abono}
        //   defaultValue={orden.abonos}
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          onChange={fn_onChange}
        // onChange={e => {__setAbono(e.target.value)} }
        />
        <TextField
          id="standard-multiline-static"
          label="Saldo"
          name="saldo"
          // value={valores.saldo}
          value={__saldo}
          disabled
          defaultValue="$"
          //  onChange={fn_onChange}
          className={classes.textField}
      //     defaultValue={orden.saldo}
          onChange={e => { __setSaldo(e.target.value) }}
          margin="normal"
        />
        <TextField
          id="standard-select-currencyss"
          select
          required
          label="Estado de la orden."
          className={classes.textField}
          value={objEstadosOrden.estadosOrden}
          onChange={cambioEstadosOrden('estadosOrden')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Por favor, seleccione una marca"
          margin="normal"
        >
          {ordenesStatus.map(option => (
            <MenuItem key={option.IDEstadoOrden} value={option.IDEstadoOrden}>
              {option.descripcion}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currenscy-native"
          select
          label="Aplica Garantía"
          className={classes.textFieldAll}
          required
          value={objGarantias.garantias}
          onChange={cambioGarantias('garantias')}
          SelectProps={{

            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="¿Aplica Garantía?"
          margin="normal"
        >
          {_garantias.map(option => (
            <MenuItem key={option.IDEstadoOrden} value={option.IDGarantia}>
              {option.descripcion}
            </MenuItem>
          ))}
        </TextField>
        <hr  className={classes.linea}/> 
     
      <Button variant="contained" size="small" onClick={fn_Cancelar} className={classes.button}>
        <Cancel className={clsx(classes.leftIcon, classes.iconSmall)} />
        Cancelar
      </Button>

 
      <Button type="submit" variant="contained" size="small" className={classes.button}>
        <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
        Guardar
      </Button>


      </form>

     


      {banderaModalNuevaOrden ? (

        <ModalOrden setOpenProps={banderaModalNuevaOrden}
          handleCloseModalCliente={SetStatusModal}
          ReportClientes={datos} Ciudades={Ciudades}
          setRecargarClientes={setRecargarClientes}

        />
      ) : (
          <div></div>
        )}

    </div>
  );
}

export default withRouter(TextFields)