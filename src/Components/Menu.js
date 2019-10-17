import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Container from '@material-ui/core/Container';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'

import Ordenes from './Ordenes'
import Clientes from './Clientes'
import Usuarios from './usuarios'

import OrdenesGarantia from './OrdenesGarantia'

import FRM from './NuevaOrden/Formulario'
import EditarOrden from './NuevaOrden/FormularioEditar'

import EditarCliente from './EditarCliente/EditarCliente'

import axios from 'axios';


import EditarUsuario from './usuarios/EditarUsuario'


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import PeopleAlt from '@material-ui/icons/NaturePeopleOutlined';

import AssignmentIcon from '@material-ui/icons/Assignment';


import { API_GE_ROL, API_GET_LISTADO_USUARIOS_ROL, API_MARCA, API_REPORTE_ORDENES, ROL_ADMINISTRADOR, API_TIPO_EQUIPO, API_STATUS, API_CLIENTES, API_CIUDAD, API_GET_GARANTIAS, API_CLIENTES_DESCONCATENADO, API_GET_ESTADOS_ORDEN, API_GET_TECNICOS_ADMINISTRADORES } from '../Constantes'


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    linkPanel: {
        textDecoration: 'none',
        color: 'black'
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function Menu(props) {



    const { history } = props;

    const classes = useStyles();
    const [open, setOpen] = useState(true);



    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    const [Reporteordenes, setReporteOrdenes] = useState([])
    const [ReportClientes, setReportClientes] = useState([])
    const [ReportClientesSinFiltro, setReportClientesSF] = useState([])



    const [Ciudades, setCiudades] = useState([])
    const [tiposEquipos, setTiposEquipos] = useState([])
    const [marcas, setMarcas] = useState([])
    const [operarios, setOperarios] = useState([])

    const [usuarios, setUsuarios] = useState([])
    const [recargarUsuarios, setRecargarUsuario] = useState(true)
    const [roles, setRoles] = useState([])



    const [recargarProductos, guardarRecargarProductos] = useState(true)
    const [recargarClientes, setRecargarClientes] = useState(true)

    const [recargarCombos, setRecargarCombos] = useState(true)


    const [estadosOrden, setEstadosOrden] = useState([])
    const [garantias, setGarantias] = useState([])

    function onLogout() {
        localStorage.removeItem('usuario')
        history.push('/login')
    }


    if (JSON.parse(localStorage.getItem('usuario')) === null) {
        history.push('/login')
    }



    useEffect(() => {



       


        if (recargarCombos) {

            const getGarantias = async () => {
                const resultado = await axios.get(API_GET_GARANTIAS)
                setGarantias(resultado.data)

            }
            getGarantias()

            const getEstadosOrden = async () => {
                const resultado = await axios.get(API_GET_ESTADOS_ORDEN)
                setEstadosOrden(resultado.data)

            }
            getEstadosOrden()

            const getMarcas = async () => {
                const resultado = await axios.get(API_MARCA)
                setMarcas(resultado.data)

            }
            getMarcas()

            const getTiposEquipo = async () => {
                const resultado = await axios.get(API_TIPO_EQUIPO)
                setTiposEquipos(resultado.data)

            }
            getTiposEquipo()


            const getTecnicosYAdministradores = async () => {
                const resultado = await axios.get(API_GET_TECNICOS_ADMINISTRADORES)
                setOperarios(resultado.data)

            }
            getTecnicosYAdministradores()

            const Getciudades = async () => {
                const resultado = await axios.get(API_CIUDAD)
                setCiudades(resultado.data)

            }
            Getciudades()


            setRecargarCombos(false)
        }




        const GetStatus = async () => {
            const resultado = await axios.get(`${API_STATUS}/Activo`)
            localStorage.setItem("IDStatusActivo", resultado.data.IDStatus)

            const resultado1 = await axios.get(`${API_STATUS}/Inactivo`)
            localStorage.setItem("IDStatusInactivo", resultado1.data.IDStatus)

        }
        GetStatus()





        if (recargarUsuarios) {


            const consultarUsuarios = async () => {
                const listaUsuarios = await axios.get(API_GET_LISTADO_USUARIOS_ROL)
                console.log("Recargar Usuairos", listaUsuarios.data)
                setUsuarios(listaUsuarios.data)

            }
            const consultarRoles = async () => {
                const listaRoles = await axios.get(API_GE_ROL)
                setRoles(listaRoles.data)

            }


            consultarRoles()
            consultarUsuarios()
            setRecargarUsuario(false)

        }

        if (recargarProductos) {
            if (window.innerWidth <= 800) {
                setOpen(false);
            }

            const consultarApi = async () => {
                console.log(API_REPORTE_ORDENES)
                const resultado = await axios.get(API_REPORTE_ORDENES)
                // console.log("datos del reporte" , resultado.data)
                setReporteOrdenes(resultado.data)
            }
            consultarApi()
            guardarRecargarProductos(false)
        }


        if (recargarClientes) {


            const consultarApiClientes = async () => {
                const resultado = await axios.get(API_CLIENTES)



                setReportClientesSF(resultado.data)


                var reporteClientes = []
                resultado.data.filter(cliente => {
                    var unCliente = {
                        IDCliente: cliente.IDCliente
                        , codigo: cliente.codigo
                        , cedula: cliente.cedula
                        , nombres: cliente.nombre1 + " " + cliente.nombre2 + " " + cliente.apellidoPaterno + " " + cliente.apellidoMaterno
                        , celular: cliente.celular
                        , direccion: cliente.direccion
                        , correo: cliente.correo
                        , ciudad: cliente.ciudad
                    }
                    reporteClientes.push(unCliente)
                })
                setReportClientes(reporteClientes)
            }



            consultarApiClientes()
            setRecargarClientes(false)
        }



    }, [recargarProductos, recargarClientes, recargarUsuarios])

    if (JSON.parse(localStorage.getItem('usuario')) === null) {

        return <div></div>
    }
    else {



        return (

            <Router>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                        <Toolbar className={classes.toolbar}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={handleDrawerOpen}
                                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                                Compuservices
                             </Typography>
                            <IconButton color="inherit">

                                {/* Bienvenido  {`${JSON.parse(localStorage.getItem('usuario')).rol}  ${JSON.parse(localStorage.getItem('usuario')).nombre1} `}  */}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                        }}
                        open={open}
                    >

                        <div className={classes.toolbarIcon}>
                            <strong>  {
                                ` ${JSON.parse(localStorage.getItem('usuario')).rol}  ${JSON.parse(localStorage.getItem('usuario')).nombre1} `
                            } </strong>
                            <IconButton onClick={handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>





                            <div>
                                <Link to="/ordenes" className={classes.linkPanel} >
                                    <ListItem button>
                                        <ListItemIcon>
                                            <ShoppingCartIcon />
                                        </ListItemIcon>

                                        <ListItemText primary="Ordenes" />

                                    </ListItem>

                                </Link>

                                <Link to="/clientes" className={classes.linkPanel}  >
                                    <ListItem button>
                                        <ListItemIcon>
                                            <PeopleIcon />
                                        </ListItemIcon>

                                        <ListItemText primary="Clientes" />

                                    </ListItem>
                                </Link>

                                <Link to="/usuarios" className={classes.linkPanel}  >
                                    <ListItem button>
                                        <ListItemIcon>
                                            <PeopleAlt />
                                        </ListItemIcon>

                                        <ListItemText primary="Usuarios" />

                                    </ListItem>
                                </Link>
                                <Link to="/ordenesgarantia" className={classes.linkPanel}  >
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AssignmentIcon />
                                        </ListItemIcon>

                                        <ListItemText primary="Garantia" />

                                    </ListItem>
                                </Link>




                                <ListItem button onClick={onLogout}>
                                    <ListItemIcon>
                                        <KeyboardReturn />
                                    </ListItemIcon>
                                    <ListItemText primary="Salir" />
                                </ListItem>
                            </div>




                        </List>
                        <Divider />

                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>


                            <Switch>
                                <Route exact path="/ordenes"
                                    render={() => (
                                        <Ordenes
                                            Reporteordenes={Reporteordenes}
                                            guardarRecargarProductos={guardarRecargarProductos}
                                        ></Ordenes>
                                    )}
                                />

                                <Route exact path="/ordenesgarantia"
                                    render={() => (
                                        <OrdenesGarantia
                                            Reporteordenes={Reporteordenes}
                                            guardarRecargarProductos={guardarRecargarProductos}
                                        ></OrdenesGarantia>
                                    )}
                                />

                                <Route exact path="/clientes"
                                    render={() => (
                                        <Clientes
                                            titulo="Clientes"
                                            ReportClientes={ReportClientes} Ciudades={Ciudades}
                                            setRecargarClientes={setRecargarClientes}
                                            btnEditar={true}
                                            btnELiminar={true}
                                            btnSeleccionar={false}
                                            btnNuevoCliente={true}

                                        ></Clientes>
                                    )}
                                />


                                <Route exact path="/usuarios"
                                    render={() => (
                                        <Usuarios setRecargarUsuario={setRecargarUsuario} usuarios={usuarios}></Usuarios>
                                    )}
                                />


                                <Route exact path="/orden/editar/:id"
                                    render={(props) => {

                                        const idOrden = props.match.params.id
                                        const orden = Reporteordenes.filter(unaOrden => unaOrden.IDOrden === idOrden)
                                        var esTecn = (JSON.parse(localStorage.getItem('usuario')).rol === ROL_ADMINISTRADOR) ? false : true


                                        return (
                                            <EditarOrden ReportClientes={ReportClientes}
                                                back="/ordenes"
                                                marcas={marcas}
                                                orden={orden[0]}
                                                esTecnico={esTecn}
                                                tiposEquipos={tiposEquipos}
                                                setRecargarClientes={setRecargarClientes}
                                                Ciudades={Ciudades}
                                                operarios={operarios}
                                                estadosOrden={estadosOrden}
                                                garantias={garantias}
                                                guardarRecargarProductos={guardarRecargarProductos}
                                            ></EditarOrden>
                                        )

                                    }}
                                />
                                <Route exact path="/ordengarantia/editar/:id"
                                    render={(props) => {

                                        const idOrden = props.match.params.id
                                        const orden = Reporteordenes.filter(unaOrden => unaOrden.IDOrden === idOrden)
                                        console.log("orden es", orden)

                                        var esTecn = (JSON.parse(localStorage.getItem('usuario')).rol === ROL_ADMINISTRADOR) ? false : true
                                        return (
                                            <EditarOrden ReportClientes={ReportClientes}
                                                back="/ordenesgarantia"
                                                marcas={marcas}
                                                esTecnico={esTecn}
                                                orden={orden[0]}
                                                tiposEquipos={tiposEquipos}
                                                setRecargarClientes={setRecargarClientes}
                                                Ciudades={Ciudades}
                                                operarios={operarios}
                                                estadosOrden={estadosOrden}
                                                garantias={garantias}
                                                guardarRecargarProductos={guardarRecargarProductos}
                                            ></EditarOrden>
                                        )

                                    }}
                                />



                                <Route exact path="/formularioNuevaOrden"
                                    render={() => (
                                        <FRM ReportClientes={ReportClientes}
                                            marcas={marcas}
                                            tiposEquipos={tiposEquipos}
                                            setRecargarClientes={setRecargarClientes}
                                            Ciudades={Ciudades}
                                            operarios={operarios}
                                            orden={null}
                                            estadosOrden={estadosOrden}
                                            garantias={garantias}
                                            guardarRecargarProductos={guardarRecargarProductos}
                                        ></FRM>
                                    )}
                                />




                                <Route exact path="/cliente/editar/:id"
                                    render={(props) => {

                                        const idCliente = props.match.params.id
                                        const cliente = ReportClientesSinFiltro.filter(unCliente => unCliente.IDCliente === idCliente)


                                        return (
                                            <EditarCliente
                                                Ciudades={Ciudades}
                                                cliente={cliente}
                                                setRecargarClientes={setRecargarClientes}
                                            />
                                        )

                                    }}
                                />

                                <Route exact path="/usuario/editar/:id"
                                    render={(props) => {


                                        const idUsuario = props.match.params.id
                                        const usuario = usuarios.filter(unUsuario => unUsuario.IDUsuario === idUsuario)

                                        if (usuario.length > 0) {
                                            return (
                                                <EditarUsuario
                                                    cliente={usuario}
                                                    roles={roles}
                                                    setRecargarClientes={setRecargarUsuario}
                                                />
                                            )
                                        } else {
                                            return <div></div>
                                        }


                                    }}
                                />



                            </Switch>






                            {/*          
         
          <Grid container spacing={3}>
      
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
   
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
    
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid> */}




                        </Container>
                        {/* <MadeWithLove /> */}
                    </main>
                </div>


            </Router>
        );

    }





}


export default (Menu);