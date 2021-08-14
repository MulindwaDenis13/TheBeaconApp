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
      classes: [],
      purchase_number: "...",
      sales_number: "...",
    };
    this.classes();
  }

  async classes() {
    const res = (await UsersApi.data("/user/admin/classes")) || [];
    if (res) {
      this.setState({ ...this.state, classes: res === "Error" ? [] : res });
    }
  }

  async purchases() {
    const res = (await UsersApi.data("/user/all/purchases")) || [];
    if (res) {
      this.setState({ ...this.state, purchase_number: res.length });
    }
  }

  async sales() {
    const res = (await UsersApi.data("/user/all/sales")) || [];
    if (res) {
      this.setState({ ...this.state, sales_number: res.length });
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
                  <h1>{this.state.classes.length}</h1>
                  <span>
                    My Classes <br />
                    <span style={{ fontSize: "13px" }}>This Semester</span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{"..."}</h1>
                  <span>
                    My Courses <br />
                    <span style={{ fontSize: "13px" }}>This Semester</span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"></span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{2}</h1>
                  <span>
                    Faculties <br />
                    <span style={{ fontSize: "13px" }}>Being Taught</span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{"..."}</h1>
                  <span>
                    Overrall Progress <br />
                    <span style={{ fontSize: "13px" }}>This Semester</span>
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
                    <h3>The Classes</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-controls="drug-actions"
                      aria-haspopup="true"
                      onClick={this.handleOpenActionsDrugs}
                    >
                      Show
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
                          <td>Faculty</td>
                          <td>Code</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.classes.length === 0 ? (
                          <tr>
                            <td>No Classes Available To Display...</td>
                          </tr>
                        ) : (
                          this.state.classes.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td className="name_cell">{v.class_name}</td>
                                <td>{v.faculty}</td>
                                <td>{v.class_name.substring(0, 3)}</td>
                                <td>
                                  <Button variant="contained" color="primary">
                                    Details
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Suppliers</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-controls="reception-actions"
                      aria-haspopup="true"
                      onClick={this.handleOpenActions}
                    >
                      Show
                      <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                        <span className="las la-angle-down"></span>
                      </span>
                    </Button>
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Product No.</td>
                          <td>Name</td>
                          <td>ExpiryDate</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>12/02/2012</td>
                          <td>Panadol</td>
                          <td>23/09/2020</td>
                        </tr>
                        <tr>
                          <td>12/07/2019</td>
                          <td>Action</td>
                          <td>23/07/2019</td>
                        </tr>
                        <tr>
                          <td>11/09/2015</td>
                          <td>Coaterm</td>
                          <td>25/05/2022</td>
                        </tr>
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
