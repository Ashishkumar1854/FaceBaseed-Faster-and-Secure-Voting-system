const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const seedUsers = async () => {
  const users = [
    {
      name: "Admin",
      age: 30,
      role: "admin",
      email: "admin@example.com",
      password: "admin123",
    },
    {
      name: "User1",
      age: 25,
      role: "voter",
      email: "user1@example.com",
      password: "user123",
    },
  ];
  for (let user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  await User.insertMany(users);
  console.log("✅ Users Seeded!");
  mongoose.connection.close();
};

seedUsers();
