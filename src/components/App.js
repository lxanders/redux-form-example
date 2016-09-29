import React, { Component } from 'react';
import MyForm from '../containers/MyForm';

import logo from '../assets/logo.svg';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <div className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h2>Demo page for testing redux-form</h2>
                </div>
                <div className='container'>
                    <MyForm />
                </div>
            </div>
        );
    }
}

export default App;
