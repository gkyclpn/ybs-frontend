import React, { Component } from "react";
import Header from "./Header";
import StoreTable from "./tables/StoreTable";
import Button from 'react-bootstrap/Button';
import StoreCreateModal from "./modals/StoreCreateModal";
import CountryTable from "./tables/CountryTable";


class Stores extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalShow: false,
    };
    this.setModalShow = this.setModalShow.bind(this)
  }

  setModalShow = (value) => {
    this.setState({modalShow: value})
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
                <StoreTable  />
            </div>
        </div>
        <div></div>
        <StoreCreateModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
        />

      </div>
    );
  }
  
}

export default Stores;
