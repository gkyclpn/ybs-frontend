import React, { Component } from "react";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import TransportFeeCreateModal from "./modals/TransportFeeCreateModal";
import TransportFeeTable from "./tables/TransportFeeTable";
import TransportFeeEditModal from "./modals/TransportFeeEditModal"
import axios from '../config/axios';

class TransportFees extends Component {
  constructor(props) {
    super(props);
    this.state = {
        transports: [],
        stores: [],
        modalShow: false,
        modalTransportFeeEdit: false,
    };
    this.setModalShow = this.setModalShow.bind(this)
    this.setModalTransportFeeEdit = this.setModalTransportFeeEdit.bind(this)
  }

  componentDidMount = async () => {
    const res = await axios.get('/logistic/transport/list')
    const res1 = await axios.get('/logistic/store/list')
    this.setState({transports: res.data, stores: res1.data})
  }

  setModalShow = (value) => {
    this.setState({modalShow: value})
  }
  setModalTransportFeeEdit = (value) => { 
    this.setState({modalTransportFeeEdit: value})
  }
  setClickedTransportFeeId = (id) => {
    this.setState({clickedTransportFeeId: id})
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex justify-end">
                <Button variant="success" className="bg-green-700" onClick={() => this.setModalShow(true)}>Add Transport Fee</Button>
            </div>
            <div className="w-full flex items-center justify-center">
                <TransportFeeTable setClickedTransportFeeId={this.setClickedTransportFeeId} setModalTransportFeeEdit={this.setModalTransportFeeEdit} />
            </div>
        </div>
        <div></div>
        <TransportFeeCreateModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
            transports={this.state.transports}
            stores={this.state.stores}
        />
        <TransportFeeEditModal
            show={this.state.modalTransportFeeEdit}
            onHide={() => this.setModalTransportFeeEdit(false)}
            transport_fee_id={this.state.clickedTransportFeeId}
            transports={this.state.transports}
            stores={this.state.stores}
        />
      </div>
    );
  }
  
}

export default TransportFees;
