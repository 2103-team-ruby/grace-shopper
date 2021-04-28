import React from "react";
import { connect } from "react-redux";
import {
	fetchPastOrders,
	fetchUserProfile,
	updateUser,
} from "../store/userProfile";
import { Link } from "react-router-dom";

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			username: "",
			password: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
				password: "",
			});
			this.props.getSingleUser(this.props.match.params.id);
		}
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.updateSingleUser({ ...this.state });
		this.props.getSingleUser(this.props.match.params.id);
		this.props.getPastOrders(this.props.match.params.id);
	}

	render() {
		const { userInfo } = this.props;
		const hasPastOrders = userInfo.pastOrder[0];
		const { handleChange, handleSubmit } = this;
		const { username, password } = this.state;
		let subtotal = 0;

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

							<button
								className='btn btn-sm btn-outline-secondary mx-2'
								type='submit'>
								Update
							</button>
							{hasPastOrders}
						</form>
					</div>
					<div className='previousOrders'>
						<h3>Previous Orders: </h3>
						{hasPastOrders ? (
							<div className='past-orders'>
								{hasPastOrders.productOrders.map((product) => {
									return (
										<div key={product.product.id}>
											<Link to={`/products/${product.product.id}`}>
												<h3>{product.product.name}</h3>
												<img
													className='img-thumbnail'
													style={{ width: "250px" }}
													src={product.product.imageUrl}
													alt={product.product.name}
												/>
											</Link>
											<p>Price: ${product.product.price / Math.pow(10, 2)}</p>
											<p>Quantity: {product.quantity}</p>
											<p>
												Product Total: ${product.subtotal / Math.pow(10, 2)}
											</p>
											<div className='hiddenTotal'>
												<p>
													Running Subtotal:
													{(subtotal +=
														product.product.price * product.quantity) /
														Math.pow(10, 2)}
												</p>
											</div>
										</div>
									);
								})}
								<p>Order Total: ${subtotal / Math.pow(10, 2)}</p>
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
		updateSingleUser: (user) => dispatch(updateUser(user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
