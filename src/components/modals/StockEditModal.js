import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from "react";
import { CloseButton } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../config/axios';

class StockEditModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        product_id: null,
        store_id: null,
        stock: null
      };
    }

    componentDidUpdate(prevProps) {
      if(this.props.stock_id !== prevProps.stock_id) {
        this.getStock();
      }
    } 
  
    getStock = async () => {
      const data = {
        id: this.props.stock_id 
      }
      const res1 = await axios.post("/logistic/stock/one",data)
      if (res1) 
        this.setState({store_id: res1.data.store_id, product_id: res1.data.product_id, stock: res1.data.stock})
    }

    onChangeStoreId = (e) => {
      this.setState({store_id:e.target.value});
    }

    onChangeProductId = (e) => {
      this.setState({product_id:e.target.value});
    }

    handleClick = async () => {
      const data = {
        id: this.props.stock_id,
        product_id: this.state.product_id,
        store_id: this.state.store_id,
        stock: this.state.stock
      }
      const res1 = await axios.post("/logistic/stock/update",data)
      if (res1) 
        window.location.reload()
    }

    render() {
        return (
            <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Edit Stock
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body className='flex flex-col gap-y-8'>
                  
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Product</label>
                      <select value={this.state.product_id ? this.state.product_id : ""} onChange={(e) => this.onChangeProductId(e)} >
                          <option value="-1" disabled>Select</option>
                          {
                              this.props.products.map((product) => {
                                  return(
                                      <option key={product.id} value={product.id}>{product.name}</option>
                                  )
                              })
                          }
                      </select>

                  </div>

                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Store</label>
                      <select value={this.state.store_id ? this.state.store_id : ""} onChange={(e) => this.onChangeStoreId(e)} >
                          <option value="-1" disabled>Select</option>
                          {
                              this.props.stores.map((store) => {
                                  return(
                                      <option key={store.id} value={store.id}>{store.name}</option>
                                  )
                              })
                          }
                      </select>

                  </div>

                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Stock</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' value={this.state.stock} onChange={(e) => this.setState({stock: e.target.value})}  />
                  </div>

                
              </Modal.Body>
              <Modal.Footer>
                <Button id="save-button" className="bg-green-700" variant="success" onClick={() => this.handleClick()}>Update</Button>
              </Modal.Footer>
            </Modal>
          );
    }   
    
  }

export default StockEditModal