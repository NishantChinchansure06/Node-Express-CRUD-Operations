const express = require("express");
const connectToDatabse = require("./config/databaseConnection");
const dotevn = require("dotenv").config();
const errorHandler = require('./middleware/errorHandler')

connectToDatabse()
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/contacts", require('./routes/contactsRoutes'));
app.use("/api/users", require('./routes/userRoutes'));
app.use(errorHandler)

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
