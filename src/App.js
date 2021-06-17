import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import cookie from 'react-cookies'
import { createMuiTheme } from '@material-ui/core/styles';
import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import { history } from "./history"
import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";
import User from "./layouts/User";
import ScrollToTop from "./ScrollToTop"
import './App.css'

const THEME = createMuiTheme({
  typography: {
   "fontFamily": `'Kanit', sans-serif`,
  }
});

class App extends React.Component {
  constructor(props) {
      super();
  }

  componentDidMount = async() => {
    if(cookie.load('token')){
      await this.props.authenProv.getUserCurrent(cookie.load('token'));
    }
  }

  render() {
      return (
        <ThemeProvider theme={THEME}>
            <Router history={history}>
              {/* <BrowserRouter> */}
                  <ScrollToTop />
                  <Switch>
                    <Route path={"/login"} component={LoginPage}/>
                    <Route path={"/register"} component={RegisterPage}/>
                    <Route path="/" component={User} />
                    <Redirect from="/" to="/" />
                  </Switch>
              {/* </BrowserRouter> */}
            </Router>


        </ThemeProvider>
      )
  }
}
export default inject("authenProv")(observer(App));
