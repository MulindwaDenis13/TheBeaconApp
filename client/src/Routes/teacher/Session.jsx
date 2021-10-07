import React, { Component, useState } from "react";
import { TextField, Snackbar, Button, IconButton } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/forms";
import UsersApi from "../../api/users";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
      form_visible: true,
      inputObj: { unit_price: "Select Product", product_id: "" },
      courses: [],
      formData: [],
      total: 0,
      discount: 0,
    };
    this.courses();
  }

  async courses() {
    const res = (await UsersApi.data("/user/admin/classes")) || [];
    if (res) {
      this.setState({ ...this.state, courses: res === "Error" ? [] : res });
    }
  }

  handleSale = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let content = {};
    fd.forEach((value, key) => {
      content[key] = value;
    });
    await this.setState({ ...this.state, _content: content });

    if (this.state.formData.length !== 0) {
      this.setState({
        ...this.state,
        _content: {
          ...this.state._content,
          products_sold: this.state.formData,
          date: Date.now(),
        },
      });
    }

    let api = new FormsApi();
    let res = await api.post("/user/sale/new_sale", this.state._content);
    if (res.status === true) {
      this.setState({
        ...this.state,
        open: true,
        message: res.data,
        messageState: "success",
      });
    } else {
      this.setState({
        ...this.state,
        open: true,
        message: res.data,
        messageState: "error",
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    const product_name = this.state.formData.find(
      (e) => e.product_name === _fcontent.product_name
    );
    if (!product_name) {
      this.setState({
        ...this.state,
        open: true,
        message: "Product Added",
        messageState: "success",
        formData: [...this.state.formData, _fcontent],
      });
    } else {
      this.setState({
        ...this.state,
        open: true,
        message: "Product Exists",
        messageState: "warning",
      });
    }
  };

  handleChangeDrugName = (e, v) => {
    this.setState({
      ...this.state,
      inputObj: {
        ...this.state.inputObj,
        unit_price: v.unit_price,
        product_id: v.product_id,
      },
    });
  };

  getTotals() {
    let total = 0;
    if (this.state.formData.length !== 0) {
      this.state.formData.forEach((e) => {
        total += parseInt(e.unit_price) * parseInt(e.qty);
      });
    }
    return total;
  }

  closePopUp = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ ...this.state, open: false });
  };

  print() {
    window.print();
  }

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
        <Nav active="session" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid">
              <div className="card">
                <div className="card-header">
                  <h3>Orders List</h3>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                    onClick={this.print}
                  >
                    <span style={{ fontSize: "17.5px", marginRight: "10px" }}>
                      <i className="las la-print"></i>
                    </span>
                    Print List
                  </Button>
                </div>
                <div className="card-body">
                  <table width="100%">
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Qty</td>
                        <td>Unit Price(Shs)</td>
                        <td>Total(Shs)</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.formData.length === 0 ? (
                        <tr>
                          <td>No Student Attended</td>
                        </tr>
                      ) : (
                        this.state.formData.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td className="name_cell">{v.product_name}</td>
                              <td>{v.qty}</td>
                              <td>{v.unit_price}</td>
                              <td>
                                {parseInt(v.unit_price) * parseInt(v.qty)}
                              </td>
                              <td>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    let arr = this.state.formData;
                                    arr.splice(i, 1);
                                    this.setState({
                                      ...this.state,
                                      formData: arr,
                                    });
                                  }}
                                >
                                  Remove
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
                  <div className="card-header card-header-payments">
                    <h3 className="class_payment_header">New Session</h3>
                    <div className="">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: "20px" }}
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            form_visible: !this.state.form_visible,
                          });
                        }}
                      >
                        <span
                          style={{ fontSize: "17.5px", marginRight: "10px" }}
                        >
                          <i className="las la-plus-circle"></i>
                        </span>
                        {this.state.form_visible ? "Hide" : "Show"}
                      </Button>
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
                        Start
                      </Button>
                    </div>
                  </div>
                  <div
                    className="card-body"
                    style={
                      this.state.form_visible
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <div>
                      <div className="inputCtr">
                        <h4>Session Details</h4>
                        <div className="inputs_ctr">
                          <div className="inpts_on_left">
                            <Autocomplete
                              id="combo-box-demo"
                              options={this.state.courses}
                              getOptionLabel={(option) => option.course_name}
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Course"
                                  name="course"
                                  variant="outlined"
                                />
                              )}
                            />
                            <TextField
                              name="session_name"
                              variant="outlined"
                              value={this.state.inputObj.unit_price}
                              label="Session Name(Topic)"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                          </div>
                          <div className="inpts_on_right">
                            <TextField
                              type="time"
                              name="start_time"
                              variant="outlined"
                              helperText="Starts At"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                            <TextField
                              type="time"
                              name="end_time"
                              variant="outlined"
                              helperText="Ends At"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <form
                  className="card"
                  style={{ marginTop: "20px" }}
                  onSubmit={this.handleSale}
                >
                  <div className="card-header card-header-payments">
                    <h3 className="class_payment_header">Active Session</h3>
                    <div className="">
                      <Button type="submit" variant="contained" color="primary">
                        End Class
                        <span style={{ fontSize: "15px", marginLeft: "10px" }}>
                          <i className="las la-angle-double-right"></i>
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="_finish_purchase_ctr">
                    <TextField
                      name="student_number"
                      variant="outlined"
                      label="Students In Class"
                      style={{
                        width: "75%",
                        margin: "20px",
                      }}
                    />
                    <TextField
                      name="session_name"
                      variant="outlined"
                      label="Session"
                      style={{
                        width: "75%",
                        margin: "20px",
                      }}
                    />
                    <TextField
                      name="session_time"
                      variant="outlined"
                      label="Session Time"
                      style={{
                        width: "75%",
                        margin: "20px",
                      }}
                    />
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

function Finish({ t }) {
  const [discount, setDiscount] = useState(0);
  return (
    <div className="_finish_purchase_ctr">
      <TextField
        name="total_amount"
        variant="outlined"
        label="Total"
        value={t}
        style={{
          width: "75%",
          margin: "20px",
        }}
      />
      <TextField
        name="discount"
        variant="outlined"
        label="Discount"
        type="number"
        onChange={(e) => {
          setDiscount(parseInt(e.target.value) || 0);
        }}
        style={{
          width: "75%",
          margin: "20px",
        }}
      />
      <TextField
        name="pay_amount"
        variant="outlined"
        label="Amount to Be Paid"
        value={t - discount}
        style={{
          width: "75%",
          margin: "20px",
        }}
      />
    </div>
  );
}
