import React, { Component } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/users";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AnchorEl: null,
      AnchorElDrugs: null,
      system_users: [],
      purchase_number: "...",
      sales_number: "...",
    };
    this.classes();
    this.users();
  }

  async classes() {
    const res = (await UsersApi.data("/user/classes")) || [];
    if (res) {
      this.setState({ ...this.state, products: res === "Error" ? [] : res });
    }
  }
  async users() {
    const res = (await UsersApi.data("/user/admin/users")) || [];
    if (res) {
      this.setState({
        ...this.state,
        system_users: res === "Error" ? [] : res,
      });
    }
  }

  handleOpenActions = (e) => {
    this.setState({ ...this.state, AnchorEl: e.currentTarget });
  };
  handleOpenActionsDrugs = (e) => {
    this.setState({ ...this.state, AnchorElDrugs: e.currentTarget });
  };
  handleCloseActions = () => {
    this.setState({ ...this.state, AnchorEl: null });
  };
  handleCloseActionsDrugs = () => {
    this.setState({ ...this.state, AnchorElDrugs: null });
  };

  render() {
    return (
      <>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="dashboard" />
        <div className="main-content">
          <Header />
          <main>
            <div className="cards">
              <div className="card-single">
                <div className="">
                  <h1>{this.state.sales_number}</h1>
                  <span>
                    Students <br />
                    <span style={{ fontSize: "13px" }}>Registered</span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"></span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{this.state.sales_number}</h1>
                  <span>
                    Classes <br />
                    <span style={{ fontSize: "13px" }}>In the System</span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"></span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{this.state.purchase_number}</h1>
                  <span>
                    Courses <br />
                    <span style={{ fontSize: "13px" }}>Being Taken</span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"></span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{this.state.system_users.length}</h1>
                  <span>
                    System Users <br />
                    <span style={{ fontSize: "13px" }}>
                      Teachers &amp; Other Users
                    </span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
            </div>
            <div className="recent-grid">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Classes</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-controls="drug-actions"
                      aria-haspopup="true"
                      onClick={this.handleOpenActionsDrugs}
                    >
                      More
                      <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                        <span className="las la-angle-down"></span>
                      </span>
                    </Button>
                    <Menu
                      id="drug-actions"
                      anchorEl={this.state.AnchorElDrugs}
                      keepMounted
                      open={Boolean(this.state.AnchorElDrugs)}
                      onClose={this.handleCloseActionsDrugs}
                      disableScrollLock={true}
                    >
                      <Link to="/new-product">
                        <MenuItem onClick={this.handleCloseActionsDrugs}>
                          New Class
                        </MenuItem>
                      </Link>
                      <Link to="/all-products">
                        <MenuItem onClick={this.handleCloseActionsDrugs}>
                          See All
                        </MenuItem>
                      </Link>
                    </Menu>
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>students</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>16/06/001</td>
                          <td>Panadol</td>
                          <td>
                            <Button variant="contained" color="primary">
                              Details
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>16/06/001</td>
                          <td>Capsule</td>
                          <td>
                            <Button variant="contained" color="primary">
                              Details
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>16/06/001</td>
                          <td>Painex</td>
                          <td>
                            <Button variant="contained" color="primary">
                              Details
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>System Users</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-controls="reception-actions"
                      aria-haspopup="true"
                      onClick={this.handleOpenActions}
                    >
                      More
                      <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                        <span className="las la-angle-down"></span>
                      </span>
                    </Button>
                    <Menu
                      id="reception-actions"
                      anchorEl={this.state.AnchorEl}
                      keepMounted
                      open={Boolean(this.state.AnchorEl)}
                      onClose={this.handleCloseActions}
                      disableScrollLock={true}
                    >
                      <Link to="/new-user">
                        <MenuItem onClick={this.handleCloseActions}>
                          New User
                        </MenuItem>
                      </Link>
                      <Link to="/">
                        <MenuItem onClick={this.handleCloseActions}>
                          All Users
                        </MenuItem>
                      </Link>
                    </Menu>
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Username</td>
                          <td>Role</td>
                          <td>Contact</td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.system_users.length === 0 ? (
                          <tr>
                            <td>No Users Availble to Display</td>
                          </tr>
                        ) : (
                          this.state.system_users.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>
                                  {`${v.user_first_name} ${v.user_surname}`}
                                </td>
                                <td>{v.username}</td>
                                <td>{v.user_role}</td>
                                <td>{v.user_phone}</td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default Dashboard;
