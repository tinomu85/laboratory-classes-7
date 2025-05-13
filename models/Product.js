const { getDataBase } = require("../database");

const COLLECTION_NAME = "products";

class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  static async add(product) {
    const db = getDataBase();

    const existing = await db
      .collection(COLLECTION_NAME)
      .findOne({ name: product.name });

    if (existing) {
      throw new Error(`Product '${product.name}' already exists.`);
    }

    return db.collection(COLLECTION_NAME).insertOne(product);
  }

  static async getAll() {
    const db = getDataBase();
    return db.collection(COLLECTION_NAME).find().toArray();
  }

  static async findByName(name) {
    const db = getDataBase();
    return db.collection(COLLECTION_NAME).findOne({ name });
  }

  static async deleteByName(name) {
    const db = getDataBase();
    return db.collection(COLLECTION_NAME).deleteOne({ name });
  }

  static async getLast() {
    const db = getDataBase();
    return db
      .collection(COLLECTION_NAME)
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray()
      .then((products) => products[0]);
  }
}

module.exports = {
  Product,
  COLLECTION_NAME,
};
