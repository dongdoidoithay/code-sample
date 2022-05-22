const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const compression=require('compression');
const app = express();

app.use(compression({
  level:6,
  threshold:100*1000
}));
app.use(cors());





app.set('json spaces', 2);
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route test
app.get("/", (req, res) => {
  res.json({ message: "Welcome Master Api v1" });
});
//kumascans
require("./router/api.raw.routers")(app);//v1


// set port, listen for requests
const PORT =5060;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});