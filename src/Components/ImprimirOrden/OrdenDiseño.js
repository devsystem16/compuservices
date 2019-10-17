import React  from 'react';
import './Style.css';
import ReimpiresionOrden from './index'
 
function OrdenDiseño ({orden, handleClose})   {
        return (  <ReimpiresionOrden handleClose={handleClose}  orden={orden}   ></ReimpiresionOrden> )
    }
export default OrdenDiseño;
