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
        transport_id: null,
        store1_id: null,
        store2_id: null,
        fee: null
      };
    }

    componentDidUpdate(prevProps) {
      if(this.props.transport_fee_id !== prevProps.transport_fee_id) {
        this.getTransportFee();
      }
    } 
  
    getTransportFee = async () => {
      const data = {
        id: this.props.transport_fee_id 
      }
      const res1 = await axios.post("/logistic/transport_fee/one",data)
      if (res1) 
        this.setState({transport_id: res1.data.transport_id, store1_id: res1.data.store1_id, store2_id: res1.data.store2_id, fee: res1.data.fee})
    }

    handleClick = async () => {
      const data = {
        id: this.props.transport_fee_id,
        transport_id: this.state.transport_id,
        store1_id: this.state.store1_id,
        store2_id: this.state.store2_id,
        fee: this.state.fee
      }
      const res1 = await axios.post("/logistic/transport_fee/update",data)
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
                  Edit Transport Fee
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body className='flex flex-col gap-y-8'>
                  
              <div className='text-sm flex flex-col gap-y-2'>
                      <label>Transport</label>
                      <select value={this.state.transport_id ? this.state.transport_id : ""} onChange={(e) => this.setState({transport_id: e.target.value})} >
                          <option value="-1" disabled>Select</option>
                          {
                              this.props.transports.map((transport) => {
                                  return(
                                      <option key={transport.id} value={transport.id}>{transport.name}</option>
                                  )
                              })
                          }
                      </select>

                  </div>

                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>1st Store</label>
                      <select value={this.state.store1_id ? this.state.store1_id : ""} onChange={(e) => this.setState({store1_id: e.target.value})} >
                          <option value="-1" disabled>Select</option>
                          {
                              this.props.stores.map((store) => {
                                  return(
                                      <option key={"1_" + store.id} value={store.id}>{store.name}</option>
                                  )
                              })
                          }
                      </select>

                  </div>

                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>2nd Store</label>
                      <select value={this.state.store2_id ? this.state.store2_id : ""} onChange={(e) => this.setState({store2_id: e.target.value})} >
                          <option value="-1" disabled>Select</option>
                          {
                              this.props.stores.map((store) => {
                                  return(
                                      <option key={"2_" + store.id} value={store.id}>{store.name}</option>
                                  )
                              })
                          }
                      </select>

                  </div>

                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Fee</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' value={this.state.fee ? this.state.fee : ""} onChange={(e) => this.setState({fee: e.target.value})}  />
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