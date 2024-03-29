const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const musicRoutes = require("./routes/musicAndPlayListRoutes")
const app = express();
const specs = require('./swaggerDef');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get('/', (req, res) => {
  res.send('Application running properly');
});

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes )

app.listen(process.env.PORT,process.env.HOST, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
