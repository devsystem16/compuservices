import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Swal from "sweetalert2";  
import axios  from 'axios'
import { Link } from 'react-router-dom'
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import PageviewIcon from '@material-ui/icons/Check';
import ModalNuevoCliente from './NuevoCliente/index'
import { withRouter } from 'react-router-dom'
import  {API_CLIENTES,ROL_ADMINISTRADOR} from '../Constantes'

class Clientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setOpenProps: false,
            btnNuevoCliente: { display: '' },
            rowsSelected: []
        }
    }


    fn_eliminarCliente = ()=>{
        const cliente = {
         IDStatus:localStorage.getItem('IDStatusInactivo')
        }

        



        Swal.fire({
            title: '¿Está usted seguro/a?',
            text: "¡Este cliente se eliminará permanentemente!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
          }).then((result) => {
            if (result.value) {


                axios.put(`${API_CLIENTES}/${localStorage.getItem('current_IDCLiente')}`  ,cliente ).then(res => {
                    this.props.setRecargarClientes(true)
                    this.props.history.push('/clientes')
                })
              
 
              Swal.fire(
                '¡Eliminado!',
                'El cliente ha sido eliminado.',
                'success'
              )
            }
          })

    }
    componentDidMount() {
        if (!this.props.btnNuevoCliente) {
            this.setState({
                btnNuevoCliente: { display: 'none' }
            })
        }
    }

    setOpenProps = () => {
        this.setState({
            setOpenProps: true
        })
    }


    handleCloseModalCliente = (estado) => {
        this.setState({
            setOpenProps: estado
        })
    }

     cerrar= () => {
      
         this.props.handleCloseModalCliente();
     }

    render() {

        const columns = [
            {
                name: "IDCliente",
                label: "IDCliente",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "codigo",
                label: "codigo",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "cedula",
                label: "cedula",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "nombres",
                label: "nombres",
                options: {
                    filter: true,
                    sort: false,
                }
            },

            {
                name: "celular",
                label: "celular",
                options: {
                    filter: true,
                    sort: false,
                }
            },





            {
                name: "direccion",
                label: "direccion",
                options: {
                    filter: true,
                    sort: false,
                }
            },





            {
                name: "correo",
                label: "correo",
                options: {
                    filter: true,
                    sort: false,
                }
            },



            {
                name: "ciudad",
                label: "Ciudad",
                options: {
                    filter: true,
                    sort: false,
                }
            }

            , {
                name: "",
                options: {
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {



 




                        var currentIDCliente = localStorage.getItem('current_IDCLiente')
                        if (tableMeta.rowData !== undefined) {

                            localStorage.setItem('current_IDCLiente', tableMeta.rowData[0])
                            currentIDCliente = localStorage.getItem('current_IDCLiente')
        
                        }

                        var btnEditarStyle = { display: '' }
                        var btnEliminarStyle = { display: '' }
                        var btnSeleccionarStyle = { display: '' }
 
                        
                        btnEditarStyle =(JSON.parse(localStorage.getItem('usuario')).rol === ROL_ADMINISTRADOR) ? { display: '' } :  { display: 'none' }
                        btnEliminarStyle =(JSON.parse(localStorage.getItem('usuario')).rol === ROL_ADMINISTRADOR) ? { display: '' } :  { display: 'none' }
 

                        if (!this.props.btnEditar) {
                            btnEditarStyle = { display: 'none' }
                        }
                        if (!this.props.btnELiminar) {
                            btnEliminarStyle = { display: 'none' }
                        }
                        if (!this.props.btnSeleccionar) {
                            btnSeleccionarStyle = { display: 'none' }
                        }




                        return (

                            <div>
                                <Link to={`/cliente/editar/${currentIDCliente}`}    >
                                    <IconButton
                                        style={btnEditarStyle}
                                        disabled={false}
                                        title=""
                                        color="primary"
                                        aria-label="Imprimir">
                                        <Edit fontSize="small" />
                                    </IconButton>
                                </Link>


                                <IconButton
                                    disabled={false}
                                    title="Eliminar Cliente?"
                                    onClick={this.fn_eliminarCliente}
                                    style={btnEliminarStyle}
                                    color="primary"
                                    aria-label="Imprimir">
                                    <Delete fontSize="small" />
                                </IconButton>

                                <IconButton
                                onClick={this.cerrar}
                                    disabled={false}
                                    title=""
                                    style={btnSeleccionarStyle}
                                    color="primary"
                                    aria-label="Imprimir">
                                    <PageviewIcon fontSize="small" />
                                </IconButton>


                            </div>
                        )
                    }
                }
            }




        ];

        const data = this.props.ReportClientes


        const options = {
            download: false,
            print: false,
            filterType: 'checkbox',
            responsive: "scroll",
            rowsSelected: this.state.rowsSelected,

            onRowClick: (rowData, rowState) => {
                localStorage.setItem("current_IDCLiente", rowData[0]);
 
                var currentCliente = {
                    IDCliente: rowData[0],
                    codigo: rowData[1],
                    cedula: rowData[2],
                    nombres: rowData[3],
                    celular: rowData[4]
                }
                localStorage.setItem("currentCliente" ,JSON.stringify(currentCliente) )

                if (this.props.btnSeleccionar) {
                    this.cerrar()
                }
              


            },

        };




        return (

            <div id="tablaDatos">

                <Fab className="flotante" style={this.state.btnNuevoCliente} size="small" color="primary" aria-label="Add" onClick={this.setOpenProps} >
                    <AddIcon />
                </Fab>

                <MUIDataTable
                    title={this.props.titulo}
                    data={data}
                    columns={columns}
                    options={options}
                />


                <ModalNuevoCliente
                    Ciudades={this.props.Ciudades}
                    setOpenProps={this.state.setOpenProps}
                    handleCloseModalCliente={this.handleCloseModalCliente}
                    setRecargarClientes={this.props.setRecargarClientes}
                />

            </div>

        );
    }
}

export default  withRouter(Clientes );