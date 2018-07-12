import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router';

import ContractManager from './components/contract/ContractManager';
import CreateContract from './components/contract/CreateContract';
import Contract from './components/contract/Contract';
import SuccessSubmit from './components/contract/SuccessSubmit';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ContractManager} />
        <Route path='/create' component={CreateContract} />
        <Route path='/contract/:id' component={Contract} />
        <Route path='/success' component={SuccessSubmit} />
        <Redirect to='/' />
      </Switch>
    );
  }
}

export default Routes;
