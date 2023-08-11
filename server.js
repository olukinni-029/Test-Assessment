const express = require('express');
 const bodyParser =require('body-parser');
// const cors = require("cors");
const app = express();
// var corsOptions = {
//     origin: "http://localhost:8082"
// };
// app.use(cors(corsOptions));

 app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()

app.get('/',(req,res)=>{
    res.json({message:"ABC Company,Inc."});
    console.log('ABC Company,Inc.');
})

require("./app/routes/blogRoute.js")(app);
require("./app/routes/userRoute.js")(app);

const PORT =process.env.PORT || 2524;

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});