import React from 'react';
import logo from './logo.svg';
import {Navbar,NavBrand, NavbarBrand} from 'reactstrap';
import Menu from './components/Menucomponents';
import {DISHES} from './shared/dishes.js';
import './App.css';

class App extends React.Component {
  constructor(props){
      super(props);
      this.state={
        dishes: DISHES
      };
  }
    render() {
        return(
          <div>
                  <Navbar dark color="primary">
              <div className="container">
                <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
              </div>
            </Navbar>
      <Menu dishes={this.state.dishes}></Menu>
        </div>
        );
    } 
}

export default App;
