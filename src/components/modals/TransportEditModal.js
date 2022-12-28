import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from "react";
import { CloseButton } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../config/axios';

class TransportEditModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: null,
        transport_id: null
      };
    }

    componentDidUpdate(prevProps) {
      if(this.props.transport_id !== prevProps.transport_id) {
        this.getTransport();
      }
    } 
  
    getTransport = async () => {
      const data = {
        transport_id: this.props.transport_id 
      }
      const res1 = await axios.post("/logistic/transport/one",data)
      if (res1) 
        this.setState({name: res1.data.name})
    }

    handleClick = async () => {
      const data = {
        id: this.props.transport_id,
        name: this.state.name,
      }
      const res1 = await axios.post("/logistic/transport/update",data)
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
                  Edit Transport
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body className='flex flex-col gap-y-8'>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Name</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}  />
                  </div>
              </Modal.Body>
              <Modal.Footer>
                <Button id="save-button" className="bg-green-700" variant="success" onClick={() => this.handleClick()}>Update</Button>
              </Modal.Footer>
            </Modal>
          );
    }   
    
  }

export default TransportEditModal