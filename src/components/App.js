import React, { Component } from 'react';
import Board from './Board/Board';
import LoginPage from '../components/Auth/Login';
import RegistrationPage from '../components/Auth/Registration';

import { Route } from 'react-router-dom';

export default class App extends Component {

    componentDidMount() {
       var self = this.props.pageActions;
       self.getColumnFromDb();     
    }
  
    render() {
          return(
          <div>
              <Route exact={true} path="/" component={LoginPage} />
              <Route path="/registration" component={RegistrationPage} />
              <Route path="/board" component={Board} />
          </div>
          )
      }
  }