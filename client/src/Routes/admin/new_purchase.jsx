import React, { Component } from "react";
import {
  TextField,
  Snackbar,
  Button,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/forms";
import UsersApi from "../../api/users";

//print

import "../../design/main.css";
import "../../design/forms.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class NewSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait...",
      messageState: "",
      _content: {},
      form_visible: false,
      active_product_qty: 0,
      over_qty_error: false,
      active_sale_type: "retail",
      active_selling_unit: "",
      active_selling_price: "",
      products: [],
      formData: [],
      total: 0,
      discount: 0,
    };
    this.users();
  }

  async users() {
    const res = (await UsersApi.data("/user/users")) || [];
    if (res) {
      this.setState({ ...this.state, products: res === "Error" ? [] : res });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    let api = new FormsApi();
    let res = await api.post("/user/users/new", _fcontent);
    if (res.status === true) {
      this.setState({
        ...this.state,
        message: res.data,
        messageState: "success",
      });
    } else {
      this.setState({
        ...this.state,
        message: res.data,
        messageState: "error",
      });
    }
  };

  closePopUp = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ ...this.state, open: false, message: "" });
  };

  render() {
    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.closePopUp}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.closePopUp}
              >
                <i className="las la-times"></i>
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert onClose={this.closePopUp} severity={this.state.messageState}>
            {this.state.message}
          </Alert>
        </Snackbar>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="purchase" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid">
              <div className="card">
                <div className="card-header">
                  <h3>Users</h3>
                  <Button variant="contained" color="primary">
                    Refresh
                  </Button>
                </div>
                <div className="card-body">
                  <table width="100%">
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Role</td>
                        <td>Load</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.formData.length === 0 ? (
                        <tr>
                          <td>No Product Added</td>
                        </tr>
                      ) : (
                        this.state.formData.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td className="name_cell">{v.product_name}</td>
                              <td>{v.qty}</td>
                              <td>{v.product_price}</td>
                              <td>
                                <Button variant="contained" color="primary">
                                  Report
                                </Button>
                              </td>
                              <td>
                                <Button variant="contained" color="primary">
                                  Competence
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
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div className="card-header">
                    <h3>New User</h3>
                    <div className="">
                      <Button
                        type="submit"
                        aria-describedby={this.id}
                        variant="contained"
                        color="primary"
                      >
                        <span
                          style={{ fontSize: "17.5px", marginRight: "10px" }}
                        >
                          <i className="las la-plus-circle"></i>
                        </span>
                        Save
                      </Button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="inputCtr">
                        <h4>User Details</h4>
                        <div className="inputs_ctr">
                          <div className="inpts_on_left">
                            <TextField
                              name="surname"
                              variant="outlined"
                              label="Surname"
                              style={{
                                width: "85%",
                                margin: "20px",
                              }}
                            />
                            <TextField
                              name="first_name"
                              variant="outlined"
                              label="Other Names"
                              style={{
                                width: "85%",
                                margin: "20px",
                              }}
                            />
                          </div>
                          <div className="inpts_on_right">
                            <FormControl
                              variant="outlined"
                              label="role"
                              style={{
                                width: "85%",
                                margin: "20px",
                              }}
                            >
                              <InputLabel id="role">Role</InputLabel>
                              <Select
                                inputProps={{
                                  name: "role",
                                }}
                                label="Role"
                                id="select_role"
                                defaultValue=""
                              >
                                <MenuItem value="teacher">Admin</MenuItem>
                                <MenuItem value="teacher">Teacher</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default NewSale;
