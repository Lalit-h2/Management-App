const mongoose = require('mongoose');

const ConnectDB = () => {
  mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
    .then(() => {
      console.log("Mongodb Connected Successfully.");
    }).catch((error) => {
      console.log("DB Connection failed.", error);
    })
}

module.exports = ConnectDB;