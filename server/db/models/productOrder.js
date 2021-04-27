const Sequelize = require("sequelize");
const db = require("../db");

const ProductOrder = db.define("productOrder", {
	subtotal: {
		type: Sequelize.INTEGER,
	},
	quantity: {
		type: Sequelize.INTEGER,
	},
});

module.exports = ProductOrder;
