import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import SelectedProduct from "./components/SelectedProduct";
import UserCart from "./components/TestCart";
import GuestCart from "./components/GuestCart";
import LoginOrSignup from "./components/LoginOrSignup";
import ThankYou from "./components/ThankYouPage";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path="/" component={AllProducts} />
          <Route exact path="/products/:id" component={SelectedProduct} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/cart" component={UserCart} />
          <Route exact path="/guestCart" component={GuestCart} />
          <Route exact path="/loginOrSignUp" component={LoginOrSignup} />
          <Route exact path="/thankyou" component={ThankYou} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/*<div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
*/
