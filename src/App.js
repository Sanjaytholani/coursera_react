import React from 'react';
import Main from './components//MainComponent'
import {DISHES} from './shared/dishes';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';

const store=ConfigureStore();

class App extends React.Component {
  constructor(props){
      super(props);
      this.state={
        dishes: DISHES
      };
  }
    render() {
        return(
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
        );}
}

export default App;
