import React, { Component } from 'react';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';

import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Visibility";
import Editar from "@material-ui/icons/Edit";
import CloudDownload from "@material-ui/icons/CloudDownload";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import Delete from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import PlayForWork from '@material-ui/icons/PlayForWork';

import Fab from '@material-ui/core/Fab';

import ReactToPrint from "react-to-print";

import { getCurrentDate } from '../utils'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from 'react-router-dom'
import { ExportReactCSV } from './ExportReactCSV'

import OrdenDiseño from './ImprimirOrden/OrdenDiseño'





import { API_GET_REPORTE_ORDEN_GARANTIA, API_GET_UNA_ORDEN, API_POST_GUARDAR_ORDEN, ROL_ADMINISTRADOR } from '../Constantes'



// import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,

} from '@material-ui/pickers';




class Ordenes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonReporteOrdenes: [],
            unaOrden: [],
            modalImpresionOrden: false,
            modalReporteGarantia: false,
            customers: this.customers(),
            fileName: 'Reporte Garantia',
            fechaInicio: new Date(getCurrentDate('-')),
            fechaFin: new Date(getCurrentDate('-'))

        }
    }

    customers = () => {
        let custs = []
        for (let i = 0; i <= 25; i++) {
            custs.push({
                firstName: `first${i}`, lastName: `last${i}`,
                email: `abc${i}@gmail.com`, address: `000${i} street city, ST`, zipcode: `0000${i}`
            });
        }


        return custs;
    }

    cerrarModalReporteGarantia = () => {
        this.setState({
            modalReporteGarantia: false
        })
    }
    abrirModalReporteGarantia = () => {
        this.setState({
            modalReporteGarantia: true
        })
    }

    handleClickOpen = () => {
        this.setState({
            modalImpresionOrden: true
        })

    }

    handleClose = () => {
        this.setState({
            modalImpresionOrden: false
        })
    }

    setOpenProps = () => {
        this.setState({
            setOpenProps: true
        })
    }

    descargarExcel(csvData, fileName) {

        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        var inicio = moment(new Date(this.state.fechaInicio).toLocaleDateString([], options)).format("YYYY-MM-DD")
        var fin = moment(new Date(this.state.fechaFin).toLocaleDateString([], options)).format("YYYY-MM-DD")

        axios.get(`${API_GET_REPORTE_ORDEN_GARANTIA}/${inicio}/${fin}`).then(response => {

            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';

            const ws = XLSX.utils.json_to_sheet(response.data);
            const wb = { Sheets: { 'Reporte uso de garantia': ws }, SheetNames: ['Reporte uso de garantia'] };

            // ws['!protect'] = {
            //     password:"password",
            //     /* enable formatting rows and columns */
            //     formatRows:false,
            //     formatColumns:false,
            //     /* disable editing objects and scenarios */
            //     objects:true,
            //     scenarios:true
            // };
            var wscols = [
                {wch:30},
                {wch:30},
                {wch:30},
                {wch:30},
                {wch:30}
                
                // {hidden: true} // hide column
            ];

         
            ws['!cols'] = wscols;

            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, fileName + " " + getCurrentDate('-') + fileExtension);

            this.cerrarModalReporteGarantia();

        })





    }

    fn_eliminarOrden = () => {
        const orden = {
            IDStatus: localStorage.getItem('IDStatusInactivo')
        }
        Swal.fire({
            title: '¿Está usted seguro/a?',
            text: "¡Esta orden se eliminará permanentemente!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.value) {
                axios.put(`${API_POST_GUARDAR_ORDEN}/${localStorage.getItem('current_IDOrden')}`, orden).then(res => {
                    this.props.guardarRecargarProductos(true)
                    this.props.history.push('/ordenes')
                })


                Swal.fire(
                    '¡Eliminado!',
                    'La orden ha sido eliminada.',
                    'success'
                )
            }
        })

    }

    handleDateChange = (date) => {

        this.setState({
            fechaInicio: date
        })
    }
    handleDateChangeFechaFin = (date) => {

        this.setState({
            fechaFin: date
        })
    }

    handleAfterPrint = () => console.log('after print!');
    handleBeforePrint = () => console.log('before print!');
    renderContent = () => this.componentRef;
    renderTrigger = () => <button type="button">Print this out!</button>;
    //   onBeforeGetContent = () => this.setState({text: "text changed"});

    setRef = ref => this.componentRef = ref;



    render() {

        const columns = [
            {
                name: "IDOrden",
                label: "IDOrden",
                options: {
                    filter: false,
                    sort: false,
                }
            },

            {
                name: "numeroOrden",
                label: "N° Orden",
                options: {
                    filter: false,
                    sort: false,
                }
            },

            {
                name: "fecha",
                label: "fecha",
                options: {
                    filter: false,
                    sort: false,
                }
            },




            {
                name: "cliente",
                label: "Cliente",
                options: {
                    filter: false,
                    sort: false,

                }
            },

            {
                name: "descripcion",
                label: "Equipo",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "modelo",
                label: "modelo",
                options: {
                    filter: false,
                    sort: false,
                }
            },


            {
                name: "falla",
                label: "falla",
                options: {
                    filter: false,
                    sort: false,
                }
            },


            {
                name: "informeTecnico",
                label: "Inf. Técnico",
                options: {
                    filter: false,
                    sort: false,
                }
            },



            // {
            //     name: "codigo",
            //     label: "codigo",
            //     options: {
            //         filter: false,
            //         sort: false,
            //     }
            // },




            // {
            //     name: "serie",
            //     label: "serie",
            //     options: {
            //         filter: false,
            //         sort: false,
            //     }
            // },
            {
                name: "abonos",
                label: "abonos",
                options: {
                    filter: false,
                    sort: false,
                }
            },

            {
                name: "total",
                label: " total ",
                options: {
                    filter: false,
                    sort: false,
                }
            },


            {
                name: "saldo",
                label: " saldo ",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "estadoOrden",
                label: " Estado ",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "garantia",
                label: "Garantia",
                options: {
                    filter: true,
                    sort: false,
                }
            },

            {
                name: "",
                options: {
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {

                        var currentIDOrden = localStorage.getItem('current_IDOrden')
                        var PermisoAdministrador = false;
                        if (tableMeta.rowData !== undefined) {

                            localStorage.setItem('current_IDOrden', tableMeta.rowData[0])
                            currentIDOrden = localStorage.getItem('current_IDOrden')






                        }

                        var permisoEstilo =(JSON.parse(localStorage.getItem('usuario')).rol === ROL_ADMINISTRADOR) ? { display: '' } : { display: 'none' }
                       

                        return (
                            <div>
                                <IconButton
                                    onClick={this.handleClickOpen}
                                    disabled={false}
                                    title="Ver/Descargar Orden"
                                    color="primary"
                                    aria-label="Imprimir">
                                    <Edit fontSize="small" />
                                </IconButton>


                                <Link to={`/orden/editar/${currentIDOrden}`}    >
                                    <IconButton
                                        // style={permisoEstilo}
                                        title="¿Editar Orden?"
                                        // onClick={this.fn_eliminarCliente}
                                        // style={btnEliminarStyle}
                                        color="primary"
                                        aria-label="Imprimir">
                                        <Editar fontSize="small" />
                                    </IconButton>
                                </Link>




                                <IconButton
                                    disabled={PermisoAdministrador}
                                    title="¿Eliminar Orden?"
                                    style={permisoEstilo}
                                    onClick={this.fn_eliminarOrden}
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


        ];

        console.log("da", this.props.Reporteordenes)
        

        var data = this.props.Reporteordenes 
 

        const options = {
            download: true,
            print: true,
            filterType: 'checkbox',
            responsive: "scroll",


            onRowClick: (rowData, rowState) => {
                localStorage.setItem("current_IDOrden", rowData[0]);

                axios.get(`${API_GET_UNA_ORDEN}/${rowData[0]}`).then(response => {

                    this.setState({
                        unaOrden: response.data[0]
                    })

                })

            }



            // filter: false,
            // selectableRows: false,
            // filterType: "dropdown",
        };



        return (

            <div id="tablaDatos">



                <Fab className="flotante" size="small" color="secondary" aria-label="Add"
 
                    onClick={this.abrirModalReporteGarantia}
                >
                    <PlayForWork />
                </Fab>

                <Link to="/formularioNuevaOrden"    >
                    <Fab className="flotante" size="small" color="primary" aria-label="Add" onClick={this.setOpenProps} >
                        <AddIcon />
                    </Fab>
                </Link>

                <MUIDataTable

                    title={"Listado Ordenes"}
                    data={data}
                    columns={columns}
                    options={options}
                />




                <Dialog
                    open={this.state.modalImpresionOrden}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">{"Reimprimir esta orden?"}</DialogTitle> */}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">



                            <OrdenDiseño handleClose={this.handleClose} orden={this.state.unaOrden} ></OrdenDiseño>



                        </DialogContentText>
                    </DialogContent>

                </Dialog>




                <Dialog
                    open={this.state.modalReporteGarantia}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={this.cerrarModalReporteGarantia}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Seleccione un rango de fecha para el reporte de garantia"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">



                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">

                                <KeyboardDatePicker
                                    margin="normal"
                                    todayLabel="asdadasd"
                                     cancelLabel="Cancelar"
                                    format="yyyy-MM-dd"
                                    minDateMessage="La fecha desde no puede ser mayor a la fecha hasta"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format="yyyy-MM-dd"
                                    value={this.state.fechaInicio}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />  
                                        
                                    <KeyboardDatePicker
                                    margin="normal"
                                   
                                    cancelLabel="Cancelar"
                                    format="yyyy-MM-dd"
                                    minDateMessage="La fecha hasta no puede ser menor a la fecha desde"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    minDate={this.state.fechaInicio}
                                    format="yyyy-MM-dd"
                                    value={this.state.fechaFin}
                                    onChange={this.handleDateChangeFechaFin}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />  

                                </Grid>
                            </MuiPickersUtilsProvider>





                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.cerrarModalReporteGarantia} color="primary"> Cancelar </Button>
                        <Button onClick={(e) => this.descargarExcel(this.state.customers, this.state.fileName)} color="primary">  Descargar </Button>
                    </DialogActions>

                </Dialog>

            </div>

        );
    }
}

export default withRouter(Ordenes);