import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from "react";
import { CloseButton } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../config/axios';

class CountryCreateModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
          records: [],
          distance: [],
          dutyFee: [],
          name: null
      };
    }
    componentDidMount = async () => {
        const res = await axios.get("/logistic/country/list")
            if (res) 
                this.setState({records: res.data})
    }


    handleClick = async () => {
        const data = {
            name: this.state.name,
            distance: this.state.distance,
            duty_fee: this.state.dutyFee,
        }
        const res = await axios.post("/logistic/country/create",data)
        console.log(res)
            if (res)
                window.location.href = "/countries"
    }
    onChangeDistance = (e, index) => {
        const newDistance = [
            ...this.state.distance.slice(0, index),
            e.target.value, 
            ...this.state.distance.slice(index + 1)
          ]
        
        this.setState({ distance: newDistance })
    }

    onChangeDutyFee = (e, index) => {
        const newDutyFee = [
            ...this.state.dutyFee.slice(0, index),
            e.target.value, 
            ...this.state.dutyFee.slice(index + 1)
          ]
        
        this.setState({ dutyFee: newDutyFee })
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
                  Add Country
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body className='flex flex-col gap-y-4'>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Name</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' onChange={(e) => {this.setState({name: e.target.value})}}/>
                  </div>
                  {
                      this.state.records.map((country, i) => {
                          return(
                              <div key={country.id} className='text-sm flex flex-col gap-y-2'>
                                  <label className='font-semibold'>{country.name}</label>
                                  <div className='flex gap-x-2 items-center justify-between w-full'>
                                      <div className='flex w-full gap-x-2 items-center'>
                                          <label>Distance</label>
                                          <input type="text" name="distance[]" className='w-1/2 py-1 px-2 outline-none border rounded-md' onChange={(e) => this.onChangeDistance(e,i)}/>
                                      </div>
                                      <div className='flex w-full gap-x-2 items-center'>
                                          <label>Duty Fee</label>
                                          <input type="text" name="duty_fee[]" className='w-1/2 py-1 px-2 outline-none border rounded-md' onChange={(e) => this.onChangeDutyFee(e,i)}/>
                                      </div>
                                  
                                  </div>
                              </div>
                          )
                      })
                  }
                
              </Modal.Body>
              <Modal.Footer>
                <Button id="save-button" className="bg-green-700" variant="success" onClick={() => this.handleClick()}>Add</Button>
              </Modal.Footer>
            </Modal>
          );
    }   
    
  }

export default CountryCreateModal