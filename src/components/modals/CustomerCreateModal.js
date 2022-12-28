import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from "react";
import { CloseButton } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../config/axios';

class CustomerCreateModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
          countries: [],
          country_id: -1,
          name: null
      };
    }
    componentDidMount = async () => {
        const res = await axios.get("/logistic/country/list")
            if (res) 
                this.setState({countries: res.data})
    }


    handleClick = async () => {
        const data = {
            name: this.state.name,
            country_id: this.state.country_id
        }
        const res = await axios.post("/logistic/customer/create",data)
        console.log(res)
            if (res)
                window.location.href = "/customers"
    }
    onChangeCountry= (e)=>{
        this.setState({country_id:e.target.value});
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
                  Add Customer
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body className='flex flex-col gap-y-8'>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Name</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' onChange={(e) => {this.setState({name: e.target.value})}}/>
                  </div>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Country</label>
                      <select value={this.state.country_id} onChange={this.onChangeCountry} >
                          <option value="-1" disabled>Select</option>
                          {
                              this.state.countries.map((country) => {
                                  return(
                                      <option key={country.id} value={country.id}>{country.name}</option>
                                  )
                              })
                          }
                      </select>

                  </div>

                
              </Modal.Body>
              <Modal.Footer>
                <Button id="save-button" className="bg-green-700" variant="success" onClick={() => this.handleClick()}>Add</Button>
              </Modal.Footer>
            </Modal>
          );
    }   
    
  }

export default CustomerCreateModal