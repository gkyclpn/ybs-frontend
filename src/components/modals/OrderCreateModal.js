import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from "react";
import { CloseButton } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../config/axios';

class OrderCreateModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        customer_id: null,
        product_id: null,
        amount: null,
        error: false,
        errorContent: null
      };
    }

    handleClick = async () => {
      let data = {
        customer_id: this.state.customer_id
      }
      const res = await axios.post("/logistic/customer/one",data)
      let customer_country_id = res.data.country_id
      data = {
        customer_id: this.state.customer_id,
        country_id: customer_country_id,
        product_id: this.state.product_id,
        amount: this.state.amount
      }
      const res1 = await axios.post("/logistic/order/create",data)
      if (res1.status === 200)
        window.location.reload()
      else
        this.setState({error: true, errorContent: res1.response.data})
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
                  Create Order
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body className='flex flex-col gap-y-8'>
                  
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Customer</label>
                      <select defaultValue="-1" onChange={(e) => this.setState({customer_id: e.target.value})} >
                          <option value="-1" disabled>Select</option>
                          {
                              this.props.customers.map((customer) => {
                                  return(
                                      <option key={customer.id} value={customer.id}>{customer.name}</option>
                                  )
                              })
                          }
                      </select>

                  </div>

                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Product</label>
                      <select defaultValue="-1" onChange={(e) => this.setState({product_id: e.target.value})} >
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
                      <label>Amount</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' onChange={(e) => this.setState({amount: e.target.value})}  />
                  </div>

                
              </Modal.Body>
              <Modal.Footer className={this.state.error ? "flex justify-between" : ""}>
                <span className='text-red-600 font-semibold'>{this.state.errorContent}</span>
                <Button id="save-button" className="bg-green-700" variant="success" onClick={() => this.handleClick()}>Add</Button>
              </Modal.Footer>
            </Modal>
          );
    }   
    
  }

export default OrderCreateModal