import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/users";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AnchorEl: null,
      AnchorElDrugs: null,
      date: "...",
      month: "...",
      year: "...",
      daily_purchases: 0,
      daily_expenses: 0,
      daily_products: 0,
      monthly_products: 0,
      annual_products: 0,
      monthly_purchases: 0,
      monthly_expenses: 0,
      annual_expenses: 0,
      annual_purchases: 0,
    };
    this.products();
    this.purchases();
    this.sales();
  }

  async products() {
    const res = (await UsersApi.data("/user/all/products")) || [];
    let products_daily = 0;
    let products_monthly = 0;
    let products_annual = 0;
    res === "Error"
      ? this.setState({ ...this.state, daily_products: 0 })
      : res.forEach((e) => {
          if (
            new Date(parseInt(e.product_date)).getDate() ===
            new Date(Date.now()).getDate()
          ) {
            products_daily++;
          }
          if (
            new Date(parseInt(e.product_date)).getMonth() ===
            new Date(Date.now()).getMonth()
          ) {
            products_monthly++;
          }
          if (
            new Date(parseInt(e.product_date)).getFullYear() ===
            new Date(Date.now()).getFullYear()
          ) {
            products_annual++;
          }
        });
    this.setState({
      ...this.state,
      year: new Date(Date.now()).getFullYear(),
      daily_products: products_daily,
      monthly_products: products_monthly,
      annual_products: products_annual,
      date:
        new Date(Date.now()).getDate() +
        "/" +
        (new Date(Date.now()).getMonth() + 1) +
        "/" +
        new Date(Date.now()).getFullYear(),
    });
    if (new Date(Date.now()).getMonth() === 0) {
      this.setState({ ...this.state, month: "January" });
    } else if (new Date(Date.now()).getMonth() === 1) {
      this.setState({ ...this.state, month: "February" });
    } else if (new Date(Date.now()).getMonth() === 2) {
      this.setState({ ...this.state, month: "March" });
    } else if (new Date(Date.now()).getMonth() === 3) {
      this.setState({ ...this.state, month: "April" });
    } else if (new Date(Date.now()).getMonth() === 4) {
      this.setState({ ...this.state, month: "May" });
    } else if (new Date(Date.now()).getMonth() === 5) {
      this.setState({ ...this.state, month: "June" });
    } else if (new Date(Date.now()).getMonth() === 6) {
      this.setState({ ...this.state, month: "July" });
    } else if (new Date(Date.now()).getMonth() === 7) {
      this.setState({ ...this.state, month: "August" });
    } else if (new Date(Date.now()).getMonth() === 8) {
      this.setState({ ...this.state, month: "September" });
    } else if (new Date(Date.now()).getMonth() === 9) {
      this.setState({ ...this.state, month: "October" });
    } else if (new Date(Date.now()).getMonth() === 10) {
      this.setState({ ...this.state, month: "November" });
    } else if (new Date(Date.now()).getMonth() === 11) {
      this.setState({ ...this.state, month: "December" });
    }
  }

  async purchases() {
    const res = (await UsersApi.data("/user/all/purchases")) || [];
    let purchase_daily = 0;
    let expense_daily = 0;
    let purchase_monthly = 0;
    let expense_monthly = 0;
    let purchase_annual = 0;
    let expense_annual = 0;
    res === "Error"
      ? this.setState({ ...this.state, daily_purchases: 0, daily_expenses: 0 })
      : res.forEach((e) => {
          if (
            new Date(parseInt(e.purchase_date)).getDate() ===
            new Date(Date.now()).getDate()
          ) {
            purchase_daily++;
            expense_daily += e.purchase_amount;
          }
          if (
            new Date(Date.now()).getMonth() ===
            new Date(parseInt(e.purchase_date)).getMonth()
          ) {
            purchase_monthly++;
            expense_monthly += e.purchase_amount;
          }
          if (
            new Date(Date.now()).getFullYear() ===
            new Date(parseInt(e.purchase_date)).getFullYear()
          ) {
            purchase_annual++;
            expense_annual += e.purchase_amount;
          }
        });
    this.setState({
      ...this.state,
      daily_purchases: purchase_daily,
      daily_expenses: expense_daily,
      monthly_expenses: expense_monthly,
      monthly_purchases: purchase_monthly,
      annual_expenses: expense_annual,
      annual_purchases: purchase_annual,
    });
  }

  async sales() {
    const res = (await UsersApi.data("/user/all/sales")) || [];
    if (res) {
      this.setState({ ...this.state, sales_number: res.length });
    }
  }

  render() {
    return (
      <>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="reports" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Daily Report</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-haspopup="true"
                    >
                      print
                      <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                        <span className="las la-print"></span>
                      </span>
                    </Button>
                  </div>
                  <div className="card-body">
                    <div className="">
                      <table width="100%">
                        <tr>
                          <td>
                            <span
                              style={{ fontWeight: "bolder", color: "red" }}
                            >
                              Date:
                            </span>
                            {`  ${this.state.date}`}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Purchases:
                            </span>
                            {`  ${this.state.daily_purchases}`}
                          </td>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Sales:
                            </span>
                            20000
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Expenses:
                            </span>
                            {`  UGX ${this.state.daily_expenses}`}
                          </td>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Income:
                            </span>
                            UGX 20000000
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Products Registered:
                            </span>
                            {`  ${this.state.daily_products}`}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Monthly Report</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-controls="reception-actions"
                      aria-haspopup="true"
                    >
                      print
                      <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                        <span className="las la-print"></span>
                      </span>
                    </Button>
                  </div>
                  <div className="card-body">
                    <div className="">
                      <table width="100%">
                        <tr>
                          <td>
                            <span
                              style={{ fontWeight: "bolder", color: "red" }}
                            >
                              Month:
                            </span>
                            {`  ${this.state.month}`}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Purchases:
                            </span>
                            {` ${this.state.monthly_purchases}`}
                          </td>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Sales:
                            </span>
                            20000
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Expenses:
                            </span>
                            {`  UGX ${this.state.monthly_expenses}`}
                          </td>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Income:
                            </span>
                            UGX 20000000
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Products Registered:
                            </span>
                            {`  ${this.state.monthly_products}`}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="recent-grid">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Annual Report</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-haspopup="true"
                    >
                      print
                      <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                        <span className="las la-print"></span>
                      </span>
                    </Button>
                  </div>
                  <div className="card-body">
                    <div className="">
                      <table width="100%">
                        <tr>
                          <td>
                            <span
                              style={{ fontWeight: "bolder", color: "red" }}
                            >
                              Year:
                            </span>
                            {`  ${this.state.year}`}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Purchases:
                            </span>
                            {`  ${this.state.annual_purchases}`}
                          </td>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Sales:
                            </span>
                            20000
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Expenses:
                            </span>
                            {`  UGX${this.state.annual_expenses}`}
                          </td>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Total Income:
                            </span>
                            UGX 20000000
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style={{ fontWeight: "bolder" }}>
                              Products Registered:
                            </span>
                            {`  ${this.state.annual_products}`}
                          </td>
                        </tr>
                      </table>
                    </div>
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
