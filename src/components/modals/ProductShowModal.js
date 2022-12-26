import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from "react";
import { CloseButton } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../config/axios';
import ProductShowTable from "../tables/ProductShowTable";

class ProductShowModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
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
                  Product Stocks
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body >
                <ProductShowTable product_id={this.props.product_id} /> 
              </Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
          );
    }   
    
  }

export default ProductShowModal