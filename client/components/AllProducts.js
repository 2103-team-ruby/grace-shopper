import React from "react";
import { fetchProducts } from "../store/allProducts";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "all",
    };
    this.handleChange = this.changedDropdown.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  changedDropdown(event) {
    console.log(this.state.value);
    this.setState({ value: event.target.value });
  }

  render() {
    const { value } = this.state;
    const products = this.props.products.filter((product) => {
      if (value === "all") return product;
      if (value === "low") return product.price < 49.0;
      if (value === "medium") return product.price < 450 && product.price > 49;
      if (value === "high") return product.price > 450;
    });
    return (
      <div className="container">
        <label htmlFor="prices">Filter Prices:</label>
        <select name="prices" onChange={this.handleChange}>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="allProducts">
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div className="pet-list">
                  {products.map((product) => (
                    <div className="col" key={product.id}>
                      <div className="card shadow-sm">
                        <img
                          className="card-img-top"
                          preserveAspectRatio="xMidYMid slice"
                          src={product.imageUrl}
                          alt={product.name}
                        />
                        <div className="card-body text-center">
                          <Link to={`/products/${product.id}`}>
                            <h3>{product.name}</h3>
                          </Link>
                          <p>${product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  products: state.allProducts,
});

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);
