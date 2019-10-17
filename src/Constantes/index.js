const ipServer ="http://172.17.0.56"
const puerto ="8000"

const http =`${ipServer}:${puerto}`
const apiCompuServices =`${http}/api/`


export const API_MARCA =apiCompuServices + "marca"

// Obtiene todas las ordenes (reporte) activas del sistema.
export const API_REPORTE_ORDENES = apiCompuServices + "reporteOrdenes"
// Obtiene todas las ciudades del sistema que seran mostradas en los List.
export const API_CIUDAD = apiCompuServices + "ciudad"
// Obtiene los tipos de equipos para asignarlo a las ordenes.
export const API_TIPO_EQUIPO = apiCompuServices + "tipoequipo"
// Obtiene los estados activo o inactivo segun se necesite.
export const API_STATUS = apiCompuServices + "getStatus"
// Obtiene el listado de clientes activos.
export const API_CLIENTES = apiCompuServices + "cliente"


// Obtiene el listado de clientes activos.
export const API_CLIENTES_DESCONCATENADO = apiCompuServices + "clientes-desconcatenado"

// Obtiene el listado de clientes activos.
export const API_GET_NEW_ID = apiCompuServices + "uuid"


// Obtiene el listado de clientes activos.
export const API_GET_UNA_ORDEN = apiCompuServices + "getorden"


// Guardar cliente
export const API_POST_GUARDAR_CLIENTE = apiCompuServices + "cliente"


// Guardar abono
export const API_POST_GUARDAR_ABONO = apiCompuServices + "abonos"


 
export const API_USUARIO = apiCompuServices + "usuario"



//   
export const API_GET_CLIENTE_CODIGO = apiCompuServices + "clientecodigo"


//   
export const API_GET_ORDEN_CODIGO = apiCompuServices + "ordencodigo"

//   
export const API_POST_GUARDAR_ORDEN = apiCompuServices + "orden"

//   
export const API_GET_REPORTE_ORDEN_GARANTIA = apiCompuServices + "reporteOrdenesGarantia"


//
export const API_GET_TECNICOS_ADMINISTRADORES = apiCompuServices + "usuario_cli_tec"

//  
export const API_GET_ESTADOS_ORDEN = apiCompuServices + "estadoorden"

//  
export const API_GET_GARANTIAS = apiCompuServices + "garantia"

// Api para el login de la aplicacion.
export const API_LOGIN = apiCompuServices + "login"

// Api para el login de la aplicacion.
export const API_GET_LISTADO_USUARIOS_ROL = apiCompuServices + "listadoUsuariosRol"
// Api para el login de la aplicacion.
export const API_GE_ROL = apiCompuServices + "rol"

export const ROL_ADMINISTRADOR =  "Administrador"
 


export const REGEX_CI =  "/^[0-9]{8}$/"
export const REGEX_SOLO_LETRA =  "/^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/"
export const regex_email  =  "/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/"
export const regex_num_celular = "/^[0-9]{9}$/"

