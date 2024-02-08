import Product from "./Product";

export default class Api {
     static async getProducts() : Promise<Product[]> {
        return [
            {
                "id": 1,
                "name": "Суши 1",
                "recipe": "Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут",
                "price": 200,
                favorite : false
            },
            {
                "id": 2,
                "name": "Суши 2",
                "recipe": "Лосось, огурец, авокадо, кунжут",
                "price": 250,
                favorite : false
            },
            {
                "id": 3,
                "name": "Суши 3",
                "recipe": "Креветки, огурец, авокадо, кунжут",
                "price": 300,
                favorite : false
            },
            {
                "id": 4,
                "name": "Суши 4",
                "recipe": "Угорь, огурец, авокадо, кунжут",
                "price": 350,
                favorite : false
            },
            {
                "id": 5,
                "name": "Суши 5",
                "recipe": "Тунец, огурец, авокадо, кунжут",
                "price": 400,
                favorite : false
            },
            {
                "id": 6,
                "name": "Суши 6",
                "recipe": "Лосось, креветки, огурец, авокадо, кунжут",
                "price": 450,
                favorite : false
            },
            {
                "id": 7,
                "name": "Суши 7",
                "recipe": "Угорь, креветки, огурец, авокадо, кунжут",
                "price": 500,
                favorite : false
            },
            {
                "id": 8,
                "name": "Суши 8",
                "recipe": "Тунец, креветки, огурец, авокадо, кунжут",
                "price": 550,
                favorite : false
            },
            {
                "id": 9,
                "name": "Суши 9",
                "recipe": "Лосось, угорь, огурец, авокадо, кунжут",
                "price": 600,
                favorite : false
            },
            {
                "id": 10,
                "name": "Суши 10",
                "recipe": "Лосось, тунец, огурец, авокадо, кунжут",
                "price": 650,
                favorite : false
            },
            {
                "id": 11,
                "name": "Суши 11",
                "recipe": "Лосось, угорь, креветки, огурец, авокадо, кунжут",
                "price": 700,
                favorite : false
            },
            {
                "id": 12,
                "name": "Суши 12",
                "recipe": "Лосось, тунец, креветки, огурец, авокадо, кунжут",
                "price": 750,
                favorite : false
            },
            {
                "id": 13,
                "name": "Суши 13",
                "recipe": "Угорь, тунец, огурец, авокадо, кунжут",
                "price": 800,
                favorite : false
            },
            {
                "id": 14,
                "name": "Суши 14",
                "recipe": "Лосось, угорь, тунец, огурец, авокадо, кунжут",
                "price": 850,
                favorite : false
            },
            {
                "id": 15,
                "name": "Суши 15",
                "recipe": "Лосось, угорь, креветки, тунец, огурец, авокадо, кунжут",
                "price": 900,
                favorite : false
            },
            {
                "id": 16,
                "name": "Суши 16",
                "recipe": "Лосось, угорь, креветки, тунец, огурец, авокадо, кунжут",
                price : 400,
                favorite : false
            }]
    }
}