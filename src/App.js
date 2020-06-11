import React from 'react';
import Main from './components//MainComponent'
import {DISHES} from './shared/dishes';
import {BrowserRouter} from 'react-router-dom';
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
          <BrowserRouter>
          <div className="App">
            <Main />
        </div>
          </BrowserRouter>
        );}
}

export default App;
