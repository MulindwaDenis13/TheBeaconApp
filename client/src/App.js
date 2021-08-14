import React, { Component } from "react";
import user from "./app_config";
import Teacher from "./users_routes/teacher";
import Admin from "./users_routes/admin";
import Login from "./components/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user,
    };
  }

  render() {
    if (user.user.user_role === "admin") {
      return <Admin />;
    } else if (user.user.user_role === "teacher") {
      return <Teacher />;
    } else {
      return <Login />;
    }
  }
}

export default App;
