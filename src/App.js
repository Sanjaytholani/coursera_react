import React from 'react';
import Main from './components//MainComponent'
import {DISHES} from './shared/dishes';
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
          <div className="App">
            <Main />
        </div>
        );
    } 
}

export default App;
