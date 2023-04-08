/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */



exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item_table').del()
  await knex('item_table').insert([
    {
      "user_id": 5,
      "item_name": "Toyota Corolla",
      "description": "A reliable and affordable compact car with a comfortable ride and good fuel economy.",
      "quantity": 4
    },
    {
      "user_id": 9,
      "item_name": "Honda Civic",
      "description": "A popular and well-regarded compact car known for its fuel efficiency, reliability, and sporty styling.",
      "quantity": 7
    },
    {
      "user_id": 11,
      "item_name": "Ford Mustang",
      "description": "A legendary sports car with a powerful engine, distinctive styling, and a rich history.",
      "quantity": 2
    },
    {
      "user_id": 1,
      "item_name": "BMW 3 Series",
      "description": "A luxurious and sporty midsize car with excellent handling and a refined interior.",
      "quantity": 6
    },
    {
      "user_id": 12,
      "item_name": "Tesla Model S",
      "description": "An electric luxury sedan with advanced technology, impressive acceleration, and a sleek design.",
      "quantity": 3
    },
    {
      "user_id": 2,
      "item_name": "Chevrolet Camaro",
      "description": "A classic American muscle car with bold styling, powerful engines, and sharp handling.",
      "quantity": 1
    },
    {
      "user_id": 7,
      "item_name": "Audi A4",
      "description": "A sophisticated and well-crafted luxury sedan with a comfortable ride and advanced features.",
      "quantity": 8
    },
    {
      "user_id": 4,
      "item_name": "Jeep Wrangler",
      "description": "An iconic off-road vehicle with rugged styling, exceptional capability, and a fun, open-air driving experience.",
      "quantity": 5
    },
    {
      "user_id": 10,
      "item_name": "Nissan Altima",
      "description": "A practical and efficient midsize sedan with a spacious interior and smooth ride.",
      "quantity": 4
    },
    {
      "user_id": 13,
      "item_name": "Porsche 911",
      "description": "A legendary sports car with timeless styling, thrilling performance, and exceptional handling.",
      "quantity": 2
    },
    {
      "user_id": 7,
      "item_name": "Honda Accord",
      "description": "A reliable and spacious midsize sedan with good fuel economy and a comfortable ride.",
      "quantity": 5
    },
    {
      "user_id": 10,
      "item_name": "Ford F-150",
      "description": "A popular and capable full-size pickup truck with a spacious cabin and impressive towing capacity.",
      "quantity": 3
    },
    {
      "user_id": 4,
      "item_name": "Toyota Camry",
      "description": "A practical and efficient midsize sedan with a spacious interior and smooth ride.",
      "quantity": 6
    },
    {
      "user_id": 8,
      "item_name": "Chevrolet Silverado",
      "description": "A rugged and dependable full-size pickup truck with powerful engines and impressive hauling capabilities.",
      "quantity": 2
    },
    {
      "user_id": 14,
      "item_name": "Tesla Model 3",
      "description": "A stylish and eco-friendly electric sedan with impressive performance and advanced technology.",
      "quantity": 4
    },
    {
      "user_id": 1,
      "item_name": "Jeep Grand Cherokee",
      "description": "A capable and versatile midsize SUV with excellent off-road capabilities and a comfortable ride.",
      "quantity": 2
    },
    {
      "user_id": 5,
      "item_name": "Ford Mustang",
      "description": "A legendary sports car with a powerful engine, distinctive styling, and a rich history.",
      "quantity": 1
    },
    {
      "user_id": 12,
      "item_name": "BMW 5 Series",
      "description": "A luxurious and athletic midsize car with advanced technology and impressive performance.",
      "quantity": 3
    },
    {
      "user_id": 6,
      "item_name": "Toyota RAV4",
      "description": "A popular and reliable compact SUV with a comfortable ride and good fuel economy.",
      "quantity": 5
    },
    {
      "user_id": 11,
      "item_name": "Nissan Rogue",
      "description": "A practical and spacious compact SUV with good fuel economy and a comfortable ride.",
      "quantity": 4
    },
    {
      "user_id": 2,
      "item_name": "Toyota Corolla",
      "description": "A reliable and fuel-efficient compact sedan with a comfortable ride and spacious interior.",
      "quantity": 4
    },
    {
      "user_id": 9,
      "item_name": "Honda Civic",
      "description": "A popular and practical compact sedan with good fuel economy and a comfortable ride.",
      "quantity": 3
    },
    {
      "user_id": 13,
      "item_name": "Jeep Wrangler",
      "description": "An iconic and capable off-road SUV with a rugged design and open-air driving experience.",
      "quantity": 1
    },
    {
      "user_id": 5,
      "item_name": "Chevrolet Camaro",
      "description": "A classic and powerful sports car with a bold design and impressive performance.",
      "quantity": 2
    },
    {
      "user_id": 1,
      "item_name": "Ford Explorer",
      "description": "A spacious and versatile midsize SUV with good towing capacity and advanced safety features.",
      "quantity": 5
    },
    {
      "user_id": 10,
      "item_name": "Nissan Altima",
      "description": "A practical and efficient midsize sedan with a comfortable ride and spacious interior.",
      "quantity": 2
    },
    {
      "user_id": 1,
      "item_name": "Mazda CX-5",
      "description": "A stylish and agile compact SUV with good fuel economy and advanced safety features.",
      "quantity": 3
    },
    {
      "user_id": 11,
      "item_name": "Volkswagen Jetta",
      "description": "A practical and affordable compact sedan with a comfortable ride and spacious interior.",
      "quantity": 4
    },
    {
      "user_id": 7,
      "item_name": "Hyundai Sonata",
      "description": "A reliable and efficient midsize sedan with a comfortable ride and advanced technology features.",
      "quantity": 1
    },
    {
      "user_id": 4,
      "item_name": "Honda CR-V",
      "description": "A practical and spacious compact SUV with good fuel economy and a comfortable ride.",
      "quantity": 2
    }
  ]);
};
