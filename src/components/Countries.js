import React, { Component } from "react";
import Header from "./Header";
import CountryTable from "./tables/CountryTable";
import Button from 'react-bootstrap/Button';
import CountryCreateModal from "./modals/CountryCreateModal";
import CountryDistanceModal from "./modals/CountryDistanceModal";

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalShow: false,
        modalDistanceShow: false,
        clickedCountryId: null,
    };
    this.setModalShow = this.setModalShow.bind(this)
    this.setModalDistanceShow = this.setModalDistanceShow.bind(this)
  }

  setModalShow = (value) => {
    this.setState({modalShow: value})
  }
  setModalDistanceShow = (value) => {
    this.setState({modalDistanceShow: value})
  }
  setClickedCountryId = (id) => {
    this.setState({clickedCountryId: id})
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex justify-end">
                <Button variant="success" className="bg-green-700" onClick={() => this.setModalShow(true)}>Add Country</Button>
            </div>
            <div className="w-full flex items-center justify-center">
                <CountryTable setModalDistanceShow={this.setModalDistanceShow} setClickedCountryId={this.setClickedCountryId} /> 
            </div>
        </div>
        <div></div>
        <CountryCreateModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
        />
        <CountryDistanceModal
            show={this.state.modalDistanceShow}
            onHide={() => this.setModalDistanceShow(false)}
            country_id={this.state.clickedCountryId}
        />
      </div>
    );
  }
  
}

export default Countries;
