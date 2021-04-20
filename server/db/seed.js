// NEEDS REQUIREMENTS AFTER DB CREATION
const chalk = require('chalk')

async function createInitialUsers() {
  try {
      const seededUsers = [
          {
            username: 'Mike',
            password: 'Jordan23',
            type: customer // check case of ENUM from Models
          },
          {
            username: 'BunnyLover',
            password: 'password',
            type: customer
          },
          {
            username: 'BugsBunny',
            password: 'Carrot',
            type: customer
          },
          {
            username: 'Lebron',
            password: 'Spacejam2',
            type: customer
          },
          {
            username: 'EnergizerBunny',
            password: 'battery',
            type: customer // check case of ENUM from Models
          },
          {
            username: 'Admin',
            password: 'Admin',
            type: admin
          },
          {
            username: 'Brendan',
            password: 'password',
            type: admin
          },
          {
            username: 'Isabelle',
            password: 'Isabelle',
            type: customer
          },
          {
            username: 'Keon',
            password: 'Keon',
            type: admin // check case of ENUM from Models
          },
          {
            username: 'Altus',
            password: 'Altus',
            type: customer
          },
          {
            username: 'GraceShopper',
            password: 'FullStack',
            type: customer
          },
          {
            username: 'PeterRabbit',
            password: 'password',
            type: customer
          },
      ]
      console.log(seededUsers);
      const [users] = await Promise.all(User.bulkCreate(seededUsers));
      console.log(chalk.blue("Users Created!"));
  } catch (error) {
      console.error(chalk.red('There was a problem creating users!', error));
      throw error;
  };
};

