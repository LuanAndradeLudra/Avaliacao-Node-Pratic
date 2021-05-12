const express = require("express");
const app = new express();
var path = require('path');

//View engine
app.set("view engine", "ejs");
//Static Files
app.use(express.static('public'));
//Routes
const mainRoutes = require("./routes/mainRoutes");
app.use(mainRoutes);
app.set('views', path.join(__dirname, '/public/views'));

app.listen(8080, () => console.log("Running"));