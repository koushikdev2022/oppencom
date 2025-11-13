const express = require("express");
const dotEnv = require("@dotenvx/dotenvx")
const { join } = require("path");

dotEnv.config();

const cors = require("cors");
const morgan = require('morgan');
const sequelize = require("./src/config/db");



const app = express();

const port = process.env.PORT || 8080;

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "100mb", extended: false }));
app.use(express.json({ limit: "100mb" }));
app.use(express.static(join(__dirname, "/public/")));

sequelize.authenticate()
    .then(() => console.warn("MY-SQL connected successfully."))
    .catch(err => console.error(err));




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});