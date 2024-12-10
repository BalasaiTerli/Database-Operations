const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose"); 
const app = express();
const cors = require("cors")
const { register, login,updateEmail,deleteUser,getAllUsers } = require("./controllers/routes");
app.use(cors())
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.put("/updateEmail",updateEmail)
app.delete("/deleteUser",deleteUser)
app.get("/getAllUsers", getAllUsers); 
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Connection error", err);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
