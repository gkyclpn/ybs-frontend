import React, { Component } from "react";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
import TransportCreateModal from "./modals/TransportCreateModal";
import TransportTable from "./tables/TransportTable";
import TransportEditModal from "./modals/TransportEditModal"
import TransportShowModal from "./modals/TransportShowModal"
class Transports extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalShow: false,
        modalTransportEdit: false,
        modalTransportShow: false,
    };
    this.setModalShow = this.setModalShow.bind(this)
    this.setModalTransportEdit = this.setModalTransportEdit.bind(this)
    this.setModalTransportShow = this.setModalTransportShow.bind(this)
  }

  setModalShow = (value) => {
    this.setState({modalShow: value})
  }
  setModalTransportEdit = (value) => { 
    this.setState({modalTransportEdit: value})
  }
  setModalTransportShow = (value) => { 
    this.setState({modalTransportShow: value})
  }
  setClickedTransportId = (id) => {
    this.setState({clickedTransportId: id})
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex justify-end">
                <Button variant="success" className="bg-green-700" onClick={() => this.setModalShow(true)}>Add Transport</Button>
            </div>
            <div className="w-full flex items-center justify-center">
                <TransportTable setClickedTransportId={this.setClickedTransportId} setModalTransportEdit={this.setModalTransportEdit} setModalTransportShow={this.setModalTransportShow}  />
            </div>
        </div>
        <div></div>
        <TransportCreateModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
        />
        <TransportShowModal
            show={this.state.modalTransportShow}
            onHide={() => this.setModalTransportShow(false)}
            transport_id={this.state.clickedTransportId}
        />
        <TransportEditModal
            show={this.state.modalTransportEdit}
            onHide={() => this.setModalTransportEdit(false)}
            transport_id={this.state.clickedTransportId}
        />
      </div>
    );
  }
  
}

export default Transports;
