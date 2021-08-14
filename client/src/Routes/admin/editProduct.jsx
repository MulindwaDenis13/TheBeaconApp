import React, { Component } from "react";
import { TextField, Snackbar, Button, IconButton } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/forms";
import UsersApi from "../../api/users";
import "../../design/forms.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait...",
      messageState: "",
      product: {},
    };
    this.drug();
  }

  async drug() {
    let id = parseInt(
      new URLSearchParams(window.location.search).get("product-id")
    );
    const [res] = await UsersApi.data(`/user/all/product/${id}`);
    if (res) {
      this.setState({ ...this.state, product: res === "Error" ? {} : res });
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
    let id = parseInt(
      new URLSearchParams(window.location.search).get("product-id")
    );
    let api = new FormsApi();
    let res = await api.post(`/user/sale/edit_product/${id}`, _fcontent);
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
    this.setState({ ...this.state, open: false });
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
        <Nav active="dashboard" />
        <div className="main-content">
          <Header />
          <main>
            <div className="fullwidth-ctr">
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div
                    className=""
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "1rem",
                    }}
                  >
                    <div className="form-header-ctr">
                      <div className="">
                        <h3>Edit Product</h3>
                      </div>
                      <div className="">
                        <Button
                          type="submit"
                          aria-describedby={this.id}
                          variant="contained"
                          color="primary"
                          style={{ marginInline: 10 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          aria-describedby={this.id}
                          variant="contained"
                          color="primary"
                          style={{ marginInline: 10 }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="inputCtr">
                        <h4>Drug Details</h4>
                        <div className="inputs_ctr">
                          <div className="inpts_on_left">
                            <TextField
                              name="product_name"
                              variant="outlined"
                              label="Product name"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                              value={this.state.product.product_name}
                              onChange={(e) => {
                                this.setState({
                                  ...this.state,
                                  product: {
                                    ...this.state.product,
                                    product_name: e.target.value,
                                  },
                                });
                              }}
                            />
                            <TextField
                              name="qty"
                              variant="outlined"
                              label="Quantity"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                              value={this.state.product.quantity}
                              onChange={(e) => {
                                this.setState({
                                  ...this.state,
                                  product: {
                                    ...this.state.product,
                                    quantity: e.target.value,
                                  },
                                });
                              }}
                            />
                            <TextField
                              type="number"
                              name="cost_price"
                              variant="outlined"
                              label="Cost Price"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                              value={this.state.product.cost_price}
                              onChange={(e) => {
                                this.setState({
                                  ...this.state,
                                  product: {
                                    ...this.state.product,
                                    cost_price: e.target.value,
                                  },
                                });
                              }}
                            />
                            <TextField
                              type="number"
                              name="unit_price"
                              variant="outlined"
                              label="Unit Price"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                              value={this.state.product.unit_price}
                              onChange={(e) => {
                                this.setState({
                                  ...this.state,
                                  product: {
                                    ...this.state.product,
                                    unit_price: e.target.value,
                                  },
                                });
                              }}
                            />
                          </div>
                          <div className="inpts_center">
                            <TextField
                              name="description"
                              variant="outlined"
                              label="Product Description"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                              value={this.state.product.product_description}
                              onChange={(e) => {
                                this.setState({
                                  ...this.state,
                                  product: {
                                    ...this.state.product,
                                    product_description: e.target.value,
                                  },
                                });
                              }}
                            />
                            <TextField
                              name="expiry_date"
                              variant="outlined"
                              helperText="Expiry Date"
                              type="date"
                              style={{
                                width: "75%",
                                margin: "20px 20px 0px 20px",
                              }}
                              value={this.state.product.expiry_date}
                              onChange={(e) => {
                                this.setState({
                                  ...this.state,
                                  product: {
                                    ...this.state.product,
                                    expiry_date: e.target.value,
                                  },
                                });
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

export default EditProduct;
