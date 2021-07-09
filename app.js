// ℹ️ Gets access to environment variables/settings
// added new connection stream
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const projectName = "PROperformance";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const isLoggedIn = require('./middleware/isLoggedIn');

const authRouter = require("./routes/auth/auth-router");
app.use("/auth", authRouter);

const personalRouter = require("./routes/personal-router")
app.use("/site", isLoggedIn, personalRouter);

const plansRouter = require('./routes/plans-router')
app.use('/plan', isLoggedIn, plansRouter)

const index = require("./routes/index");
app.use("/", index);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
