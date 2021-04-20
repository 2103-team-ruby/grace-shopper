const { expect } = require("chai");
const {
	db,
	models: { Order },
} = require("../index");
const seed = require("../../../script/seed");

describe("Order Model", () => {
	let order;
	beforeEach(() => db.sync({ force: true }));
	beforeEach(() => {
		order = {
			status: "complete",
		};
	});
	beforeEach(() => db.sync({ force: true }));
	it("has status field", async () => {
		order.notARealAttribute = "does not compute";
		const savedOrder = await Order.create(order);
		expect(savedOrder.status).to.equal("complete");
	});

	it("status field defaults to incomplete", async () => {
		delete order.status;
		const noStatusOrder = await Order.create(order);
		expect(noStatusOrder.status).to.equal("incomplete");
	});

	describe("Seed File", () => {
		beforeEach(seed);

		it("populates the database with at least ten orders", async () => {
			const seedOrders = await Order.findAll();
			expect(seedOrders).to.have.lengthOf.at.least(10);
		});
	});
});
