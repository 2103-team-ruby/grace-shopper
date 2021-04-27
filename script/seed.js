"use strict";

const {
	db,
	models: { User, Order, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }); // clears db and matches models to tables
	console.log("db synced!");

	// Creating Users
	const mike = await User.create({
		username: "Mike",
		password: "Jordan23",
		isAdmin: false, // check case of ENUM from Models
	});
	const bunnyLover = await User.create({
		username: "BunnyLover",
		password: "password",
		isAdmin: false,
	});
	const bugsBunny = await User.create({
		username: "BugsBunny",
		password: "Carrot",
		isAdmin: false,
	});
	const lebron = await User.create({
		username: "Lebron",
		password: "Spacejam2",
		isAdmin: false,
	});
	const energizerBunny = await User.create({
		username: "EnergizerBunny",
		password: "battery",
		isAdmin: false, // check case of ENUM from Models
	});
	const admin = await User.create({
		username: "Admin",
		password: "Admin",
		isAdmin: true,
	});
	const brendan = await User.create({
		username: "Brendan",
		password: "password",
		isAdmin: true,
	});
	const isabelle = await User.create({
		username: "Isabelle",
		password: "Isabelle",
		isAdmin: true,
	});
	const keon = await User.create({
		username: "Keon",
		password: "Keon",
		isAdmin: true, // check case of ENUM from Models
	});
	const altus = await User.create({
		username: "Altus",
		password: "Altus",
		isAdmin: true,
	});
	const graceShopper = await User.create({
		username: "GraceShopper",
		password: "FullStack",
		isAdmin: false,
	});
	const peterRabbit = await User.create({
		username: "PeterRabbit",
		password: "password",
		isAdmin: false,
	});

	// products
	const europeanRabbit = await Product.create({
		name: "European Rabbit",
		description:
			"Rabbits are intelligent, affectionate and social animals that need daily interaction with humans or other rabbits.",
		imageUrl: "/images/europeanRabbit.jpeg",
		price: 1999,
		inventory: 100,
	});
	const flemishGiant = await Product.create({
		name: "Flemish Giant Rabbit",
		description:
			"The Flemish Giant rabbit is a very large breed of domestic rabbit (Oryctolagus cuniculus domesticus), normally considered to be the largest breed of the species. Flemish Giants are historically a utility breed bred for fur and meat. The breed is also known for being docile and patient in being handled, resulting in the large animals commonly being kept as pets.",
		imageUrl: "/images/flemishGiantRabbit.jpg",
		price: 10000,
		inventory: 50,
	});
	const badBunny = await Product.create({
		name: "Bad Bunny",
		description:
			"Benito Antonio Martínez Ocasio (born March 10, 1994), known by his stage name Bad Bunny or El Conejo Malo, is a Puerto Rican rapper, singer, and songwriter. His music is often defined as Latin trap and reggaeton, but he has incorporated various other genres into his music, including rock, bachata, and soul. He is also known for his deep, slurred vocal style and his eclectic fashion sense.",
		imageUrl: "/images/badBunny.jpg",
		price: 100000000,
		inventory: 1,
	});
	const netherlandDwarf = await Product.create({
		name: "Netherland Dwarf Rabbit",
		description:
			"The Netherland Dwarf is a breed of domestic rabbit that originated in the Netherlands. Weighing 1.1–2.5 pounds (0.50–1.13 kg),[1][2] the Netherland Dwarf is one of the smallest rabbit breeds. Its popularity as a pet or show rabbit may stem from its neotenic appearance. The Netherland Dwarf is recognised by both the American Rabbit Breeders Association (ARBA)[1] and the British Rabbit Council (BRC).",
		imageUrl: "/images/netherlandDwarf.jpeg",
		price: 7500,
		inventory: 25,
	});
	const kangaroo = await Product.create({
		name: "Kangaroo",
		description:
			"The kangaroo is a marsupial from the family Macropodidae. In common use the term is used to describe the largest species from this family, the red kangaroo, as well as the antilopine kangaroo, eastern grey kangaroo, and western grey kangaroo. Kangaroos are indigenous to Australia and New Guinea.",
		imageUrl: "/images/kangaroo.jpeg",
		price: 50000,
		inventory: 10,
	});
	const americanBullfrog = await Product.create({
		name: "American Bullfrog",
		description:
			"The American bullfrog, often simply known as the bullfrog in Canada and the United States, is a large true frog native to eastern North America. It typically inhabits large permanent water bodies such as swamps, ponds, and lakes.",
		imageUrl: "/images/americanBullfrog.jpeg",
		price: 2999,
		inventory: 1000,
	});
	const poisonDartFrog = await Product.create({
		name: "Poison Dart Frog",
		description:
			"Poison dart frog is the common name of a group of frogs in the family Dendrobatidae which are native to tropical Central and South America. These species are diurnal and often have brightly colored bodies. This bright coloration is correlated with the toxicity of the species, making them aposematic.",
		imageUrl: "/images/poisionDartFrog.jpeg",
		price: 9999,
		inventory: 100,
	});
	const hollandLop = await Product.create({
		name: "Holland Lop Rabbit",
		description:
		`Holland Lop is a breed of domestic rabbit that was recognized by the American Rabbit Breeders Association (ARBA) in 1979 and by the Netherlands' Governing Rabbit Council in 1984. The Holland Lop, with a maximum weight of 4 lb (1.8 kg) (as stipulated by ARBA), is one of the smallest lop-eared breeds.`,
		imageUrl: "/images/hollandLop.jpeg",
		price: 49999,
		inventory: 50000,
	});
	const kangarooRat = await Product.create({
		name: "Kangaroo Rat",
		description: `Kangaroo rats, small mostly nocturnal rodents of genus Dipodomys, are native to arid areas of western North America. The common name derives from their bipedal form. They hop in a manner similar to the much larger kangaroo, but developed this mode of locomotion independently, like several other clades of rodents`,
		imageUrl: "/images/kangarooRat.jpeg",
		price: 5000,
		inventory: 10000,
	});
	const hops = await Product.create({
		name: "Hops",
		description: `Hops are the flowers (also called seed cones or strobiles) of the hop plant Humulus lupulus,[1] a member of the Cannabaceae family of flowering plants.[2] They are used primarily as a bittering, flavouring, and stability agent in beer, to which, in addition to bitterness, they impart floral, fruity, or citrus flavours and aromas.[3] Hops are also used for various purposes in other beverages and herbal medicine. `,
		imageUrl: "/images/hops.jpeg",
		price: 599,
		inventory: 1000000000,
	});

	// orders
	const orderOne = await Order.create({ userId: mike.id, isPaid: true });
	const orderTwo = await Order.create({
		userId: bunnyLover.id,
		isPaid: true,
	});
	const orderThree = await Order.create({
		userId: lebron.id,
		isPaid: true,
	});
	const orderFour = await Order.create({
		userId: bugsBunny.id,
		isPaid: true,
	});
	const orderFive = await Order.create({
		userId: energizerBunny.id,
		isPaid: true,
	});
	const orderSix = await Order.create({
		userId: mike.id,
		isPaid: false,
	});
	const orderSeven = await Order.create({
		userId: isabelle.id,
		isPaid: false,
	});
	const orderEight = await Order.create({
		userId: brendan.id,
		isPaid: false,
	});
	const orderNine = await Order.create({
		userId: keon.id,
		isPaid: false,
	});
	const orderTen = await Order.create({
		userId: altus.id,
		isPaid: false,
	});

	await orderOne.addProduct(europeanRabbit, {
		through: { quantity: 1, subtotal: 1 * europeanRabbit.price },
	});
	await orderOne.addProduct(flemishGiant, {
		through: { quantity: 3, subtotal: 3 * flemishGiant.price },
	});
	await orderOne.addProduct(badBunny, {
		through: { quantity: 2, subtotal: 2 * badBunny.price },
	});
	await orderOne.addProduct(americanBullfrog, {
		through: { quantity: 1, subtotal: 1 * americanBullfrog.price },
	});

	await orderTwo.addProduct(europeanRabbit, {
		through: { quantity: 1, subtotal: 1 * europeanRabbit.price },
	});

	await orderTwo.addProduct(kangarooRat, {
		through: { quantity: 2, subtotal: 2 * kangarooRat.price },
	});

	await orderTwo.addProduct(poisonDartFrog, {
		through: { quantity: 1, subtotal: 1 * poisonDartFrog.price },
	});

	await orderThree.addProduct(hops, {
		through: { quantity: 1, subtotal: 1 * hops.price },
	});

	await orderThree.addProduct(hollandLop, {
		through: { quantity: 2, subtotal: 2 * hollandLop.price },
	});

	await orderThree.addProduct(netherlandDwarf, {
		through: { quantity: 3, subtotal: 3 * netherlandDwarf.price },
	});

	await orderFour.addProduct(badBunny, {
		through: { quantity: 1, subtotal: 1 * badBunny.price },
	});

	await orderFour.addProduct(hollandLop, {
		through: { quantity: 1, subtotal: 1 * hollandLop.price },
	});

	await orderFive.addProduct(kangaroo, {
		through: { quantity: 2, subtotal: 2 * kangaroo.price },
	});

	await orderFive.addProduct(hops, {
		through: { quantity: 2, subtotal: 2 * hops.price },
	});

	await orderFive.addProduct(flemishGiant, {
		through: { quantity: 2, subtotal: 2 * flemishGiant.price },
	});

	await orderSix.addProduct(poisonDartFrog, {
		through: { quantity: 3, subtotal: 3 * poisonDartFrog.price },
	});

	await orderSix.addProduct(kangarooRat, {
		through: { quantity: 3, subtotal: 3 * kangarooRat.price },
	});

	await orderSix.addProduct(americanBullfrog, {
		through: { quantity: 3, subtotal: 3 * americanBullfrog.price },
	});

	await orderSeven.addProduct(netherlandDwarf, {
		through: {
			quantity: 1,
			subtotal: 1 * netherlandDwarf.price,
		},
	});

	await orderSeven.addProduct(hollandLop, {
		through: {
			quantity: 1,
			subtotal: 1 * hollandLop.price,
		},
	});

	await orderSeven.addProduct(netherlandDwarf, {
		through: {
			quantity: 1,
			subtotal: 1 * netherlandDwarf.price,
		},
	});

	await orderEight.addProduct(europeanRabbit, {
		through: {
			quantity: 2,
			subtotal: 1 * europeanRabbit.price,
		},
	});

	await orderSeven.addProduct(hops, {
		through: {
			quantity: 3,
			subtotal: 1 * netherlandDwarf.price,
		},
	});

	await orderEight.addProduct(europeanRabbit, {
		through: {
			quantity: 1,
			subtotal: 1 * europeanRabbit.price,
		},
	});

	await orderEight.addProduct(hops, {
		through: {
			quantity: 1,
			subtotal: 1 * hops.price,
		},
	});

	await orderNine.addProduct(kangaroo, {
		through: {
			quantity: 1,
			subtotal: 1 * kangaroo.price,
		},
	});

	await orderNine.addProduct(kangarooRat, {
		through: {
			quantity: 1,
			subtotal: 1 * kangarooRat.price,
		},
	});

	await orderNine.addProduct(americanBullfrog, {
		through: {
			quantity: 3,
			subtotal: 1 * americanBullfrog.price,
		},
	});

	await orderTen.addProduct(americanBullfrog, {
		through: {
			quantity: 3,
			subtotal: 1 * americanBullfrog.price,
		},
	});

	await orderTen.addProduct(poisonDartFrog, {
		through: {
			quantity: 1,
			subtotal: 1 * poisonDartFrog.price,
		},
	});
	console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log("seeding...");
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log("closing db connection");
		await db.close();
		console.log("db connection closed");
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
