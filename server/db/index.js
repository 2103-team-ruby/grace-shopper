//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const ProductOrder = require("./models/productOrder");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(Order, { through: ProductOrder });
Order.belongsToMany(Product, { through: ProductOrder });
Product.hasMany(ProductOrder);
ProductOrder.belongsTo(Product);
Order.hasMany(ProductOrder);
ProductOrder.belongsTo(Order);

module.exports = {
	db,
	models: {
		User,
		Product,
		Order,
		ProductOrder,
	},
};
