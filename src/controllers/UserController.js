const User = require("../db/models/Users");
const bcrypt = require("bcrypt");

const createToken = require("../middleware/createToken");


const signUp = async (req, res) => {
  const { name ,email,password} = req.body;

  if (!name) {
    res.status(404).send("No such user");
  }

  try {

    const hashedPassword=await bcrypt.hash(password,10)
    const newUser = new User({
        name:name,
        email:email,
        password:hashedPassword,


    });

    await newUser.save();

    const token = createToken({ _id: newUser._id, name: newUser.name });

    return res.status(200).send({token:token,user:newUser});
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).send("No such user exists");
  }

  try {
    
    const user = await User.findOne({email})

    if (!user) {
      return res.status(403).send("user doesnt exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newPayload = { email: email, password: hashedPassword };

    const token = createToken(newPayload);

    return res.status(400).json({ user: newPayload, token: token });
  } catch (error) {
    res.status(403).send(error.message);
  }
};





module.exports = { signUp, login };
