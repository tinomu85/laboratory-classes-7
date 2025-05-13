const { MongoClient } = require("mongodb");
const { DB_USER, DB_PASS } = require("./config");

let database;

const mongoConnect = async (callback) => {
  const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@lab7.tznshc3.mongodb.net/?retryWrites=true&w=majority&appName=lab7`;

  try {
    const client = await MongoClient.connect(uri);
    database = client.db("shop");
    console.log("Connection to the database has been successful.");
    callback();
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

const getDataBase = () => {
  if (!database) {
    throw new Error("No database  found");
  }
  return database;
};

module.exports = {
  mongoConnect,
  getDataBase,
};
