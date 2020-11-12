import { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => 
          dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes()
  }
  render() {
    console.log(this.props.dishes); // This will show you the initial state of the components values as an Arrays
    console.log(this.props.comments); // This will also show you the initial state of the components values as an Arrays

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrorMsg = {this.props.dishes.errMsg}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}      
        />
      );
    }

    const DishWithId = ({match}) => {
      console.log(match);
      console.log(this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]);
      console.log(this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))[0]);
      return (
        <DishDetail dish = {this.props.dishes.dishes.filter((dish) => {
                      return dish.id === parseInt(match.params.dishId,10);
                    })[0]}
                    comments = {this.props.comments.filter((comment) => {
                      return comment.dishId === parseInt(match.params.dishId, 10);
                    })}
                    addComment = {this.props.addComment}
                    isLoading={this.props.dishes.isLoading}
                    errMsg = {this.props.dishes.errMsg}
        />
      );
    }


    return (
      <div>
          <Header/>
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}/>
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path="/contactus" component={Contact}/>
            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
            <Redirect to="/home"/>
          </Switch>
          <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
