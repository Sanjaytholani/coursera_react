import React from 'react';
import logo from './logo.svg';
import {Navbar,NavBrand, NavbarBrand} from 'reactstrap';
import Menu from './components/Menucomponents'
import './App.css';

function App() {
  return (
    <div>
              <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu></Menu>
    </div>
  );
}

export default App;
