import React, { Component } from 'react';
import Menu from './MenuComponents';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import {Switch,Redirect,Route} from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        leaders: LEADERS,
        comments: COMMENTS,
        promotions: PROMOTIONS,
    };
  }

  render() {
    const HomePage=()=>{
      return (
        <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]}/>
      );
    }
    const DishWithId = ({match})=>{
      return(<DishDetail dish={this.state.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
      comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}/>
      );
    }
    const AboutInfo= ()=>{
      return(<About leaders={this.state.leaders}/>);
    }
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route path="/aboutus" component={AboutInfo}/>
          <Route exact path="/contactus" component={Contact}/>
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Main;