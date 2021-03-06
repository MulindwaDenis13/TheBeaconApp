import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/users";

class AllSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      sales: [],
    };
    this.sales();
  }

  async sales() {
    const res = (await UsersApi.data("/user/all/sales")) || [];
    if (res) {
      this.setState({ ...this.state, sales: res === "Error" ? [] : res });
    }
  }

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  render() {
    return (
      <>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="dashboard" />
        <div className="main-content">
          <Header />
          <main>
            <div className="fullwidth-ctr">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Sales Made</h3>
                    <Button variant="contained" color="primary">
                      <span style={{ fontSize: "17.5px", marginRight: "10px" }}>
                        <span className="las la-print"></span>
                      </span>
                      print
                    </Button>
                  </div>
                  <div className="card-body">
                    <table style={{ width: "85%", margin: "auto" }}>
                      <thead>
                        <tr>
                          <td>#</td>
                          <td>Total</td>
                          <td>Discont</td>
                          <td>Paid</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.sales.length === 0 ? (
                          <tr>
                            <td>No Sale Made</td>
                          </tr>
                        ) : (
                          this.state.sales.map((v, i) => {
                            return (
                              <>
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{v.sales_amount}</td>
                                  <td>{v.sales_discount}</td>
                                  <td>{v.amount_paid}</td>
                                  <td>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={(e) => {
                                        this.setState({
                                          ...this.state,
                                          open: true,
                                          dialog_data: v,
                                        });
                                      }}
                                    >
                                      Details
                                    </Button>
                                  </td>
                                </tr>
                              </>
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
        {this.state.dialog_data ? (
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Sale Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Product</td>
                      <td>Qty</td>
                      <td>Selling Unit</td>
                      <td>Amount</td>
                      <td>Sale Type</td>
                    </tr>
                  </thead>
                  <tbody>
                    {JSON.parse(this.state.dialog_data.products_sold).map(
                      (v, i) => {
                        return (
                          <>
                            <tr key={i}>
                              <td>{v.product_name}</td>
                              <td>{v.qty}</td>
                              <td>{v.selling_unit}</td>
                              <td>{v.product_price}</td>
                              <td>{v.sale_type}</td>
                            </tr>
                          </>
                        );
                      }
                    )}
                  </tbody>
                </table>
                <hr />
                <div className="">
                  <table>
                    <tr>
                      <td>
                        {`Total Amount: UGX ${this.state.dialog_data.sales_amount}`}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Discount: UGX {this.state.dialog_data.sales_discount}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Amount Paid: UGX {this.state.dialog_data.amount_paid}
                      </td>
                    </tr>
                  </table>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default AllSales;