async function createInitalProducts (){
  try {
    const seededProducts = [
      {
        name: 'Bunny Rabbit',
        description: 'Rabbits are intelligent, affectionate and social animals that need daily interaction with humans or other rabbits.',
        imageUrl: 'https://pixabay.com/images/id-5014814/',
        price: 19.99,
        inventory: 100
      },
      {
        name: 'Flemish Giant Rabbit',
        description: 'The Flemish Giant rabbit is a very large breed of domestic rabbit (Oryctolagus cuniculus domesticus), normally considered to be the largest breed of the species. Flemish Giants are historically a utility breed bred for fur and meat. The breed is also known for being docile and patient in being handled, resulting in the large animals commonly being kept as pets.',
        imageUrl: 'https://images.app.goo.gl/rGqEkKSwPr8iQEZXA',
        price: 100.00,
        inventory: 50
      },
      {
        name: 'Bad Bunny',
        description: 'Benito Antonio Martínez Ocasio (born March 10, 1994), known by his stage name Bad Bunny or El Conejo Malo, is a Puerto Rican rapper, singer, and songwriter. His music is often defined as Latin trap and reggaeton, but he has incorporated various other genres into his music, including rock, bachata, and soul. He is also known for his deep, slurred vocal style and his eclectic fashion sense.',
        imageUrl: 'https://images.app.goo.gl/4mSXTBUSHMVugggH6',
        price: 1000000.00,
        inventory: 1
      },
      {
        name: 'Netherland Dwarf Rabbit',
        description: 'The Netherland Dwarf is a breed of domestic rabbit that originated in the Netherlands. Weighing 1.1–2.5 pounds (0.50–1.13 kg),[1][2] the Netherland Dwarf is one of the smallest rabbit breeds. Its popularity as a pet or show rabbit may stem from its neotenic appearance. The Netherland Dwarf is recognised by both the American Rabbit Breeders Association (ARBA)[1] and the British Rabbit Council (BRC).',
        imageUrl: 'https://images.app.goo.gl/MRKngMiaKjAxYrCf9',
        price: 75.00,
        inventory: 25
      },
      {
        name: 'Kangaroo',
        description: 'The kangaroo is a marsupial from the family Macropodidae. In common use the term is used to describe the largest species from this family, the red kangaroo, as well as the antilopine kangaroo, eastern grey kangaroo, and western grey kangaroo. Kangaroos are indigenous to Australia and New Guinea.',
        imageUrl: 'https://images.app.goo.gl/bwG6vGfntKwM5hE37',
        price: 500.00,
        inventory: 10
      },
      {
        name: 'American Bullfrog',
        description: 'The American bullfrog, often simply known as the bullfrog in Canada and the United States, is a large true frog native to eastern North America. It typically inhabits large permanent water bodies such as swamps, ponds, and lakes.',
        imageUrl: 'https://images.app.goo.gl/C1HvkeTBPfrCC31W9',
        price: 29.99,
        inventory: 1000
      },
      {
        name: 'Poison Dart Frog',
        description: 'Poison dart frog is the common name of a group of frogs in the family Dendrobatidae which are native to tropical Central and South America. These species are diurnal and often have brightly colored bodies. This bright coloration is correlated with the toxicity of the species, making them aposematic.',
        imageUrl: 'https://images.app.goo.gl/Nco3iVaehRQL1mt57',
        price: 99.99,
        inventory: 100
      },
      {
        name: 'Grasshopper',
        description: 'Grasshoppers are a group of insects belonging to the suborder Caelifera. They are among what is probably the most ancient living group of chewing herbivorous insects, dating back to the early Triassic around 250 million years ago.',
        imageUrl: 'https://images.app.goo.gl/v3FpHHiGvoRe1M9t9',
        price: 0.10,
        inventory: 50000
      },
      {
        name: 'Flea',
        description: `Flea, the common name for the order Siphonaptera, includes 2,500 species of small flightless insects that survive as external parasites of mammals and birds. Fleas live by consuming blood, or hematophagy, from their hosts. Adult fleas grow to about 3 millimetres (1⁄8 inch) long, are usually brown, and have bodies that are "flattened" sideways or narrow, enabling them to move through their host's fur or feathers. They lack wings, but have strong claws preventing them from being dislodged, mouthparts adapted for piercing skin and sucking blood, and hind legs extremely well adapted for jumping. They are able to leap a distance of some 50 times their body length, a feat second only to jumps made by another group of insects, the superfamily of froghoppers. Flea larvae are worm-like with no limbs; they have chewing mouthparts and feed on organic debris left on their host's skin.`,
        imageUrl: 'https://images.app.goo.gl/kATAGfNKRpcCebYA7',
        price: 0.01,
        inventory: 1000000000
      },
      {
        name: 'Hops',
        description: `Hops are the flowers (also called seed cones or strobiles) of the hop plant Humulus lupulus,[1] a member of the Cannabaceae family of flowering plants.[2] They are used primarily as a bittering, flavouring, and stability agent in beer, to which, in addition to bitterness, they impart floral, fruity, or citrus flavours and aromas.[3] Hops are also used for various purposes in other beverages and herbal medicine. `,
        imageUrl: 'https://images.app.goo.gl/kATAGfNKRpcCebYA7',
        price: 5.99,
        inventory: 1000000000
      }
    ]
    console.log(seededProducts)
    const [products] = await Products.bulkCreate(seededProducts)
    console.log(chalk.blue('PRODUCTS CREATED'))
  } catch (error) {
    console.error(chalk.red('There was a problem creating products!', error))
    throw error
  }
}

async function createInitialOrders () {
  try {
    seededOrders = [
      {
        userId:  user.id.1,
        status: complete
      },
      {
        userId:  user.id.1,
        status: complete
      },
      {
        userId:  user.id.2,
        status: incomplete
      },
      {
        userId:  user.id.4,
        status: complete
      },
      {
        userId:  user.id.3,
        status: incomplete
      },
      {
        userId:  user.id.6,
        status: complete
      },
      {
        userId:  user.id.7,
        status: incomplete
      },
      {
        userId:  user.id.8,
        status: complete
      },
      {
        userId:  user.id.9,
        status: complete
      },
      {
        userId:  user.id.10,
        status: complete
      },
      {
        userId:  user.id.10,
        status: incomplete
      },
      {
        userId:  user.id.11,
        status: complete
      },
    ]
    const [orders] = await Orders.bulkCreate(seededOrders)
    console.log(chalk.blue('ORDERS ARE SEEDED'))
  } catch (error) {
    console.error(chalk.red('There was a problem creating orders!', error))
  }
}


const startDatabase = async () => {
  try {
    await createInitialUsers()
    await createInitalProducts()
    await createInitialOrders()
    console.log(chalk.blue('DATABASE HAS BEEN SEEDED'))
  } catch (error) {
    console.error(chalk.red('THERE WAS A PROBLEM STARTING THE DATABASE!', error))
    throw error;
  }
}

startDatabase()
