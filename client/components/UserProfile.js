import React from "react";
import { connect } from "react-redux";
import { fetchPastOrders, fetchUserProfile, updateUser } from "../store/userProfile";


class UserProfile extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            id: this.props.match.params.id,
            username: "",
            password: ""
        }
      this.handleChange = this.handleChange.bind(this) 
      this.handleSubmit = this.handleSubmit.bind(this) 
    }
	componentDidMount() {
		try {
			this.props.getSingleUser(this.props.match.params.id);
            this.props.getPastOrders(this.props.match.params.id);
		} catch (error) {
			console.log(error);
		}
	}

     componentDidUpdate(prevProps) {
        if (prevProps.userInfo.user.id !== this.props.userInfo.user.id) {
          this.setState({
            id: this.props.match.params.id,
            username: "",
            password: ""
          })
          this.props.getSingleUser(this.props.match.params.id);
        }
      }

    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }

      handleSubmit(evt) {
        evt.preventDefault();
        this.props.updateSingleUser({ ...this.state});
        this.props.getSingleUser(this.props.match.params.id)
         this.props.getPastOrders(this.props.match.params.id);
      }

	render() {
		const { userInfo } = this.props;
        const { productOrders } = this.props.userInfo.pastOrder;
        const pastOrders = userInfo.pastOrder
        console.log('this is pastOrders ---->', userInfo)
        console.log('this is past Orders Keys ---> ', productOrders)
        const hasPastOrders = userInfo.pastOrder[0]
        const {handleChange, handleSubmit} = this;
        const {username, password} = this.state
        console.log('this is past Orders post ---> ', hasPastOrders)
		console.log(this.props);

		return (
			<div className='container'>
                <div>
                    <h1>Profile Page</h1>
                    <h2>Welcome Back {`${userInfo.user.username}`}</h2>

                    <div>
                        <h3>Edit Your Profile Information Below</h3>
                        <form id='update-user-form' onSubmit={handleSubmit}>

                        <label htmlFor='username'>Username:</label>
                        <input name='username' onChange={handleChange} value={username} />    

                        <label htmlFor='password'>Password:</label>
                        <input name='password' onChange={handleChange} value={password} />  

                        <button type='submit'>Update</button>

                        </form>
                    </div>
                    <div>
                        <h3>Previous Orders: </h3>
                        {hasPastOrders > 0 ?  ( <div className='past-orders'>
                        {userInfo.pastOrder[0].productOrders.map((product) => {
                         return (
                        <div key={product.product.id}>
                          <Link to={`/products/${product.product.id}`}>
                            <h3>{product.product.name}</h3>
                            </Link>
                            <p>Price: {product.product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Subtotal: {product.subtotal}</p>
                        </div>
                    )
                })}
                </div>
                
                    ) : (
                        <p>There are no previous orders assigned.</p>
                    )}
                    </div>

                </div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userProfile,
		userId: state.auth.id,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSingleUser: (id) => dispatch(fetchUserProfile(id)),
        getPastOrders: (id) => dispatch(fetchPastOrders(id)),
        updateSingleUser: (user) => dispatch(updateUser(user))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);