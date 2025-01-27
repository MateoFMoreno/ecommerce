const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const volleyball = require("volleyball");
const passport = require("passport");
const dotenv = require("dotenv");

const routes = require("./routes");
const db = require("./config/db");
const seed = require("./config/seed");

const app = express();
dotenv.config();

//Passport Strategy
require("./config/passport/auth");
// require("./config/passport/facebook");  comentado porque no esta incluido el .env
// require("./config/passport/google");
// require("./config/passport/github");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(volleyball);

app.use(session({ secret: process.env.SESSION_KEY || 'secrets', resave: true, saveUninitialized: true }));
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
