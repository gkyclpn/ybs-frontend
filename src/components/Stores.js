import React, { Component } from "react";
import Header from "./Header";
import StoreTable from "./tables/StoreTable";
import Button from 'react-bootstrap/Button';
import StoreCreateModal from "./modals/StoreCreateModal";
import StoreShowModal from "./modals/StoreShowModal";
import StoreEditModal from "./modals/StoreEditModal";
import axios from '../config/axios';

class Stores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      modalShow: false,
      modalStoreShow: false,
      modalStoreEdit: false,
      clickedStoreId: null,
    };
    this.setModalShow = this.setModalShow.bind(this)
    this.setModalStoreShow = this.setModalStoreShow.bind(this)
    this.setModalStoreEdit = this.setModalStoreEdit.bind(this)
    this.setClickedStoreId = this.setClickedStoreId.bind(this)
  }

  componentDidMount = async () => {
    const res = await axios.get('/logistic/country/list')
    this.setState({countries: res.data})
  }


  setModalShow = (value) => {
    this.setState({modalShow: value})
  }
  setModalStoreShow = (value) => {
    this.setState({modalStoreShow: value})
  }
  setModalStoreEdit = (value) => { 
    this.setState({modalStoreEdit: value})
  }
  setClickedStoreId = (id) => {
    this.setState({clickedStoreId: id})
  }
  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex justify-end">
                <Button variant="success" className="bg-green-700" onClick={() => this.setModalShow(true)}>Add Store</Button>
            </div>
            <div className="w-full flex items-center justify-center">
                <StoreTable setModalStoreShow={this.setModalStoreShow} setModalStoreEdit={this.setModalStoreEdit} setClickedStoreId={this.setClickedStoreId} />
            </div>
        </div>
        <div></div>
        <StoreCreateModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
        />
        <StoreShowModal
            show={this.state.modalStoreShow}
            onHide={() => this.setModalStoreShow(false)}
            store_id={this.state.clickedStoreId}
        />
        <StoreEditModal
            show={this.state.modalStoreEdit}
            onHide={() => this.setModalStoreEdit(false)}
            store_id={this.state.clickedStoreId}
            countries={this.state.countries}
        />
      </div>
    );
  }
  
}

export default Stores;
