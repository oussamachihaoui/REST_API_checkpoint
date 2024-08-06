import express from "express";
import connect from "./connectDB.js";
import User from "./models/userModel.js";

const app = express();
const port = process.env.PORT || 8000;

// connnect()

app.get("/users", async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).json({
      message: "try again",
    });
  }
});

app.post("/users", async (req, res) => {
  const { email, passoword, age, name } = req.body;
  const user = await User.create({
    name,
    age,
    email,
    passoword,
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json({
      message: "try again",
    });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, passoword, age, name } = req.body;
  const user = await User.findById(id);
  if (user) {
    user.email = email || user.email;
    user.name = name || user.name;
    user.age = age || user.age;
    user.passoword = passoword || user.passoword;
    const saveUser = await user.save();
    res.status(200).json(saveUser);
  } else {
    res.status(500).json({
      message: "try again",
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (user) {
    await User.deleteOne({ _id: user._id });
    res.status(200).json({
      message: "deleted",
    });
  } else {
    res.status(500).json({
      message: "try again",
    });
  }
});

app.listen(port, () => {
  console.log(`on port ${port}`);
});
