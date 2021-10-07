import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//css
import "../app.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";

//routes
import Dashboard from "../Routes/teacher/Dashboard";
import Session from "../Routes/teacher/Session";
import AllProducts from "../Routes/teacher/allProducts";
import Product from "../Routes/teacher/product";
import NotFound from "../components/404";

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/session" exact component={Session} />
            <Route path="/all-products" exact component={AllProducts} />
            <Route path="/product" exact component={Product} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Teacher;
