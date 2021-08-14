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
      classes: [],
      formData: [],
      total: 0,
      discount: 0,
    };
    this.classes();
  }

  async classes() {
    const res = (await UsersApi.data("/user/admin/classes")) || [];
    if (res) {
      this.setState({ ...this.state, classes: res === "Error" ? [] : res });
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
    let res = await api.post("/user/admin/classes/new", _fcontent);
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
        <Nav active="sale" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid">
              <div className="card">
                <div className="card-header">
                  <h3>Classes</h3>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Refresh
                  </Button>
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
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div className="card-header">
                    <h3>New Class</h3>
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
                        <h4>Class Info.</h4>
                        <div className="inputs_ctr">
                          <div className="inpts_on_left">
                            <TextField
                              name="class_name"
                              variant="outlined"
                              label="Class Name (e.g LCS-19)"
                              style={{
                                width: "85%",
                                margin: "20px",
                              }}
                              onChange={(e) => {
                                if (e.target.value.length === 6)
                                  this.setState({
                                    ...this.state,
                                    code: e.target.value.substring(0, 3),
                                  });
                              }}
                            />
                            <FormControl
                              variant="outlined"
                              label="faculty"
                              style={{
                                width: "85%",
                                margin: "20px",
                              }}
                            >
                              <InputLabel id="faculty">Faculty</InputLabel>
                              <Select
                                inputProps={{
                                  name: "faculty",
                                }}
                                label="Faculty"
                                id="select_faculty"
                                defaultValue=""
                              >
                                <MenuItem value="fms">
                                  Management Sciences
                                </MenuItem>
                                <MenuItem value="edu">Education</MenuItem>
                                <MenuItem value="hth">Health Sciences</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="inpts_on_right">
                            <TextField
                              disabled={this.state.code ? false : true}
                              name="code"
                              variant="outlined"
                              label="Code"
                              value={this.state.code ? this.state.code : ""}
                              style={{
                                width: "85%",
                                margin: "20px",
                              }}
                            />
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
