import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router';

import ContractManager from './components/contract/ContractManager';
import CreateContract from './components/contract/CreateContract';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ContractManager} />
        <Route path='/create' component={CreateContract} />
        <Redirect to='/' />
      </Switch>
    );
  }
}

export default Routes;
