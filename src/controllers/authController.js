const authService = require("../services/authService");

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    await authService.register(email, password);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  if (user) {
    req.session.user = { id: user.id, email: user.email };
    return res.status(200).json(req.session.user);
  } else {
    return res.status(400).send({ message: "Invalid Credentials" });
  }
};

const logout = async (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
};

const me = (req, res) => {
  if (req.session && req.session.user) {
    return res.json(req.session.user);
  }

  return res.sendStatus(403);
};

module.exports = {
  register,
  login,
  logout,
  me,
};
