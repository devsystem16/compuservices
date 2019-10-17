import React, { Component } from 'react';
import logo from './logoCompuservices.PNG';

import DialogActions from '@material-ui/core/DialogActions';
import Pdf from "react-to-pdf";

import Button from '@material-ui/core/Button';
const ref = React.createRef();


class ReimpiresionOrden extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
 



    render() {
        console.log("orden de impresion " , this.props.orden)
        return (

            <div>
             

           
                 <div  ref={ref} >

                <img className="imagenImpresion" src={logo} />
                <div className="titleImpresionOrden">ORDEN DE INGRESO DE EQUIPO</div>

                <div className="container">

                    <div className="row">
                        <div className="col-md-4 opcion">COD. CLIENTE :</div>
                        <div className="col-md-8 value">{this.props.orden.codigoCliente}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 opcion">NOMBRE:</div>
                        <div className="col-md-8 value">{this.props.orden.nombres}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 opcion">APELLIDO:</div>
                        <div className="col-md-8 value">{this.props.orden.apellidos}</div>
                    </div>

                    
                    <div className="row">
                        <div className="col-md-4 opcion">CÉDULA:</div>
                        <div className="col-md-8 value">{this.props.orden.cedula}</div>
                    </div>


                    
                    <div className="row">
                        <div className="col-md-4 opcion">CELULAR:</div>
                        <div className="col-md-8 value">{this.props.orden.celular}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 opcion">&nbsp;</div>
                        <div className="col-md-8 opcion">&nbsp;</div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 opcion">ORDEN  N°:</div>
                        <div className="col-md-8 value">{this.props.orden.numeroOrden}</div>
                    </div>


                    <div className="row">
                        <div className="col-md-4 opcion">Tipo de equipo:</div>
                        <div className="col-md-8 value">{this.props.orden.tipoEquipo}</div>
                    </div>


                    <div className="row">
                        <div className="col-md-4 opcion">Marca:</div>
                        <div className="col-md-8 value">{this.props.orden.marca}</div>
                    </div>


                    <div className="row">
                        <div className="col-md-4 opcion">Modelo:</div>
                        <div className="col-md-8 value">{this.props.orden.modelo}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 opcion">Serie:</div>
                        <div className="col-md-8 value">{this.props.orden.serie}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 opcion">Accesorios:</div>
                        <div className="col-md-8 value">{this.props.orden.accesorios}</div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 opcion">Falla:</div>
                        <div className="col-md-8 value">{this.props.orden.falla}</div>
                    </div>

                    {/* <div className="row">
                        <div className="col-md-4 opcion">Informe Técnico:</div>
                        <div className="col-md-8 value">{this.props.orden.informeTecnico}</div>
                    </div> */}

                    <div className="row">
                        <div className="col-md-4 opcion">Fecha: </div>
                        <div className="col-md-8 value">{this.props.orden.fecha}</div>
                    </div>

                    <br />
                    <br />


                    <div className="row">
                        <div className="col-md-4 ">_______________________ </div>
                        <div className="col-md-1 ">  </div>
                        <div className="col-md-7 ">________________________________________</div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 ">Firma Autorizada </div>
                        <div className="col-md-1 ">  </div>
                        <div className="col-md-7">Firma Cliente</div>
                    </div>


                </div>

            </div>
           
            <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cerrar
                          </Button>



              <Pdf targetRef={ref} filename={"Orden_"+ this.props.orden.numeroOrden +".pdf" }  >
 
                    {({ toPdf }) => <Button onClick={toPdf  }>Descargar</Button>}
                </Pdf>

                    </DialogActions>
           
            </div>
     );
    }
}

export default ReimpiresionOrden;