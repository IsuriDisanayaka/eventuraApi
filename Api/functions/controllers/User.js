const User = require("../models/User");

exports.handleGoogleLogin = async (req, res) => {
  const { googleId, email, firstName, lastName, picture } = req.body;
  try {
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({
        googleId,
        email,
        firstName,
        lastName,
        picture,
      });
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
