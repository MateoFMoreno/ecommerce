const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const volleyball = require("volleyball");
const passport = require("passport");

const routes = require("./routes");
const db = require("./config/db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // pasar a falso antes de terminar
app.use(cors());
app.use(cookieParser());
app.use(volleyball);

app.use(session({ secret: process.env.SESSION_KEY, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("anda");
});

const port = 3001;

db.then(() => {
    app.listen(port, () => {
        console.log(`Server on ${port}`);
    });
});
