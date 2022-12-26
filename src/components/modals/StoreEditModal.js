import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from "react";
import { CloseButton } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai'
import axios from '../../config/axios';

class StoreEditModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        countries: [],
        name: null,
        country_id: null,
        store_id: null
      };
    }

    componentDidUpdate(prevProps) {
      if(this.props.store_id !== prevProps.store_id) {
        this.getStore();
      }
    } 
  
    getStore = async () => {
      const data = {
        store_id: this.props.store_id 
      }
      const res1 = await axios.post("/logistic/store/one",data)
      if (res1) 
        this.setState({name: res1.data.name, country_id: res1.data.country_id})
    }

    onChangeCountry = (e) => {
      this.setState({country_id:e.target.value});
    }

    handleClick = async () => {
      const data = {
        id: this.props.store_id,
        name: this.state.name,
        country_id: this.state.country_id 
      }
      const res1 = await axios.post("/logistic/store/update",data)
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
                  Edit Store
                </Modal.Title>
                <CloseButton className='font-semibold text-xl' onClick={this.props.onHide}>
                  <AiOutlineClose />
                </CloseButton>
              </Modal.Header>
              <Modal.Body className='flex flex-col gap-y-8'>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Name</label>
                      <input type="text" name="name" className='w-1/2 py-1 px-2 outline-none border rounded-md' defaultValue={this.state.name} onChange={(e) => this.setState({name: e.target.value})}  />
                  </div>
                  <div className='text-sm flex flex-col gap-y-2'>
                      <label>Country</label>
                      <select value={this.state.country_id ? this.state.country_id : ""} onChange={(e) => this.onChangeCountry(e)} >
                          <option value="1" disabled>Select</option>
                          {
                              this.props.countries.map((country) => {
                                  return(
                                      <option key={country.id} value={country.id}>{country.name}</option>
                                  )
                              })
                          }
                      </select>

                  </div>

                
              </Modal.Body>
              <Modal.Footer>
                <Button id="save-button" className="bg-green-700" variant="success" onClick={() => this.handleClick()}>Update</Button>
              </Modal.Footer>
            </Modal>
          );
    }   
    
  }

export default StoreEditModal