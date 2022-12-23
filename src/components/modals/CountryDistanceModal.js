import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from "react";
import { CloseButton } from 'react-bootstrap';
import CountryDistanceTable from "../tables/CountryDistanceTable";
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../config/axios';

class CountryDistanceModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
          records: [],
          distance: [],
          dutyFee: [],
          name: null
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
                  Country Distances
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body >
                <CountryDistanceTable country_id={this.props.country_id} />
              </Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
          );
    }   
    
  }

export default CountryDistanceModal