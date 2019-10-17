import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LaptopWindows from '@material-ui/icons/LaptopWindows';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'

import Error from './Components/Error'
import iziToast from "izitoast";
import {API_LOGIN} from './Constantes'

import CircularProgress from '@material-ui/core/CircularProgress';

// function MadeWithLove() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Built with love by the '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Material-UI
//       </Link>
//       {' team.'}
//     </Typography>
//   );
// }
import Axios from 'axios';




const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/fondo.jpeg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: "#CC3333"

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // backgroundColor: "#000000"
  },
}));

function Login(props) {


  const { history } = props;



  const classes = useStyles();

  const [nombreUsuario, setNombreusuario] = useState('')


  const [cargando, setCargando] = useState({display: 'none'})
  const [cargandoPC, setCargandoPC] = useState({display: 'block'})


  const [Password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const login = async e => {
    e.preventDefault()

    setCargando({display: 'block'})
    setCargandoPC({display: 'none'})
    try {

      const response = await Axios.get(`${API_LOGIN}?user=${nombreUsuario}&pass=${Password}`)
 
      if (response.data.code === undefined) {

        localStorage.setItem("usuario" ,JSON.stringify( response.data[0]) )
       console.log("user es ", JSON.parse(localStorage.getItem("usuario")))



        history.push('/menu')
        setError(false)
      } else {


        setCargando({display: 'none'})
        setCargandoPC({display: 'block'})


        iziToast.error({
          title: 'Error',
          message: 'Credenciales incorrectas',
          timeout: 1500,
          position: "topRight"
      });
      }

    } catch (error) {

    }
 
  }





  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LaptopWindows  style={cargandoPC} />
              <CircularProgress style={cargando}   className={classes.progress} />  
          </Avatar>
          <Typography component="h1" variant="h5">
            Compuservices
          </Typography>
          <form className={classes.form} noValidate onSubmit={login}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setNombreusuario(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar contraseña"
            /> */}
             {(error) ? <Error mensaje="Credenciales Incorrectas..!!"></Error> : null}
            
     
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ingresar
            </Button>
          

             
           
            
         
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Olvido su contraseña
                </Link> */}
              </Grid>

            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(Login)