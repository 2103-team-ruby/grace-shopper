const { expect } = require("chai");
const {
	db,
	models: { Product, Order, User },
} = require("../index");
const seed = require("../../../script/seed");

describe.only("Associations", () => {
	before(() => db.sync({ force: true }));
	afterEach(() => db.sync({ force: true }));

	describe("Product >-< Order Association", () => {
		it("a product may belongs to many orders", async () => {
			const bunny = await Product.create({ name: "Bunny" });
			const grasshopper = await Product.create({ name: "Grasshopper" });
			const orderOne = await Order.create();
			await orderOne.addProducts([bunny, grasshopper]);

			const orderOneProducts = await orderOne.getProducts();
			const orderOneProductsName = await orderOneProducts.map(
				(product) => product.name
			);
			expect(orderOneProductsName).to.deep.equal(["Bunny", "Grasshopper"]);
		});

		it("an order may belong to many products", async () => {
			const orderOne = await Order.create();
			const orderTwo = await Order.create();
			const bunny = await Product.create({ name: "Bunny" });
			await bunny.addOrders([orderOne, orderTwo]);
			const bunnyOrders = await bunny.getOrders();
			const bunnyOrderNumbers = await bunnyOrders.map((order) => order.id);
			expect(bunnyOrderNumbers).to.deep.equal([1, 2]);
		});
	});

	describe("User -> Order Association", () => {
		it("A user can have many orders", async () => {
			const user = await User.create({ username: "default" });
			const orderOne = await Order.create();
			const orderTwo = await Order.create();
			const orderThree = await Order.create();
			await user.addOrders([orderOne, orderTwo, orderThree]);
			const userOrders = await user.getOrders();
			const userOrdersNumbers = await userOrders.map((order) => order.id);
			expect(userOrdersNumbers).to.deep.equal([1, 2, 3]);
		});

		it("An order can have one user", async () => {
			const userOne = await User.create({ username: "userOne" });
			const userTwo = await User.create({ username: "userTwo" });
			const order = await Order.create();
			await order.setUser(userOne);
			await order.setUser(userTwo);
			const orderUser = await order.getUser();
			expect(orderUser.username).to.deep.equal("userTwo");
		});
	});
});
