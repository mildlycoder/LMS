import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    return;
  }

  console.log("Connecting with mongodb");

  try {
    const db = await mongoose.connect(process.env.DATABASE_URL);
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected");

    mongoose.connection.on("error", (err) => {
      console.error(`Error connecting to MongoDB: ${err.message}`);
    });
    mongoose.connection.on("disconnected", (err) => {
      console.error(`Error connecting to MongoDB: ${err}`);
    });
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
}

async function disconnect() {
  if (connection.isConnected) {
    await mongoose.disconnect();
    connection.isConnected = false;
    console.log("MongoDB Disconnected");
  }
}

export default { connect };
