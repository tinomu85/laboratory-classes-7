const { getDataBase } = require("../database");
const { Product } = require("./Product");

const COLLECTION_NAME = "carts";

class Cart {
  static async add(productName) {
    const db = getDataBase();

    const product = await Product.findByName(productName);
    if (!product) {
      throw new Error(`Product '${productName}' not found.`);
    }

    const existingItem = await db
      .collection(COLLECTION_NAME)
      .findOne({ "product.name": productName });

    if (existingItem) {
      return db
        .collection(COLLECTION_NAME)
        .updateOne({ "product.name": productName }, { $inc: { quantity: 1 } });
    } else {
      return db.collection(COLLECTION_NAME).insertOne({
        product,
        quantity: 1,
      });
    }
  }

  static async getItems() {
    const db = getDataBase();
    return db.collection(COLLECTION_NAME).find().toArray();
  }

  static async getProductsQuantity() {
    const items = await this.getItems();

    return items.reduce((total, item) => total + item.quantity, 0);
  }

  static async getTotalPrice() {
    const items = await this.getItems();

    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  static async clearCart() {
    const db = getDataBase();
    return db.collection(COLLECTION_NAME).deleteMany({});
  }
}

module.exports = {
  Cart,
  COLLECTION_NAME,
};
