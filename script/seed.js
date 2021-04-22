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
	const bunnyRabbit = await Product.create({
		name: "Bunny Rabbit",
		description:
			"Rabbits are intelligent, affectionate and social animals that need daily interaction with humans or other rabbits.",
		imageUrl:
			"https://cdn.pixabay.com/photo/2020/04/07/20/36/bunny-5014814_960_720.jpg",
		price: 19.99,
		inventory: 100,
	});
	const flemishGiant = await Product.create({
		name: "Flemish Giant Rabbit",
		description:
			"The Flemish Giant rabbit is a very large breed of domestic rabbit (Oryctolagus cuniculus domesticus), normally considered to be the largest breed of the species. Flemish Giants are historically a utility breed bred for fur and meat. The breed is also known for being docile and patient in being handled, resulting in the large animals commonly being kept as pets.",
		imageUrl:
			"https://flemish-giant.com/wp-content/uploads/2015/10/light-gray-flemish-giant.jpg",
		price: 100.0,
		inventory: 50,
	});
	const badBunny = await Product.create({
		name: "Bad Bunny",
		description:
			"Benito Antonio Martínez Ocasio (born March 10, 1994), known by his stage name Bad Bunny or El Conejo Malo, is a Puerto Rican rapper, singer, and songwriter. His music is often defined as Latin trap and reggaeton, but he has incorporated various other genres into his music, including rock, bachata, and soul. He is also known for his deep, slurred vocal style and his eclectic fashion sense.",
		imageUrl:
			"https://i.guim.co.uk/img/media/1597132319476d2f64b7679b8a3f37fd46694cb9/509_1656_3850_2309/master/3850.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=0a799366f1b71bd6ed4162ff9c681143",
		price: 1000000.0,
		inventory: 1,
	});
	const netherlandDwarf = await Product.create({
		name: "Netherland Dwarf Rabbit",
		description:
			"The Netherland Dwarf is a breed of domestic rabbit that originated in the Netherlands. Weighing 1.1–2.5 pounds (0.50–1.13 kg),[1][2] the Netherland Dwarf is one of the smallest rabbit breeds. Its popularity as a pet or show rabbit may stem from its neotenic appearance. The Netherland Dwarf is recognised by both the American Rabbit Breeders Association (ARBA)[1] and the British Rabbit Council (BRC).",
		imageUrl:
			"https://petkeen.com/wp-content/uploads/2020/10/Brown-Netherland-dwarf-rabbit_RATT_ANARACH_Shutterstock.jpg",
		price: 75.0,
		inventory: 25,
	});
	const kangaroo = await Product.create({
		name: "Kangaroo",
		description:
			"The kangaroo is a marsupial from the family Macropodidae. In common use the term is used to describe the largest species from this family, the red kangaroo, as well as the antilopine kangaroo, eastern grey kangaroo, and western grey kangaroo. Kangaroos are indigenous to Australia and New Guinea.",
		imageUrl:
			"https://cdn.britannica.com/s:690x388,c:crop/90/140490-050-669A124D/Red-kangaroo-home-range-species-much-interior.jpg",
		price: 500.0,
		inventory: 10,
	});
	const americanBullfrog = await Product.create({
		name: "American Bullfrog",
		description:
			"The American bullfrog, often simply known as the bullfrog in Canada and the United States, is a large true frog native to eastern North America. It typically inhabits large permanent water bodies such as swamps, ponds, and lakes.",
		imageUrl:
			"https://i.natgeofe.com/n/d9f60f21-7487-4b78-b023-6741d32ce5f7/1677360.jpg?w=636&h=424",
		price: 29.99,
		inventory: 1000,
	});
	const poisonDartFrog = await Product.create({
		name: "Poison Dart Frog",
		description:
			"Poison dart frog is the common name of a group of frogs in the family Dendrobatidae which are native to tropical Central and South America. These species are diurnal and often have brightly colored bodies. This bright coloration is correlated with the toxicity of the species, making them aposematic.",
		imageUrl:
			"https://i.natgeofe.com/k/a27c5d1f-9f3e-49f9-ae6d-a2b349c283c7/poison-dart-frog-orange-blue.jpg?w=636&h=358",
		price: 99.99,
		inventory: 100,
	});
	const grasshopper = await Product.create({
		name: "Grasshopper",
		description:
			"Grasshoppers are a group of insects belonging to the suborder Caelifera. They are among what is probably the most ancient living group of chewing herbivorous insects, dating back to the early Triassic around 250 million years ago.",
		imageUrl:
			"https://news.okstate.edu/articles/agricultural-sciences-natural-resources/images/grasshopper_banner.jpg",
		price: 0.1,
		inventory: 50000,
	});
	const flea = await Product.create({
		name: "Flea",
		description: `Flea, the common name for the order Siphonaptera, includes 2,500 species of small flightless insects that survive as external parasites of mammals and birds. Fleas live by consuming blood, or hematophagy, from their hosts. Adult fleas grow to about 3 millimetres (1⁄8 inch) long, are usually brown, and have bodies that are "flattened" sideways or narrow, enabling them to move through their host's fur or feathers. They lack wings, but have strong claws preventing them from being dislodged, mouthparts adapted for piercing skin and sucking blood, and hind legs extremely well adapted for jumping. They are able to leap a distance of some 50 times their body length, a feat second only to jumps made by another group of insects, the superfamily of froghoppers. Flea larvae are worm-like with no limbs; they have chewing mouthparts and feed on organic debris left on their host's skin.`,
		imageUrl:
			"https://www.petmd.com/sites/default/files/styles/article_image/public/flea-larvae-2.jpg?itok=CVPW9bFl",
		price: 0.01,
		inventory: 1000000000,
	});
	const hops = await Product.create({
		name: "Hops",
		description: `Hops are the flowers (also called seed cones or strobiles) of the hop plant Humulus lupulus,[1] a member of the Cannabaceae family of flowering plants.[2] They are used primarily as a bittering, flavouring, and stability agent in beer, to which, in addition to bitterness, they impart floral, fruity, or citrus flavours and aromas.[3] Hops are also used for various purposes in other beverages and herbal medicine. `,
		imageUrl:
			"https://www.petmd.com/sites/default/files/styles/article_image/public/flea-larvae-2.jpg?itok=CVPW9bFl",
		price: 5.99,
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

	await orderOne.addProduct(bunnyRabbit, {
		through: { quantity: 1, subtotal: 1 * bunnyRabbit.price },
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

	await orderTwo.addProduct(bunnyRabbit, {
		through: { quantity: 1, subtotal: 1 * bunnyRabbit.price },
	});

	await orderTwo.addProduct(flea, {
		through: { quantity: 2, subtotal: 2 * flea.price },
	});

	await orderTwo.addProduct(poisonDartFrog, {
		through: { quantity: 1, subtotal: 1 * poisonDartFrog.price },
	});

	await orderThree.addProduct(hops, {
		through: { quantity: 1, subtotal: 1 * hops.price },
	});

	await orderThree.addProduct(grasshopper, {
		through: { quantity: 2, subtotal: 2 * grasshopper.price },
	});

	await orderThree.addProduct(netherlandDwarf, {
		through: { quantity: 3, subtotal: 3 * netherlandDwarf.price },
	});

	await orderFour.addProduct(badBunny, {
		through: { quantity: 1, subtotal: 1 * badBunny.price },
	});

	await orderFour.addProduct(grasshopper, {
		through: { quantity: 1, subtotal: 1 * grasshopper.price },
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

	await orderSix.addProduct(flea, {
		through: { quantity: 3, subtotal: 3 * flea.price },
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

	await orderSeven.addProduct(grasshopper, {
		through: {
			quantity: 1,
			subtotal: 1 * grasshopper.price,
		},
	});

	await orderSeven.addProduct(netherlandDwarf, {
		through: {
			quantity: 1,
			subtotal: 1 * netherlandDwarf.price,
		},
	});

	await orderEight.addProduct(bunnyRabbit, {
		through: {
			quantity: 2,
			subtotal: 1 * bunnyRabbit.price,
		},
	});

	await orderSeven.addProduct(hops, {
		through: {
			quantity: 3,
			subtotal: 1 * netherlandDwarf.price,
		},
	});

	await orderEight.addProduct(bunnyRabbit, {
		through: {
			quantity: 1,
			subtotal: 1 * bunnyRabbit.price,
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

	await orderNine.addProduct(flea, {
		through: {
			quantity: 1,
			subtotal: 1 * flea.price,
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
