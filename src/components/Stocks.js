import React, { Component } from "react";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import StockTable from "./tables/StockTable";
import StockEditModal from "./modals/StockEditModal";
import StockCreateModal from "./modals/StockCreateModal";
import axios from '../config/axios';

class Stocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
        products: [],
        stores: [],
        modalShow: false,
        modalStockEdit: false,
    };
    this.setModalShow = this.setModalShow.bind(this)
    this.setModalStockEdit = this.setModalStockEdit.bind(this)
  }

  componentDidMount = async () => {
    const res = await axios.get('/logistic/product/list')
    const res1 = await axios.get('/logistic/store/list')
    this.setState({products: res.data, stores: res1.data})
  }

  setModalShow = (value) => {
    this.setState({modalShow: value})
  }
  setModalStockEdit = (value) => { 
    this.setState({modalStockEdit: value})
  }
  setClickedStockId = (id) => {
    this.setState({clickedStockId: id})
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex justify-end">
                <Button variant="success" className="bg-green-700" onClick={() => this.setModalShow(true)}>Add Stock</Button>
            </div>
            <div className="w-full flex items-center justify-center">
                <StockTable setClickedStockId={this.setClickedStockId} setModalStockEdit={this.setModalStockEdit} setModalStockShow={this.setModalStockShow}  />
            </div>
        </div>
        <div></div>
        <StockCreateModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
            products={this.state.products}
            stores={this.state.stores}
        />
        <StockEditModal
            show={this.state.modalStockEdit}
            onHide={() => this.setModalStockEdit(false)}
            stock_id={this.state.clickedStockId}
            products={this.state.products}
            stores={this.state.stores}
        />
      </div>
    );
  }
  
}

export default Stocks;
