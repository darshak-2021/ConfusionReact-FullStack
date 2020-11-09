import { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';


import DishDetail from './DishDetailComponent';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes:DISHES,
      comments:COMMENTS,
      promotions:PROMOTIONS,
      leaders:LEADERS
    }
  }

  render() {
    console.log(this.state.dishes); // This will show you the initial state of the components values as an Arrays
    console.log(this.state.comments); // This will also show you the initial state of the components values as an Arrays

    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}      
        />
      );
    }

    const DishWithId = ({match}) => {
      console.log(match);
      console.log(this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]);
      console.log(this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))[0]);
      return (
        <DishDetail dish = {this.state.dishes.filter((dish) => {
                      return dish.id === parseInt(match.params.dishId,10);
                    })[0]}
                    comments = {this.state.comments.filter((comment) => {
                      return comment.dishId === parseInt(match.params.dishId, 10);
                    })}
        />
      );
    }


    return (
      <div>
          <Header/>
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />}/>
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path="/contactus" component={Contact}/>
            <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders}/>}/>
          </Switch>
          <Footer/>
      </div>
    );
  }
}

export default Main;
