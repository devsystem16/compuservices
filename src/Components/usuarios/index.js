import React, { Component } from 'react';

import MUIDataTable from "mui-datatables";
import axios from 'axios';
import Swal from "sweetalert2";  
import { Link } from 'react-router-dom'

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { withRouter } from 'react-router-dom'

// Componentes
import NuevoUsuario from './NuevoUsuario'
import { API_GET_LISTADO_USUARIOS_ROL,API_GE_ROL, API_USUARIO } from '../../Constantes'


class Usuarios extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            open: false,
            roles: []
        }

    }

  
    componentDidMount() {
 

         
        axios.get(API_GE_ROL).then(response => {
            this.setState({
                roles: response.data
            })

        })



    }

    fn_eliminarUsuario = ()=>{
        const usuario = {
         IDStatus:localStorage.getItem('IDStatusInactivo')
        }
 

        Swal.fire({
            title: '¿Está usted seguro/a?',
            text: "¡Este usuario se eliminará permanentemente!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
          }).then((result) => {
            if (result.value) {


                axios.put(`${API_USUARIO}/${localStorage.getItem('current_IDUsuario')}`  ,usuario ).then(res => {
                    this.props.setRecargarUsuario(true)
                    this.props.history.push('/usuarios')
                })
              
 
              Swal.fire(
                '¡Eliminado!',
                'El usuario ha sido eliminado.',
                'success'
              )
            }
          })

    }


    fn_abrirModal = () => {
        this.setState({
            open: true
        });
    }

    fn_cerrarModal = (estado) => {
        this.setState({
            open: false,
        });

    }

    render() {


        var objUsuarios = []
        this.props.usuarios.filter(usuario => {
              var unUsuario = {
                    IDUsuario:usuario.IDUsuario
                  , IDRol: usuario.IDRol
                  , cedula: usuario.cedula
                  , nombres: usuario.nombre1 + " " + usuario.nombre2 +  " " + usuario.apellidoPaterno + " " + usuario.apellidoMaterno
                  , direccion: usuario.direccion
                  , celular: usuario.celular
                  , correo: usuario.correo
                  , tipo: usuario.tipo
              }
              objUsuarios.push(unUsuario)
          })



        const options = {
            download: false,
            print: false,
            filterType: 'checkbox',
            responsive: "scroll",
            // rowsSelected: this.state.rowsSelected,

            onRowClick: (rowData, rowState) => {
             
                localStorage.setItem("current_IDUsuario", rowData[0]);
            },

        };


        const columns = [
            {
                name: "IDUsuario",
                label: "IDUsuario",
                options: {
                    filter: true,
                    sort: false,
                }
            }
            ,
            {
                name: "cedula",
                label: "Cédula",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "nombres",
                label: "Usuario",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "direccion",
                label: "Dirección",
                options: {
                    filter: true,
                    sort: false,
                }
            },

            {
                name: "celular",
                label: "Celular",
                options: {
                    filter: true,
                    sort: false,
                }
            },





            {
                name: "correo",
                label: "Correo",
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
                name: "tipo",
                label: "Tipo",
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








                        var currentIDusuario = localStorage.getItem('current_IDUsuario')
                        if (tableMeta.rowData !== undefined) {

                            localStorage.setItem('current_IDUsuario', tableMeta.rowData[0])
                            currentIDusuario = localStorage.getItem('current_IDUsuario')

                        }

              

                        return (

                            <div>
                                <Link to={`/usuario/editar/${currentIDusuario}`}    >
                                    <IconButton
                                        // style={btnEditarStyle}
                                        disabled={false}
                                        title=""
                                        color="primary"
                                        aria-label="Imprimir">
                                        <Edit fontSize="small" />
                                    </IconButton>
                                </Link>


                                <IconButton
                                    disabled={false}
                                    title="Eliminar Usuario?"
                                     onClick={this.fn_eliminarUsuario}
                                    // style={btnEliminarStyle}
                                    color="primary"
                                    aria-label="Imprimir">
                                    <Delete fontSize="small" />
                                </IconButton>




                            </div>
                        )
                    }
                }
            }

        ]




        return (
            <div id="tablaDatos">


                <Fab onClick={this.fn_abrirModal} className="flotante" size="small" color="primary" aria-label="Add">
                    <AddIcon />
                </Fab>


                <MUIDataTable
                    title="Usuarios"
                    data={objUsuarios}
                    columns={columns}
                    options={options}
                />
  

                <NuevoUsuario  fn_cerrarModal={this.fn_cerrarModal} cargarUsuarios={ this.props.setRecargarUsuario} roles={this.state.roles} title="Nuevo Usuario" open={this.state.open} fn_cerrarModalNuevoUsuario={this.fn_cerrarModal} />

            </div>
        )
    }
}

export default withRouter(Usuarios);
















