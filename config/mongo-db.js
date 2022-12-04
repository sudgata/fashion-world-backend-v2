const mongoose = require("mongoose");
const dbConfig = require("./db-config");

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoose.set('toJSON', {
      virtuals: true,
      versionKey: false,
      transform: (doc, converted) => {
        delete converted._id;
      }
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

module.exports = connectDB;