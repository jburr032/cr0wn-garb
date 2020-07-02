import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/Homepage";
import Header from "./components/header/header.component";
import ShopPage from "./components/shop/shop.component";
import Checkout from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
// import { addCollectionAndDocuments } from "./firebase/firebase.utils";

import "./pages/homepage.styles.scss";
import "./App.css";

const App = ({ checkUserSession, currentUser }) => {
  // unsubcribeFromAuth = null;

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // componentWillUnmount() {
  //   unsubcribeFromAuth();
  // }

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={Checkout} />
        <Route
          exact
          path='/sign-in'
          render={() =>
            currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
