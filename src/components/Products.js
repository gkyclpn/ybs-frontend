import React, { Component } from "react";
import Header from "./Header";
import StoreTable from "./tables/StoreTable";
import Button from 'react-bootstrap/Button';
import ProductCreateModal from "./modals/ProductCreateModal";
import ProductTable from "./tables/ProductTable";
import ProductEditModal from "./modals/ProductEditModal"
import ProductShowModal from "./modals/ProductShowModal"
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalShow: false,
        modalProductEdit: false,
        modalProductShow: false,
    };
    this.setModalShow = this.setModalShow.bind(this)
    this.setModalProductEdit = this.setModalProductEdit.bind(this)
    this.setModalProductShow = this.setModalProductShow.bind(this)
  }

  setModalShow = (value) => {
    this.setState({modalShow: value})
  }
  setModalProductEdit = (value) => { 
    this.setState({modalProductEdit: value})
  }
  setModalProductShow = (value) => { 
    this.setState({modalProductShow: value})
  }
  setClickedProductId = (id) => {
    this.setState({clickedProductId: id})
  }

  render() {
    return (
      <div className="w-full h-full flex flex-col items-center justify-between min-h-screen gap-y-8">
        <Header />
        <div className="w-3/4 flex flex-col justify-center items-center gap-y-4">
            <div className="w-full flex justify-end">
                <Button variant="success" className="bg-green-700" onClick={() => this.setModalShow(true)}>Add Product</Button>
            </div>
            <div className="w-full flex items-center justify-center">
                <ProductTable setClickedProductId={this.setClickedProductId} setModalProductEdit={this.setModalProductEdit} setModalProductShow={this.setModalProductShow}  />
            </div>
        </div>
        <div></div>
        <ProductCreateModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
        />
        <ProductShowModal
            show={this.state.modalProductShow}
            onHide={() => this.setModalProductShow(false)}
            product_id={this.state.clickedProductId}
        />
        <ProductEditModal
            show={this.state.modalProductEdit}
            onHide={() => this.setModalProductEdit(false)}
            product_id={this.state.clickedProductId}
        />
      </div>
    );
  }
  
}

export default Products;
