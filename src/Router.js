import React from 'react'
import { BrowserRouter as RouterContainer, Route, Switch } from 'react-router-dom'

import NuevoCliente from './Components/NuevoCliente'
import EditarCliente from './Components/EditarCliente'
import SignInSide from './SignInSide'


function Router() {

    return (
         
        <RouterContainer>
             <h1>Cabecera.</h1>
            <Switch>
                <Route  exact path="/nuevo-cliente"  componnent={NuevoCliente}> </Route>
                <Route exact path="/editar-cliente" componnent={EditarCliente}> </Route>
                <Route exact path="/login" componnent={SignInSide}> </Route>
            </Switch>
        </RouterContainer>
    )
}


export default Router;