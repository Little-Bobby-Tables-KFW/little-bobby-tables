import {
  createGenerateClassName,
  jssPreset,
  StylesProvider,
} from "@material-ui/core/styles";
import { create } from "jss";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Admin from "./admintable/AdminTable.js";
import "./App.css";
import styles from "./App.module.css";
import BookList from "./booklist/BookList.js";
import Rent from "./form/Form.js";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById("jss-insertion-point"),
});

// More components
class Overview extends Component {
  render() {
    return (
      <div className="App">
        <BookList />
      </div>
    );
  }
}

class App extends Component {

  componentDidMount(){
    document.title = process.env.REACT_APP_TITLE ? "DO Ausleihe " + process.env.REACT_APP_TITLE : "DO Ausleihe - PoC"
  }

  render() {
    return (
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <BrowserRouter>
          <div className={styles.fullwidth}>
            <Switch className={styles.fullwidth}>
              <Route exact path="/">
                <Redirect to="/books" /> 
              </Route>
              <Route path="/books/:bookID" component={Rent} />
              <Route path="/books" component={Overview} />
              <Route path="/admin" component={Admin} />
              <Route path="/:bookID" component={Rent} />
            </Switch>
          </div>
        </BrowserRouter>
      </StylesProvider>
    );
  }
}

export default App;
