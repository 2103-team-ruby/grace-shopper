const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.TEXT,
	},
	imageUrl: {
		type: Sequelize.TEXT,
		defaultValue: "https://picsum.photos/200",
	},
	price: {
		type: Sequelize.DECIMAL(10, 2),
		validate: {
			min: 0.01,
		},
	},
	inventory: {
		type: Sequelize.INTEGER,
		validate: {
			min: 0,
		},
	},
});

module.exports = Product;
