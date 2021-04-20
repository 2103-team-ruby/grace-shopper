const { expect } = require("chai");
const {
	db,
	models: { Product },
} = require("../index");
const seed = require("../../../script/seed");

describe("Product model", () => {
	let product;
	beforeEach(() => db.sync({ force: true }));
	beforeEach(() => {
		product = {
			name: "Bunny",
			imageUrl: "/images/bunny.png",
			description: "A cute bunny",
			price: 99.99,
			inventory: 5,
		};
	});
	beforeEach(() => db.sync({ force: true }));
	it("has fields name, description, imageUrl, price, and inventory", async () => {
		product.notARealAttribute = "does not compute";
		const savedProduct = await Product.create(product);
		expect(savedProduct.name).to.equal("Bunny");
		expect(savedProduct.imageUrl).to.equal("/images/bunny.png");
		expect(savedProduct.description).to.equal("A cute bunny");
		expect(Number(savedProduct.price)).to.equal(99.99);
		expect(savedProduct.inventory).to.equal(5);
		expect(savedProduct.notARealAttribute).to.equal(undefined);
	});

	it("name cannot be null", async () => {
		product.name = null;
		try {
			const noNameProduct = await Product.create(product);
			if (noNameProduct) {
				throw Error("Validation should have failed with invalid name");
			}
		} catch (err) {
			expect(err.message).to.not.have.string("Validation should have failed");
		}
	});

	it("imageUrl defaults to picsum image", async () => {
		delete product.imageUrl;
		const noImageProduct = await Product.create(product);
		expect(noImageProduct.imageUrl).to.equal("https://picsum.photos/200");
	});

	it("price must be greater than 0", async () => {
		product.price = -3.99;
		try {
			const negativeProductPrice = await Product.create(product);
			if (negativeProductPrice) {
				throw Error("Validation should have failed with price < 0.01");
			}
		} catch (err) {
			expect(err.message).to.not.have.string("Validation should have failed");
		}
	});

	it("inventory must be greater than or equal 0", async () => {
		product.inventory = -6;
		try {
			const negativeProductInventory = await Product.create(product);
			if (negativeProductInventory) {
				throw Error("Validation should have failed with inventory < 0");
			}
		} catch (err) {
			expect(err.message).to.not.have.string("Validation should have failed");
		}
	});

	describe("Seed File", () => {
		beforeEach(seed);

		it("populates the database with at least ten products", async () => {
			const seedProducts = await Product.findAll();
			expect(seedProducts).to.have.lengthOf.at.least(10);
		});
	});
});
