import React from 'react'
import Dashboard from '../components/dashboard/Dashboard'


//WAN
import ConnectionTable from '../components/wan/connection_table'
import WanEthernet from '../components/wan/wan_ethernet'

import {
    Switch,
    Route,
  } from "react-router-dom";

const Routes = () => {
    return (<>
     <Switch>
            <Route path="/" exact>
                <Dashboard />
            </Route>
            {/* wan */}
            <Route path="/wan/connection_table" exact>
                <ConnectionTable />
            </Route>
            <Route path="/wan/wan_ethernet" exact>
                <WanEthernet />
            </Route>             
            
            <Route path="*">
                <Dashboard />
            </Route>
        </Switch>
    </>)
}

export default Routes;