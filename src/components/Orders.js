import React, { Component } from "react";
import Header from "./Header";
import OrderTable from "./tables/OrderTable";
import OrderCreateModal from "./modals/OrderCreateModal";
import axios from '../config/axios';
import Button from 'react-bootstrap/Button';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            products: [],
            modalShow: false,
        };
        this.setModalShow = this.setModalShow.bind(this)
      }

      componentDidMount = async () => {
        const res = await axios.get('/logistic/customer/list')
        const res1 = await axios.get('/logistic/product/list')
        this.setState({customers: res.data, products: res1.data})
      }
    
      setModalShow = (value) => {
        this.setState({modalShow: value})
      }     

  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex justify-end">
                <Button variant="success" className="bg-green-700" onClick={() => this.setModalShow(true)}>Add Order</Button>
            </div>
            <div className="w-full flex items-center justify-center">
                <OrderTable />
            </div>
        </div>
        <div></div>
        <OrderCreateModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
            customers={this.state.customers}
            products={this.state.products}
        />
      </div>
    );
  }
  
}

export default Orders;
