const express= require("express");
const connectDb= require("./config/dbConnection");
// const { errorHandler } = require("./middleware/errorHandler");
// DB connection
connectDb();
const app = express();
const dotenv  = require("dotenv").config();
const port = process.env.PORT || 5000;

// to parse the data which we get from client
app.use(express.json());

//routes
app.use("/", require(
    "./routes/habitTrackerRoutes"
));


app.listen(port,()=>{
    console.log("Server running on Port : "+port);
});