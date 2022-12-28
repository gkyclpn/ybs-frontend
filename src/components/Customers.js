import React, { Component } from "react";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import CustomerCreateModal from "./modals/CustomerCreateModal";
import CustomerTable from "./tables/CustomerTable";
import CustomerEditModal from "./modals/CustomerEditModal"
import axios from '../config/axios';

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
        countries: [],
        modalShow: false,
        modalCustomerEdit: false,
    };
    this.setModalShow = this.setModalShow.bind(this)
    this.setModalCustomerEdit = this.setModalCustomerEdit.bind(this)
  }

  componentDidMount = async () => {
    const res = await axios.get('/logistic/country/list')
    this.setState({countries: res.data})
  }
  setModalShow = (value) => {
    this.setState({modalShow: value})
  }
  setModalCustomerEdit = (value) => { 
    this.setState({modalCustomerEdit: value})
  }
  setClickedCustomerId = (id) => {
    this.setState({clickedCustomerId: id})
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex justify-end">
                <Button variant="success" className="bg-green-700" onClick={() => this.setModalShow(true)}>Add Customer</Button>
            </div>
            <div className="w-full flex items-center justify-center">
                <CustomerTable setClickedCustomerId={this.setClickedCustomerId} setModalCustomerEdit={this.setModalCustomerEdit} />
            </div>
        </div>
        <div></div>
        <CustomerCreateModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
        />
   
        <CustomerEditModal
            show={this.state.modalCustomerEdit}
            onHide={() => this.setModalCustomerEdit(false)}
            customer_id={this.state.clickedCustomerId}
            countries={this.state.countries}
        />
      </div>
    );
  }
  
}

export default Customers;
