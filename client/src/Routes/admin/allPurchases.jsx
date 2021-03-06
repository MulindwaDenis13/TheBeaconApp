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

class AllPurchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      purchases: [],
    };
    this.purchases();
  }
  async purchases() {
    const res = (await UsersApi.data("/user/all/purchases")) || [];
    if (res) {
      this.setState({ ...this.state, purchases: res === "Error" ? [] : res });
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
                    <h3>Purchases Made</h3>
                  </div>
                  <div className="card-body">
                    <table style={{ width: "85%", margin: "auto" }}>
                      <thead>
                        <tr>
                          <td>#</td>
                          <td>Total</td>
                          <td>Discont</td>
                          <td>Paid</td>
                          <td>Details</td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.purchases.length === 0 ? (
                          <tr>
                            <td>No Purchase Made</td>
                          </tr>
                        ) : (
                          this.state.purchases.map((v, i) => {
                            return (
                              <>
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{v.purchase_t_amount}</td>
                                  <td>{v.purchase_discount}</td>
                                  <td>{v.purchase_amount}</td>
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
            <DialogTitle id="form-dialog-title">Purchase Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Product</td>
                      <td>Qty</td>
                      <td>Selling Unit</td>
                      <td>Amount</td>
                    </tr>
                  </thead>
                  <tbody>
                    {JSON.parse(this.state.dialog_data.products_purchased).map(
                      (v, i) => {
                        return (
                          <>
                            <tr key={i}>
                              <td>{v.product_name}</td>
                              <td>{v.qty}</td>
                              <td>{v.selling_unit}</td>
                              <td>{v.cost_price}</td>
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
                        {`Total Amount: UGX ${this.state.dialog_data.purchase_t_amount}`}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {`Discount: UGX ${this.state.dialog_data.purchase_discount}`}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {`Amount Paid: ${this.state.dialog_data.purchase_amount}`}
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

export default AllPurchases;
