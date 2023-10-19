const User = require("../db/models/Users");
const bcrypt = require("bcrypt");

const createToken = require("../middleware/createToken");

const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(404).json("Insufficient Body");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    await newUser.save();

    const token = createToken({
      _id: newUser._id,
      role: role,
      email: newUser.email,
    });

    return res.status(200).send({ token: token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Insufficient Body");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).send("user doesnt exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPayload = { email, role: user.role };

    const token = createToken(newPayload);

    return res.status(400).json({ token: token });
  } catch (error) {
    res.status(403).send(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { signUp, login, getUsers };
