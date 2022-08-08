const db = require("../db");
const bcrypt = require("bcrypt");

const register = async (email, password) => {
  const result = await db.raw("select * from user where email = ?", [email]);
  if (result.length > 0) {
    throw new Error("User already registered");
  }
  const encrypted = await bcrypt.hash(password, 10);
  await db.raw("insert into user(email, password) values(?, ?)", [
    email,
    encrypted,
  ]);
};

const login = async (email, password) => {
  const result = await db.raw("select * from user where email = ?", [email]);
  if (result.length > 0) {
    const user = result[0];
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = {
  register,
  login,
};
